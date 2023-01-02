import { Slider, Stack, TextField, Typography } from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

const DEVS = [
  { name: "Frederic" },
  { name: "Mohamed" },
  { name: "Maxime" },
  { name: "Othmane" },
];

const SprintsPage = () => {
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
                label="Basic example"
                value={startOfSprint}
                onChange={(value) => {
                  setStartOfSprint(value);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Basic example"
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
      </Stack>
    </LocalizationProvider>
  );
};

export default SprintsPage;
