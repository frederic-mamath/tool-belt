import { Team } from "mocks/teams";

export interface Worker {
  id: string;
  displayName: string;
  isEnabledByDefault: boolean;
  teams: Team[];
  isOff?: boolean;
}
