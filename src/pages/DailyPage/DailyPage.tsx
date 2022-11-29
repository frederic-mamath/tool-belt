import { Button, Card, Stack, Typography } from "@mui/material";
import { useMachine } from "@xstate/react";
import { DateTime, Duration } from "luxon";
import { NEXT_EVENT, ON_GOING_STATE, PICK_PARTICIPANTS_STATE } from "machines/dailyMachine";
import { dailyMachine } from "machines/dailyMachine";
import { useEffect, useState } from "react";

import CountdownCard from "components/CountdownCard";
import Speakers from "components/Speakers";
import { useGetBookings } from "generated/hook";
import { Worker } from "mocks/workers";

const getCurrentSpeaker = ( filteredSpeakers: Worker[], currentSpeakerIndex?: number,) => {
  return currentSpeakerIndex !== undefined
    ? filteredSpeakers[currentSpeakerIndex]?.displayName || 'Done !'
    : 'No one yet'
}

const getNextSpeaker = ( filteredSpeakers: Worker[], currentSpeakerIndex?: number,) => {
  return currentSpeakerIndex !== undefined
  ? filteredSpeakers[currentSpeakerIndex + 1]?.displayName || "Let's Go !"
  : 'No one yet'
}

const DailyPage = () => {
  const [state, send] = useMachine(dailyMachine)
  const getBookings = useGetBookings()
  console.log({ getBookings})
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>()
  const [speakerTimer, setSpeakerTimer] = useState<{
    start: DateTime
    now: DateTime
    tick: null
  } | null>(null)
  const filteredSpeakers: Worker[] = state.context.validatedSpeakers

  const currentSpeaker = getCurrentSpeaker(filteredSpeakers, currentSpeakerIndex);
const nextSpeaker = getNextSpeaker(filteredSpeakers, currentSpeakerIndex);

    const onStartDaily = (workers: Worker[]) => {
      send(NEXT_EVENT, { validatedSpeakers: workers })
    }

  const stopwatch = speakerTimer
    ? Duration.fromObject(speakerTimer.now.diff(speakerTimer.start).toObject()).toFormat('hh:mm:ss')
    : '00:00:00'

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (speakerTimer) {
          setSpeakerTimer({
            start: speakerTimer.start,
            now: DateTime.local(),
            tick: null,
          })
        }
      }, 1000)
  
      return () => clearInterval(intervalId)
    }, [speakerTimer])
  
return <Stack
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
    {state.matches(PICK_PARTICIPANTS_STATE) && <Speakers onStart={onStartDaily} />}
    {state.matches(ON_GOING_STATE) && (
      <>
        <Stack gap={4} flex={1}>
          <Card sx={{ flex: 1, p: 2 }} elevation={3}>
            <Stack sx={{ height: '100%' }}>
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
              })
              if (currentSpeakerIndex === undefined) {
                setCurrentSpeakerIndex(0)

                return
              }
              if (currentSpeakerIndex < filteredSpeakers.length) {
                setCurrentSpeakerIndex(currentSpeakerIndex + 1)

                return
              }
            }}
            disabled={!!currentSpeakerIndex && currentSpeakerIndex >= filteredSpeakers.length}
          >
            {currentSpeakerIndex === undefined ? 'Start' : 'Next'}
          </Button>
          <Card sx={{ flex: 1, p: 2, opacity: 0.4 }} elevation={3}>
            <Stack>
              <Typography variant="h6">Next Speaker</Typography>
              <Typography variant="h3">{nextSpeaker || 'No one yet'}</Typography>
            </Stack>
          </Card>
        </Stack>
        <CountdownCard />
      </>
    )}
  </Stack>
</Stack>;
}

export default DailyPage;
