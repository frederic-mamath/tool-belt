import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import { DateTime, Duration } from "luxon";
import { useMemo, useRef, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

interface CustomCountdownRendererProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const CustomCountdownRenderer = ({
  hours,
  minutes,
  seconds,
}: CustomCountdownRendererProps) => {
  return (
    <Typography variant="h4">
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </Typography>
  );
};

interface Props {}

const CountdownCard = (props: Props) => {
  const countdownRef = useRef<Countdown>(null);
  const [stopwatch, setStopwatch] = useState<Duration>();

  const {} = props;

  const onClickReset = () => {
    const timerSetup = {
      start: DateTime.local(),
    };
  };
  const time = useMemo(() => {
    return Date.now() + 1000 * 60 * 15;
  }, []);

  return (
    <Card elevation={3}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%", p: 4 }}
        gap={4}
      >
        <Countdown
          ref={countdownRef}
          date={time}
          autoStart={false}
          renderer={({ hours, minutes, seconds }) => (
            <CustomCountdownRenderer
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          )}
        />
        <Stack direction="row">
          <IconButton
            onClick={() => {
              countdownRef.current?.pause();
            }}
          >
            <PauseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              countdownRef.current?.start();
            }}
          >
            <PlayArrowIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              countdownRef.current?.stop();
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CountdownCard;
