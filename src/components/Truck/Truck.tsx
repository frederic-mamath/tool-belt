import { Divider, Stack, Typography } from '@mui/material'
import { groupBy } from 'ramda'

import { useGetClearstreamTickets } from 'generated/hook'
import { ClearstreamTicketOutboundDto } from 'generated/model';

const mapByOwnerFirstName = groupBy((clearstreamTicketOutboundDto: ClearstreamTicketOutboundDto) => {
  return clearstreamTicketOutboundDto.ownerFirstName || "unassigned";
});

const Truck = () => {
  const getClearstreamTickets = useGetClearstreamTickets()
  
  const clearstreamTicketOutboundDto = getClearstreamTickets.data || []
  const clearstreamTicketByOwnerFirstName = mapByOwnerFirstName(clearstreamTicketOutboundDto)

return (
    <Stack direction="row" gap={2} flex={1}>
     {Object.keys(clearstreamTicketByOwnerFirstName).map((user: string) => {
      return (
        <Stack direction="column" key={`truck-column-${user}`} gap={2} flex={1}>
          <Typography variant="h6">{user}</Typography>
          <Divider />
          {clearstreamTicketByOwnerFirstName[user].map(clearstreamTicket => {
            return <div key={clearstreamTicket.ticketId}>{clearstreamTicket.ticketTitle}</div>
          })}
          </Stack>
        )
     })} 
    </Stack>
  )
}

export default Truck
