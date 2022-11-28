import { Stack, Table, TableHead, TableRow, TableBody, TableCell, Typography } from '@mui/material'

const Truck = () => {

  return (
    <Stack maxWidth={512}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Frederic</TableCell>
            <TableCell>Maxime</TableCell>
            <TableCell>Mohamed</TableCell>
            <TableCell>Yassine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Off</TableCell>
            <TableCell>
              <Typography variant="body1">CFCCON-A</Typography>
              <Typography variant="body2">Under construction</Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <div>CFCCON-B</div>
              <div>Technical Workshop</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Off</TableCell>
            <TableCell>Checking</TableCell>
            <TableCell>What&apos;s</TableCell>
            <TableCell>Possible to do</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>How to</TableCell>
            <TableCell>Assign a ticket to</TableCell>
            <TableCell>Two</TableCell>
            <TableCell>People</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Or create one ticket</TableCell>
            <TableCell>per participant</TableCell>
            <TableCell>For meetings with multiple</TableCell>
            <TableCell>People</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  )
}

export default Truck
