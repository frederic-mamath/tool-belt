import {
  List,
  ListItem,
  ListItemButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

import { DEVS } from "./SprintPage.service";

const SprintPage = () => {
  const [startOfSprint, setStartOfSprint] = useState<string | null>();
  const [endOfSprint, setEndOfSprint] = useState<string | null>();

  console.log({ startOfSprint, endOfSprint });

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon} disableMaskedInput={true}>
      <Stack>
        <Typography variant="h1">Sprints</Typography>
        <Stack direction="row">
          <Stack>
            <Typography variant="h2">N°48</Typography>
            <Stack direction="row">
              <DatePicker
                label="Starts at"
                value={startOfSprint}
                onChange={(value) => {
                  setStartOfSprint(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Ends at"
                value={endOfSprint}
                onChange={setEndOfSprint}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Stack>
          <div>space for Burndown Chart</div>
        </Stack>
        <Stack direction="row">
          {DEVS.map((dev) => (
            <Stack key={dev.name} flex={1} p={2}>
              <Typography variant="h6">{dev.name}</Typography>
              <Slider min={0} step={0.5} defaultValue={5} max={5} marks />
              <Slider min={0} step={0.5} defaultValue={5} max={5} marks />
              <Slider min={0} step={0.5} defaultValue={5} max={5} marks />
              <Slider min={0} step={0.5} defaultValue={5} max={5} marks />
              <Slider min={0} step={0.5} defaultValue={5} max={5} marks />
            </Stack>
          ))}
        </Stack>
        <Stack direction="row">
          <Stack flex={1}>
            <Typography variant="h4">Descoped tickets</Typography>
            <List>
              <ListItem>
                <ListItemButton>CFCCON-1</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>CFCCON-2</ListItemButton>
              </ListItem>
            </List>
          </Stack>
          <Stack flex={1}>
            <Typography variant="h4">Prioritized tickets</Typography>
            <List>
              <ListItem>
                <ListItemButton>CFCCON-3</ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Stack>
            <Typography variant="h3">Expected tickets to deliver</Typography>
            <List>
              <ListItem>
                <ListItemButton>CFCCON-5</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>CFCCON-6</ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default SprintPage;
