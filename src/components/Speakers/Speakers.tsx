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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Worker } from "App";
import { MouseEventHandler, useState } from "react";
interface Props {
  orderedSpeakers: Worker[];
  excludedSpeakerIds: string[];
  onClickCheckbox: (worker: Worker) => void;
  onClickShuffle: VoidFunction;
  onClickCheckAll: VoidFunction;
}

const Speakers = (props: Props) => {
  const {
    orderedSpeakers,
    excludedSpeakerIds,
    onClickCheckbox,
    onClickShuffle,
    onClickCheckAll,
  } = props;

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

  const onClickMore: MouseEventHandler<HTMLButtonElement> = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <Card sx={{ maxWidth: 248, p: 2 }} elevation={3}>
      <Stack direction="row">
        <Tooltip title="Shuffle speakers">
          <IconButton onClick={onClickShuffle}>
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
        <MenuItem onClick={onClickShuffle}>Shuffle</MenuItem>
        <MenuItem onClick={onClickCheckAll}>Check all</MenuItem>
        <MenuItem disabled>Uncheck all</MenuItem>
        <MenuItem disabled>Check by role</MenuItem>
      </Menu>
      <List>
        {orderedSpeakers.map((worker) => (
          <ListItem key={worker.id} sx={{ height: 40 }}>
            <ListItemButton onClick={() => onClickCheckbox(worker)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!excludedSpeakerIds.includes(worker.id)}
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
