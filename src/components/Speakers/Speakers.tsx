import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { append, groupBy, without } from "ramda";
import { MouseEventHandler, useEffect, useState } from "react";

import { useGetTeamUsers } from "generated/hook";
import { TeamUserOutboundDto } from "generated/model";
import { shuffle } from "services/array";

import { getCheckedWorkers, getFilteredSpeakers } from "./Speakers.service";

interface Props {
  onStart: (workers: TeamUserOutboundDto[]) => void;
}

const mapByTeamUserCategory = groupBy(
  (teamUserOutboundDto: TeamUserOutboundDto) => {
    return teamUserOutboundDto.userCategory || "other";
  }
);

const Speakers = (props: Props) => {
  const { onStart } = props;
  const getTeamUsers = useGetTeamUsers();
  const teamUsers = getTeamUsers.data || [];
  const [teamUsersById, setTeamUsersById] = useState<{
    [categoryId: string]: TeamUserOutboundDto[];
  }>({});
  const [speakersOrdered, setSpeakersOrdered] = useState<TeamUserOutboundDto[]>(
    shuffle(teamUsers)
  );
  const [filteredSpeakerIds, setFilteredSpeakerIds] = useState<string[]>([]);

  useEffect(() => {
    if (teamUsers.length > 0) {
      setTeamUsersById(mapByTeamUserCategory(teamUsers));
      setSpeakersOrdered(teamUsers);
      setFilteredSpeakerIds(
        getCheckedWorkers(teamUsers).map(
          (teamUserOutboundDto) => teamUserOutboundDto.id
        )
      );
    }
  }, [teamUsers]);
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

  const onClickMore: MouseEventHandler<HTMLButtonElement> = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  const onClickToggleSpeaker = (teamUserOutboundDto: TeamUserOutboundDto) => {
    const currentIndex = filteredSpeakerIds.indexOf(teamUserOutboundDto.id);

    if (currentIndex === -1) {
      setFilteredSpeakerIds(append(teamUserOutboundDto.id, filteredSpeakerIds));

      return;
    }

    setFilteredSpeakerIds(
      without([teamUserOutboundDto.id], filteredSpeakerIds)
    );
  };

  const onShuffleSpeakers = () => {
    setSpeakersOrdered(shuffle(teamUsers));
  };

  return (
    <Card sx={{ p: 2 }} elevation={3}>
      <Stack direction="row">
        <Tooltip title="Shuffle speakers">
          <IconButton onClick={onShuffleSpeakers}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="More actions">
          <IconButton onClick={onClickMore}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={onCloseMenu}>
        <MenuItem onClick={onShuffleSpeakers}>Shuffle</MenuItem>
        <MenuItem
          onClick={() => {
            setFilteredSpeakerIds([]);
          }}
        >
          Check all
        </MenuItem>
        <MenuItem disabled>Uncheck all</MenuItem>
        <MenuItem disabled>Check by role</MenuItem>
      </Menu>
      <Stack direction={{ sm: "column", md: "row" }}>
        {Object.keys(teamUsersById).map((userCategory) => (
          <List
            key={`daily-team-user-category-${userCategory}`}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {userCategory}
              </ListSubheader>
            }
          >
            {teamUsersById[userCategory].map((teamUser) => (
              <ListItem key={teamUser.id} sx={{ height: 40 }}>
                <ListItemButton
                  disabled={teamUser.isOff}
                  onClick={() => onClickToggleSpeaker(teamUser)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={!filteredSpeakerIds.includes(teamUser.id)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": teamUser.id }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={teamUser.id}
                    primary={teamUser.firstName || "unknown"}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ))}
      </Stack>
      <Button
        onClick={() =>
          onStart(
            shuffle(getFilteredSpeakers(speakersOrdered, filteredSpeakerIds))
          )
        }
        variant="contained"
        sx={{ width: "100%" }}
      >
        Let&apos;s talk !
      </Button>
    </Card>
  );
};

export default Speakers;
