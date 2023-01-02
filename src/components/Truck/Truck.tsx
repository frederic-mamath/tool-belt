import { Divider, Stack, Typography } from "@mui/material";
import { groupBy } from "ramda";

import TicketInTruck from "components/TicketInTruck/TicketInTruck";
import { useGetTickets } from "generated/hook";
import { TicketsOutboundDto, TicketsOutboundDtoStatus } from "generated/model";

const mapByOwnerFirstName = groupBy(
  (TicketsOutboundDtoStatus: TicketsOutboundDto) => {
    return TicketsOutboundDtoStatus.ownerFirstName || "Unassigned";
  }
);

const byTicketStatus = (
  ticketA: TicketsOutboundDto,
  ticketB: TicketsOutboundDto
) => {
  if (ticketA.status === "TO_VALIDATE" && ticketB.status !== "TO_VALIDATE")
    return -1;

  return 1;
};

const Truck = () => {
  const getTickets = useGetTickets({
    query: {
      refetchInterval: 5000,
    },
  });

  const ticketOutboundDto = getTickets.data || [];
  const ticketByOwnerFirstName = mapByOwnerFirstName(ticketOutboundDto);

  return (
    <Stack>
      <Stack direction="row" gap={2} flex={1}>
        {Object.keys(ticketByOwnerFirstName)
          .sort()
          .map((user: string) => {
            const tickets = ticketByOwnerFirstName[user];
            const dailyPointsCount = tickets.reduce((acc, ticket) => {
              if (!ticket.ticketPoint) return acc;

              return acc + ticket.ticketPoint;
            }, 0);
            const dailyPointsToValidateCount = tickets.reduce((acc, ticket) => {
              if (
                !ticket.ticketPoint ||
                ticket.status !== TicketsOutboundDtoStatus.TO_VALIDATE
              )
                return acc;

              return acc + ticket.ticketPoint;
            }, 0);

            return (
              <Stack
                direction="column"
                key={`truck-column-${user}`}
                gap={2}
                flex={1}
                maxWidth={user === "Unassigned" ? 160 : "unset"}
              >
                <Stack>
                  <Typography variant="h6">{user}</Typography>
                  <Typography variant="body1">
                    ({dailyPointsCount} pts with {dailyPointsToValidateCount} to
                    validate)
                  </Typography>
                </Stack>
                <Divider />
                {tickets.sort(byTicketStatus).map((ticket) => {
                  return (
                    <TicketInTruck
                      key={ticket.clearstreamTicketId}
                      ticket={ticket}
                    />
                  );
                })}
              </Stack>
            );
          })}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Stack direction="row" gap={2}>
        Legend
        <TicketInTruck
          ticket={{
            clearstreamTicketId: "X",
            ticketId: "Y",
            ticketTitle: "To be shipped at the end of the day",
            status: TicketsOutboundDtoStatus.TO_DO,
            hasValidationReturn: false,
            isUnexpectedDuringSprint: false,
            isProblemSolvingMaterial: false,
          }}
        />
        <TicketInTruck
          ticket={{
            clearstreamTicketId: "X",
            ticketId: "Y",
            ticketTitle: "To be validated",
            status: TicketsOutboundDtoStatus.TO_VALIDATE,
            hasValidationReturn: false,
            isUnexpectedDuringSprint: false,
            isProblemSolvingMaterial: false,
          }}
        />
        <TicketInTruck
          ticket={{
            clearstreamTicketId: "X",
            ticketId: "Y",
            ticketTitle:
              "Was already there yesterday and still not to validate",
            status: TicketsOutboundDtoStatus.TO_DO,
            hasValidationReturn: false,
            isUnexpectedDuringSprint: false,
            isProblemSolvingMaterial: true,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Truck;
