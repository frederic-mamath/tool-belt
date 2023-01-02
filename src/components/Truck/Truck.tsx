import { Divider, Stack, Typography } from "@mui/material";
import { groupBy } from "ramda";

import TicketInTruck from "components/TicketInTruck/TicketInTruck";
import { useGetTickets } from "generated/hook";
import {
  ClearstreamTicketOutboundDtoStatus,
  TicketsOutboundDto,
  TicketsOutboundDtoStatus,
} from "generated/model";

const mapByOwnerFirstName = groupBy(
  (clearstreamTicketOutboundDto: TicketsOutboundDto) => {
    return clearstreamTicketOutboundDto.ownerFirstName || "Unassigned";
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

  const clearstreamTicketOutboundDto = getTickets.data || [];
  const clearstreamTicketByOwnerFirstName = mapByOwnerFirstName(
    clearstreamTicketOutboundDto
  );

  return (
    <Stack>
      <Stack direction="row" gap={2} flex={1}>
        {Object.keys(clearstreamTicketByOwnerFirstName)
          .sort()
          .map((user: string) => {
            const clearstreamTickets = clearstreamTicketByOwnerFirstName[user];
            const dailyPointsCount = clearstreamTickets.reduce(
              (acc, clearstreamTicket) => {
                if (!clearstreamTicket.ticketPoint) return acc;

                return acc + clearstreamTicket.ticketPoint;
              },
              0
            );
            const dailyPointsToValidateCount = clearstreamTickets.reduce(
              (acc, clearstreamTicket) => {
                if (
                  !clearstreamTicket.ticketPoint ||
                  clearstreamTicket.status !==
                    ClearstreamTicketOutboundDtoStatus.TO_VALIDATE
                )
                  return acc;

                return acc + clearstreamTicket.ticketPoint;
              },
              0
            );

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
                {clearstreamTickets
                  .sort(byTicketStatus)
                  .map((clearstreamTicket) => {
                    return (
                      <TicketInTruck
                        key={clearstreamTicket.clearstreamTicketId}
                        clearstreamTicket={clearstreamTicket}
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
          clearstreamTicket={{
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
          clearstreamTicket={{
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
          clearstreamTicket={{
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
