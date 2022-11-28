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
import {
  PRODUCT_WORKERS,
  QA_WORKERS,
  TECH_WORKERS,
  WORKERS,
  Worker,
} from "mocks/workers";
import { append, without } from "ramda";
import { MouseEventHandler, useState } from "react";
import { shuffle } from "services/array";

import { getCheckedWorkers, getFilteredSpeakers } from "./Speakers.service";

interface Props {
  onStart: (workers: Worker[]) => void;
}

const Speakers = (props: Props) => {
  const { onStart } = props;
  const [speakersOrdered, setSpeakersOrdered] = useState<Worker[]>(
    shuffle(WORKERS)
  );
  const [filteredSpeakerIds, setFilteredSpeakerIds] = useState<string[]>(
    getCheckedWorkers(WORKERS).map((worker) => worker.id)
  );

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

  const onClickMore: MouseEventHandler<HTMLButtonElement> = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  const onClickToggleSpeaker = (worker: Worker) => {
    const currentIndex = filteredSpeakerIds.indexOf(worker.id);

    if (currentIndex === -1) {
      setFilteredSpeakerIds(append(worker.id, filteredSpeakerIds));
      return;
    }

    setFilteredSpeakerIds(without([worker.id], filteredSpeakerIds));
  };

  const onShuffleSpeakers = () => {
    setSpeakersOrdered(shuffle(WORKERS));
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
      <Stack direction="row">
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Tech Team
            </ListSubheader>
          }
        >
          {TECH_WORKERS.map((worker) => (
            <ListItem key={worker.id} sx={{ height: 40 }}>
              <ListItemButton
                disabled={worker.isOff}
                onClick={() => onClickToggleSpeaker(worker)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!filteredSpeakerIds.includes(worker.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": worker.id }}
                  />
                </ListItemIcon>
                <ListItemText id={worker.id} primary={worker.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              QA Team
            </ListSubheader>
          }
        >
          {QA_WORKERS.map((worker) => (
            <ListItem key={worker.id} sx={{ height: 40 }}>
              <ListItemButton
                disabled={worker.isOff}
                onClick={() => onClickToggleSpeaker(worker)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!filteredSpeakerIds.includes(worker.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": worker.id }}
                  />
                </ListItemIcon>
                <ListItemText id={worker.id} primary={worker.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Product Team
            </ListSubheader>
          }
        >
          {PRODUCT_WORKERS.map((worker) => (
            <ListItem key={worker.id} sx={{ height: 40 }}>
              <ListItemButton
                disabled={worker.isOff}
                onClick={() => onClickToggleSpeaker(worker)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!filteredSpeakerIds.includes(worker.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": worker.id }}
                  />
                </ListItemIcon>
                <ListItemText id={worker.id} primary={worker.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Button
        onClick={() =>
          onStart(getFilteredSpeakers(speakersOrdered, filteredSpeakerIds))
        }
        variant="contained"
        sx={{ width: "100%" }}
      >
        Let's talk !
      </Button>
    </Card>
  );
};

export default Speakers;
