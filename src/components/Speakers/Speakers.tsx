import {
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Worker } from "App";

interface Props {
  orderedSpeakers: Worker[];
  excludedSpeakerIds: string[];
  onClickCheckbox: (worker: Worker) => void;
}

const Speakers = (props: Props) => {
  const { orderedSpeakers, excludedSpeakerIds, onClickCheckbox } = props;

  return (
    <Card sx={{ maxWidth: 248, p: 2 }} elevation={3}>
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
