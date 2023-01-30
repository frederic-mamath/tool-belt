import { Badge, Card, Chip, Stack } from "@mui/material";

import { TicketsOutboundDto, TicketsOutboundDtoStatus } from "generated/model";

import {
  getFilteredTicketName,
  getIsProblemSolvingMaterial,
  getIsToValidateStyle,
} from "./TicketInTruck.service";

interface Props {
  ticket: TicketsOutboundDto;
}

const TicketInTruck = (props: Props) => {
  const { ticket } = props;

  if (!ticket.ticketTitle) {
    return null;
  }

  const isToValidate = ticket.status === TicketsOutboundDtoStatus.TO_VALIDATE;

  const ticketNameFiltered = getFilteredTicketName(ticket.ticketTitle);

  return (
    <Badge
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      badgeContent={ticket.ticketPoint}
      color="primary"
    >
      <Card
        sx={{
          p: 2,
          fontSize: "12px",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "lightblue",
          },
          ...getIsToValidateStyle(isToValidate),
          ...getIsProblemSolvingMaterial(ticket.isProblemSolvingMaterial),
        }}
      >
        <Stack gap={1}>
          <div>{ticketNameFiltered.filteredTicketName}</div>
          <Stack direction="row">
            {ticketNameFiltered.isInvestigation ? (
              <Chip
                color="primary"
                variant="filled"
                label="Investigation"
                sx={{ height: "16px", fontSize: "12px" }}
              />
            ) : null}
          </Stack>
        </Stack>
      </Card>
    </Badge>
  );
};

export default TicketInTruck;
