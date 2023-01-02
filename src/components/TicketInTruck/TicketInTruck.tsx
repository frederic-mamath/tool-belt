import { Card } from "@mui/material";

import {
  ClearstreamTicketOutboundDtoStatus,
  TicketsOutboundDto,
} from "generated/model";

import {
  getIsProblemSolvingMaterial,
  getIsToValidateStyle,
} from "./TicketInTruck.service";

interface Props {
  clearstreamTicket: TicketsOutboundDto;
}

const TicketInTruck = (props: Props) => {
  const { clearstreamTicket } = props;

  const isToValidate =
    clearstreamTicket.status === ClearstreamTicketOutboundDtoStatus.TO_VALIDATE;

  return (
    <Card
      sx={{
        p: 2,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "lightblue",
        },
        ...getIsToValidateStyle(isToValidate),
        ...getIsProblemSolvingMaterial(
          clearstreamTicket.isProblemSolvingMaterial
        ),
      }}
    >
      {clearstreamTicket.ticketPoint} - {clearstreamTicket.ticketTitle}
    </Card>
  );
};

export default TicketInTruck;
