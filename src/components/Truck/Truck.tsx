import { Stack } from '@mui/material'
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
    <Stack maxWidth={512} direction="row" gap={2}>
     {Object.keys(clearstreamTicketByOwnerFirstName).map((user: string) => {
      return (
        <Stack direction="column" key={`truck-column-${user}`}>
          <div>{user}</div>
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
