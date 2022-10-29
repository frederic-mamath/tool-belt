import {
  AppBar,
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { append, without } from "ramda";
import { DateTime, Duration } from "luxon";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle } from "./services/array";
import CountdownCard from "./components/CountdownCard";

interface Worker {
  id: string;
  displayName: string;
  isEnabledByDefault: boolean;
}

const WORKERS: Worker[] = [
  { id: uuidv4(), displayName: "Frederic", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Jorge", isEnabledByDefault: false },
  { id: uuidv4(), displayName: "Maxime", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Mohamed", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Othmane", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Ramandeep", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Rodrigo", isEnabledByDefault: false },
  { id: uuidv4(), displayName: "Samantha", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Yassine", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Yuliaa", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Imane", isEnabledByDefault: true },
  { id: uuidv4(), displayName: "Richard", isEnabledByDefault: false },
];

const App = () => {
  const [speakersOrdered, setSpeakersOrdered] = useState<Worker[]>(WORKERS);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>();
  const [filteredSpeakerIds, setFilteredSpeakerIds] = useState<string[]>(
    WORKERS.filter((worker) => !worker.isEnabledByDefault).map(
      (worker) => worker.id
    )
  );
  const [speakerTimer, setSpeakerTimer] = useState<{
    start: DateTime;
    now: DateTime;
    tick: null;
  } | null>(null);

  const stopwatch = speakerTimer
    ? Duration.fromObject(
        speakerTimer.now.diff(speakerTimer.start).toObject()
      ).toFormat("hh:mm:ss")
    : "00:00:00";

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (speakerTimer) {
        setSpeakerTimer({
          start: speakerTimer.start,
          now: DateTime.local(),
          tick: null,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [speakerTimer]);

  const handleToggle = (worker: Worker) => {
    const currentIndex = filteredSpeakerIds.indexOf(worker.id);

    if (currentIndex === -1) {
      setFilteredSpeakerIds(append(worker.id, filteredSpeakerIds));
      return;
    }

    setFilteredSpeakerIds(without([worker.id], filteredSpeakerIds));
  };

  const filteredSpeakers = speakersOrdered.filter(
    (worker) => !filteredSpeakerIds.includes(worker.id)
  );

  const currentSpeaker =
    currentSpeakerIndex !== undefined
      ? filteredSpeakers[currentSpeakerIndex]?.displayName || "Done !"
      : "No one yet";
  const nextSpeaker =
    currentSpeakerIndex !== undefined
      ? filteredSpeakers[currentSpeakerIndex + 1]?.displayName || "Let's Go !"
      : "No one yet";

  return (
    <Stack gap={4}>
      <AppBar position="fixed">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6">Tool belt</Typography>
          <Typography>Daily</Typography>
          <Typography>Ceremony</Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="row" gap={1}>
        <Button
          variant="outlined"
          onClick={() => {
            setSpeakersOrdered(shuffle(WORKERS));
            setCurrentSpeakerIndex(undefined);
          }}
        >
          Shuffle speakers
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setCurrentSpeakerIndex(undefined);
            setFilteredSpeakerIds([]);
          }}
        >
          Reset
        </Button>
      </Stack>
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          p: {
            xs: 4,
            sm: 4,
          },
          gap: {
            xs: 4,
            sm: 4,
          },
        }}
        justifyContent="center"
      >
        <Card sx={{ maxWidth: 248, p: 2 }} elevation={3}>
          <List>
            {speakersOrdered.map((worker) => (
              <ListItem key={worker.id} sx={{ height: 40 }}>
                <ListItemButton onClick={() => handleToggle(worker)} dense>
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
        <Stack gap={4} flex={1}>
          <Card sx={{ flex: 1, p: 2 }} elevation={3}>
            <Stack sx={{ height: "100%" }}>
              <Typography variant="h6">Speaker</Typography>
              <Typography variant="h3">{currentSpeaker}</Typography>
              <Stack flex={1} justifyContent="flex-end" alignItems="flex-end">
                <Typography variant="body1">{stopwatch}</Typography>
              </Stack>
            </Stack>
          </Card>
          <Button
            variant="contained"
            onClick={() => {
              setSpeakerTimer({
                start: DateTime.local(),
                now: DateTime.local(),
                tick: null,
              });
              if (currentSpeakerIndex === undefined) {
                setCurrentSpeakerIndex(0);
                return;
              }
              if (currentSpeakerIndex < speakersOrdered.length) {
                setCurrentSpeakerIndex(currentSpeakerIndex + 1);
                return;
              }
            }}
            disabled={
              !!currentSpeakerIndex &&
              currentSpeakerIndex >= speakersOrdered.length
            }
          >
            {currentSpeakerIndex === undefined ? "Start" : "Next"}
          </Button>
          <Card sx={{ flex: 1, p: 2, opacity: 0.4 }} elevation={3}>
            <Stack>
              <Typography variant="h6">Next Speaker</Typography>
              <Typography variant="h3">
                {nextSpeaker || "No one yet"}
              </Typography>
            </Stack>
          </Card>
        </Stack>
        <CountdownCard />
      </Stack>
    </Stack>
  );
};

export default App;
