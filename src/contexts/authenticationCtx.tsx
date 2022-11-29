import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { getConnectedUser } from "generated/hook";
import { ConnectedUserOutboundDto } from "generated/model";
import { notImplemented } from "services/context";

interface AuthenticationContext {
  isAuthenticated: boolean;
  connectedUser?: ConnectedUserOutboundDto;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectedUser: React.Dispatch<React.SetStateAction<ConnectedUserOutboundDto | undefined>>;
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
  const [connectedUser, setConnectedUser] = useState<ConnectedUserOutboundDto>()

  useEffect(() => {
    getConnectedUser()
      .then(connectedUserOutboundDto => {
        setIsAuthenticated(true);
        setConnectedUser(connectedUserOutboundDto);
      }
   )
  }, [])
  
  return <AuthenticationCtx.Provider value={{
    isAuthenticated,
    connectedUser,
    setIsAuthenticated,
    setConnectedUser,
  }}>
    {children}
  </AuthenticationCtx.Provider>;
};
