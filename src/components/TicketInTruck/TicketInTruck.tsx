import { Card } from "@mui/material";

import {
  ClearstreamTicketOutboundDto,
  ClearstreamTicketOutboundDtoStatus,
} from "generated/model";

import { getIsToValidateStyle } from "./TicketInTruck.service";

interface Props {
  clearstreamTicket: ClearstreamTicketOutboundDto;
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
      }}
    >
      {clearstreamTicket.ticketPoint} - {clearstreamTicket.ticketTitle}
    </Card>
  );
};

export default TicketInTruck;
