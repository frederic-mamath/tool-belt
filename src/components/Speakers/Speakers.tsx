import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Card,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { useMachine } from "@xstate/react";
import { dailyMachine } from "machines/dailyMachine";
import { WORKERS, Worker } from "mocks/workers";
import { append, without } from "ramda";
import { MouseEventHandler, useState } from "react";
import { shuffle } from "services/array";

import { getCheckedWorkers } from "./Speakers.service";

interface Props {}

const Speakers = (props: Props) => {
  const [speakersOrdered, setSpeakersOrdered] = useState<Worker[]>(
    shuffle(WORKERS)
  );
  const [filteredSpeakerIds, setFilteredSpeakerIds] = useState<string[]>(
    getCheckedWorkers(WORKERS).map((worker) => worker.id)
  );
  const [state] = useMachine(dailyMachine);

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
    <Card sx={{ maxWidth: 248, p: 2 }} elevation={3}>
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
      <List>
        {speakersOrdered.map((worker) => (
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
    </Card>
  );
};

export default Speakers;
