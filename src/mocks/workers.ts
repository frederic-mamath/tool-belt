import { v4 as uuidv4 } from 'uuid'

import { Team } from 'mocks/teams'


export interface Worker {
  id: string
  displayName: string
  isEnabledByDefault: boolean
  teams: Team[]
  isOff?: boolean
}

export const QA_WORKERS: Worker[] = [
  {
    id: uuidv4(),
    displayName: 'Ramandeep',
    isEnabledByDefault: true,
    teams: [],
  },
]
export const PRODUCT_WORKERS: Worker[] = [
  {
    id: uuidv4(),
    displayName: 'Samantha',
    isEnabledByDefault: true,
    teams: [],
  },
  { id: uuidv4(), displayName: 'Yuliaa', isEnabledByDefault: true, teams: [] },
  { id: uuidv4(), displayName: 'Imane', isEnabledByDefault: true, teams: [] },
  {
    id: uuidv4(),
    displayName: 'Richard',
    isEnabledByDefault: false,
    teams: [],
  },
]
export const TECH_WORKERS: Worker[] = [
  {
    id: uuidv4(),
    displayName: 'Frederic',
    isEnabledByDefault: true,
    teams: [],
  },
  { id: uuidv4(), displayName: 'Jorge', isEnabledByDefault: false, teams: [] },
  { id: uuidv4(), displayName: 'Maxime', isEnabledByDefault: true, teams: [] },
  { id: uuidv4(), displayName: 'Mohamed', isEnabledByDefault: true, teams: [] },
  { id: uuidv4(), displayName: 'Othmane', isEnabledByDefault: true, teams: [] },

  {
    id: uuidv4(),
    displayName: 'Rodrigo',
    isEnabledByDefault: false,
    teams: [],
  },
]

export const WORKERS = [...TECH_WORKERS, ...QA_WORKERS, ...PRODUCT_WORKERS]
