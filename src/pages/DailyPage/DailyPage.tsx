import {
  Button,
  Card,
  CardActionArea,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMachine } from "@xstate/react";
import { DateTime } from "luxon";
import {
  NEXT_EVENT,
  ON_GOING_STATE,
  PICK_PARTICIPANTS_STATE,
  dailyMachine,
} from "machines/dailyMachine";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import Speakers from "components/Speakers";
import Truck from "components/Truck";
import { ClearstreamUserOutboundDto } from "generated/model";

import {
  Stopwatch,
  Timer,
  burndownChartData,
  getCurrentSpeaker,
  getNextSpeaker,
  getStopwatchDiff,
  getTimerDiff,
  shouldMeetingEnd,
} from "./DailyPage.service";

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
        p: 4,
        gap: 4,
      }}
    >
      <Stack direction="row" gap={2}>
        {state.matches(PICK_PARTICIPANTS_STATE) && (
          <Speakers onStart={onStartDaily} />
        )}
        {state.matches(ON_GOING_STATE) && (
          <Stack direction="row" flex={1} gap={2}>
            <Truck />
            <Stack gap={2} maxWidth={320}>
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

              <Card elevation={3}>
                <CardActionArea
                  sx={{ p: 2, opacity: 0.4 }}
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
                >
                  <Stack>
                    <Typography variant="h6">Next Speaker</Typography>
                    <Typography variant="h5">
                      {nextSpeaker || "Start"}
                    </Typography>
                  </Stack>
                </CardActionArea>
              </Card>
              <Card sx={{ p: 2, ...shouldMeetingEndStyle }}>
                <Typography variant="h3">{meetingTimerDisplay}</Typography>
              </Card>
              <Tooltip title="This creates a snapshot to be able to identify problems tomorrow">
                <Button variant="contained" disabled>
                  Create snapshot
                </Button>
              </Tooltip>
              <Tooltip title="Copy the summary of the daily into an email and sends it to the whole team">
                <Button variant="contained" disabled>
                  Send email
                </Button>
              </Tooltip>
              <LineChart width={320} height={200} data={burndownChartData}>
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="pointsLeftToDo"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="pointsLeftToDoIfEverythingIsValidated"
                  stroke="#FFA000"
                />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="expectedPointsDone"
                  stroke="#FF0000"
                />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis dataKey="expectedPointsDone" />
                <RechartsTooltip />
              </LineChart>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default DailyPage;
