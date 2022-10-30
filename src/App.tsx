import {
  AppBar,
  Button,
  Card,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { append, without } from "ramda";
import { DateTime, Duration } from "luxon";

import { useEffect, useState } from "react";
import { shuffle } from "./services/array";
import CountdownCard from "./components/CountdownCard";
import Speakers from "components/Speakers";
import Truck from "components/Truck";
import { WORKERS, Worker } from "mocks/workers";

const getCheckedWorkers = (workers: Worker[]) => {
  return workers.filter((worker) => {
    if (worker.isOff) {
      return true;
    }

    if (!worker.isEnabledByDefault) {
      return true;
    }

    return false;
  });
};

const App = () => {
  const [speakersOrdered, setSpeakersOrdered] = useState<Worker[]>(
    shuffle(WORKERS)
  );
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>();
  const [filteredSpeakerIds, setFilteredSpeakerIds] = useState<string[]>(
    getCheckedWorkers(WORKERS).map((worker) => worker.id)
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

  const onClickToggleSpeaker = (worker: Worker) => {
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
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6">Tool belt</Typography>
          <Typography>Daily</Typography>
          <Typography>Ceremony</Typography>
        </Toolbar>
      </AppBar>
      <Stack
        sx={{
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
        <Stack direction="row" gap={4}>
          <Speakers
            orderedSpeakers={speakersOrdered}
            excludedSpeakerIds={filteredSpeakerIds}
            onClickCheckbox={onClickToggleSpeaker}
            onClickShuffle={() => {
              setSpeakersOrdered(shuffle(WORKERS));
              setCurrentSpeakerIndex(undefined);
            }}
            onClickCheckAll={() => {
              setCurrentSpeakerIndex(undefined);
              setFilteredSpeakerIds([]);
            }}
          />
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
          <Truck />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default App;
