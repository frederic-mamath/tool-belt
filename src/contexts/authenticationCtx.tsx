import { createContext, ReactNode, useContext, useState } from "react";

import { ClearstreamUserOutboundDto } from "generated/model";
import { notImplemented } from "services/context";

interface AuthenticationContext {
  isAuthenticated: boolean;
  connectedUser?: ClearstreamUserOutboundDto;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectedUser: React.Dispatch<React.SetStateAction<ClearstreamUserOutboundDto | undefined>>;
}

export const AuthenticationCtx = createContext<AuthenticationContext>({
  isAuthenticated: false,
  setIsAuthenticated: notImplemented,
  setConnectedUser: notImplemented,
});

export const useAuthenticationCtx = () => useContext(AuthenticationCtx);

interface Props {
  children: ReactNode
}

export const AuthenticationCtxProvider = (props: Props) => {
  const { children } = props
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [connectedUser, setConnectedUser] = useState<ClearstreamUserOutboundDto>()

  return <AuthenticationCtx.Provider value={{
    isAuthenticated,
    connectedUser,
    setIsAuthenticated,
    setConnectedUser,
  }}>
    {children}
  </AuthenticationCtx.Provider>;
};
