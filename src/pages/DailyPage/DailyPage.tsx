import { Button, Card, Stack, Typography } from "@mui/material";
import { useMachine } from "@xstate/react";
import { DateTime } from "luxon";
import {
  NEXT_EVENT,
  ON_GOING_STATE,
  PICK_PARTICIPANTS_STATE,
  dailyMachine,
} from "machines/dailyMachine";
import { useEffect, useState } from "react";

import Speakers from "components/Speakers";
import Truck from "components/Truck";
import { ClearstreamUserOutboundDto } from "generated/model";

import {
  Stopwatch,
  Timer,
  getStopwatchDiff,
  getTimerDiff,
  shouldMeetingEnd,
} from "./DailyPage.service";

const getCurrentSpeaker = (
  filteredSpeakers: ClearstreamUserOutboundDto[],
  currentSpeakerIndex?: number
) => {
  return currentSpeakerIndex !== undefined
    ? filteredSpeakers[currentSpeakerIndex]?.firstName || "Done !"
    : "No one yet";
};

const getNextSpeaker = (
  filteredSpeakers: ClearstreamUserOutboundDto[],
  currentSpeakerIndex?: number
) => {
  return currentSpeakerIndex !== undefined
    ? filteredSpeakers[currentSpeakerIndex + 1]?.firstName || "Let's Go !"
    : "No one yet";
};

const DailyPage = () => {
  const [state, send] = useMachine(dailyMachine);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>();
  const [speakerStopwatch, setSpeakerStopwatch] = useState<Stopwatch | null>(
    null
  );
  const [meetingTimer, setMeetingTimer] = useState<Timer | null>(null);
  const filteredSpeakers: ClearstreamUserOutboundDto[] =
    state.context.validatedSpeakers;

  const currentSpeaker = getCurrentSpeaker(
    filteredSpeakers,
    currentSpeakerIndex
  );
  const nextSpeaker = getNextSpeaker(filteredSpeakers, currentSpeakerIndex);

  const onStartDaily = (
    shuffledAndFilteredUsers: ClearstreamUserOutboundDto[]
  ) => {
    send(NEXT_EVENT, { validatedSpeakers: shuffledAndFilteredUsers });
  };

  const stopwatch = getStopwatchDiff(speakerStopwatch);

  const meetingTimerDisplay = getTimerDiff(meetingTimer);

  const shouldMeetingEndStyle = shouldMeetingEnd(meetingTimer)
    ? {
        backgroundColor: "red",
        color: "white",
      }
    : {};

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (speakerStopwatch && meetingTimer) {
        setSpeakerStopwatch({
          start: speakerStopwatch.start,
          now: DateTime.local(),
          tick: null,
        });
        setMeetingTimer({
          end: meetingTimer.end,
          now: DateTime.local(),
          tick: null,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [speakerStopwatch]);

  return (
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
        {state.matches(PICK_PARTICIPANTS_STATE) && (
          <Speakers onStart={onStartDaily} />
        )}
        {state.matches(ON_GOING_STATE) && (
          <Stack direction="row" flex={1} gap={2}>
            <Truck />
            <Stack gap={4} maxWidth={320}>
              <Card sx={{ flex: 1, p: 2 }} elevation={3}>
                <Stack sx={{ height: "100%" }}>
                  <Typography variant="h6">Speaker</Typography>
                  <Typography variant="h3">{currentSpeaker}</Typography>
                  <Stack
                    flex={1}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Typography variant="body1">{stopwatch}</Typography>
                  </Stack>
                </Stack>
              </Card>
              <Card sx={{ flex: 1, p: 2, opacity: 0.4 }} elevation={3}>
                <Stack>
                  <Typography variant="h6">Next Speaker</Typography>
                  <Typography variant="h3">
                    {nextSpeaker || "No one yet"}
                  </Typography>
                </Stack>
              </Card>
              <Card sx={{ p: 2, ...shouldMeetingEndStyle }}>
                <Typography variant="h3">{meetingTimerDisplay}</Typography>
              </Card>
              <Button
                variant="contained"
                onClick={() => {
                  setSpeakerStopwatch({
                    start: DateTime.local(),
                    now: DateTime.local(),
                    tick: null,
                  });
                  if (currentSpeakerIndex === undefined) {
                    setCurrentSpeakerIndex(0);
                    setMeetingTimer({
                      end: DateTime.local().plus({ minutes: 15 }),
                      now: DateTime.local(),
                      tick: null,
                    });

                    return;
                  }
                  if (currentSpeakerIndex < filteredSpeakers.length) {
                    setCurrentSpeakerIndex(currentSpeakerIndex + 1);

                    return;
                  }
                }}
                disabled={
                  !!currentSpeakerIndex &&
                  currentSpeakerIndex >= filteredSpeakers.length
                }
              >
                {currentSpeakerIndex === undefined ? "Start" : "Next"}
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default DailyPage;
