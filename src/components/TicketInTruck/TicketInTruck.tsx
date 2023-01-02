import { Card } from "@mui/material";

import { TicketsOutboundDto, TicketsOutboundDtoStatus } from "generated/model";

import {
  getIsProblemSolvingMaterial,
  getIsToValidateStyle,
} from "./TicketInTruck.service";

interface Props {
  ticket: TicketsOutboundDto;
}

const TicketInTruck = (props: Props) => {
  const { ticket } = props;

  const isToValidate = ticket.status === TicketsOutboundDtoStatus.TO_VALIDATE;

  return (
    <Card
      sx={{
        p: 2,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "lightblue",
        },
        ...getIsToValidateStyle(isToValidate),
        ...getIsProblemSolvingMaterial(ticket.isProblemSolvingMaterial),
      }}
    >
      {ticket.ticketPoint} - {ticket.ticketTitle}
    </Card>
  );
};

export default TicketInTruck;
