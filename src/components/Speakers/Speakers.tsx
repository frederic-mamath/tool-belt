import MoreVertIcon from '@mui/icons-material/MoreVert'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material'
import { append, groupBy, without } from 'ramda'
import { MouseEventHandler, useState } from 'react'

import { useGetClearstreamUsers } from 'generated/hook'
import { ClearstreamUserOutboundDto } from 'generated/model'
import { shuffle } from 'services/array'

import { getCheckedWorkers, getFilteredSpeakers } from './Speakers.service'

interface Props {
  onStart: (workers: ClearstreamUserOutboundDto[]) => void
}

const mapByClearstreamUserCategory = groupBy((clearstreamUserOutboundDto: ClearstreamUserOutboundDto) => {
  return clearstreamUserOutboundDto.clearstreamUserCategory || "other";
});


const Speakers = (props: Props) => {
  const { onStart } = props
  const getClearstreamUsers = useGetClearstreamUsers()
  const clearstreamUsers = getClearstreamUsers.data || []
  const clearstreamUsersById = mapByClearstreamUserCategory(clearstreamUsers);
  const [speakersOrdered, setSpeakersOrdered] = useState<ClearstreamUserOutboundDto[]>(shuffle(clearstreamUsers))
  const [filteredSpeakerIds, setFilteredSpeakerIds] = useState<string[]>(
    getCheckedWorkers(speakersOrdered).map((clearstreamUserOutboundDto) => clearstreamUserOutboundDto.id)
  )
  const [] = useState({})

  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)

  const onClickMore: MouseEventHandler<HTMLButtonElement> = (event) => {
    setMenuAnchor(event.currentTarget)
  }

  const onCloseMenu = () => {
    setMenuAnchor(null)
  }

  const onClickToggleSpeaker = (clearstreamUserOutboundDto: ClearstreamUserOutboundDto) => {
    const currentIndex = filteredSpeakerIds.indexOf(clearstreamUserOutboundDto.id)

    if (currentIndex === -1) {
      setFilteredSpeakerIds(append(clearstreamUserOutboundDto.id, filteredSpeakerIds))

      return
    }

    setFilteredSpeakerIds(without([clearstreamUserOutboundDto.id], filteredSpeakerIds))
  }

  const onShuffleSpeakers = () => {
    setSpeakersOrdered(shuffle(clearstreamUsers))
  }

  return (
    <Card sx={{ p: 2 }} elevation={3}>
      <Stack direction="row">
        <Tooltip title="Shuffle speakers">
          <IconButton onClick={onShuffleSpeakers}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="More actions">
          <IconButton onClick={onClickMore}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={onCloseMenu}>
        <MenuItem onClick={onShuffleSpeakers}>Shuffle</MenuItem>
        <MenuItem
          onClick={() => {
            setFilteredSpeakerIds([])
          }}
        >
          Check all
        </MenuItem>
        <MenuItem disabled>Uncheck all</MenuItem>
        <MenuItem disabled>Check by role</MenuItem>
      </Menu>
      <Stack direction={{ sm: "column", md: "row" }}>
      {Object.keys(clearstreamUsersById).map(clearstreamUserCategory => (
            <List
            key={`daily-clearstream-user-category-${clearstreamUserCategory}`}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {clearstreamUserCategory}
              </ListSubheader>
            }
          >
          {clearstreamUsersById[clearstreamUserCategory].map(clearstreamUser => (
            <ListItem key={clearstreamUser.id} sx={{ height: 40 }}>
            <ListItemButton disabled={clearstreamUser.isOff} onClick={() => onClickToggleSpeaker(clearstreamUser)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!filteredSpeakerIds.includes(clearstreamUser.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': clearstreamUser.id }}
                />
              </ListItemIcon>
              <ListItemText id={clearstreamUser.id} primary={clearstreamUser.firstName || "unknown"} />
            </ListItemButton>
          </ListItem>
          ))}

            </List>
          ))}
      </Stack>
      <Button
        onClick={() => onStart(getFilteredSpeakers(speakersOrdered, filteredSpeakerIds))}
        variant="contained"
        sx={{ width: '100%' }}
      >
        Let&apos;s talk !
      </Button>
    </Card>
  )
}

export default Speakers
