import { dailyMachine, PICK_PARTICIPANTS_STATE } from "machines/dailyMachine";

import { useMachine } from "@xstate/react";
import Speakers from "components/Speakers";

interface Props {}

const PickParticipants = (props: Props) => {
  const {} = props;
  const [state, send] = useMachine(dailyMachine);

  if (!state.matches(PICK_PARTICIPANTS_STATE)) {
    return null;
  }

  return (
    <div>
      <Speakers />
    </div>
  );
};

export default PickParticipants;
