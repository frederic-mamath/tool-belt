import {
  List,
  ListItem,
  ListItemButton,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import {
  DEVS,
  SprintCelerityPerDay,
  updateSprintCelerityPerDay,
} from "./SprintPage.service";

const SprintPage = () => {
  const [startOfSprint, setStartOfSprint] = useState<DateTime | null>(
    DateTime.now()
  );
  const [endOfSprint, setEndOfSprint] = useState<DateTime | null>(
    DateTime.now()
  );
  const [sprintCelerityPerDay, setSprintCelerityPerDay] =
    useState<SprintCelerityPerDay>({});

  const onChangeStartOfSprint = (value: DateTime | null) => {
    setStartOfSprint(value);
  };

  const onChangeEndOfSprint = (value: DateTime | null) => {
    setEndOfSprint(value);
  };

  useEffect(() => {
    if (startOfSprint && endOfSprint) {
      setSprintCelerityPerDay(
        updateSprintCelerityPerDay(
          sprintCelerityPerDay,
          startOfSprint,
          endOfSprint
        )
      );
    }
  }, [startOfSprint, endOfSprint]);

  console.log({ startOfSprint, endOfSprint, sprintCelerityPerDay });

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
                onChange={onChangeStartOfSprint}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Ends at"
                value={endOfSprint}
                onChange={onChangeEndOfSprint}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Stack>
          <div>space for Burndown Chart</div>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {DEVS.map((dev) => (
                <TableCell key={dev.name}>
                  <Typography variant="h6">{dev.name}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(sprintCelerityPerDay).map((day) => (
              <TableRow key={day}>
                <TableCell>{day}</TableCell>
                {DEVS.map((dev) => (
                  <>
                    <TableCell>
                      <Slider
                        min={0}
                        step={0.5}
                        defaultValue={sprintCelerityPerDay[day][dev.name]}
                        max={5}
                        marks
                      />
                    </TableCell>
                  </>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
