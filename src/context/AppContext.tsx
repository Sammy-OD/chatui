import { createContext, ReactNode, useContext, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

type AppProps = {
  children: ReactNode
}

const AppContext = createContext({});

export const useApp = () => {
  return useContext(AppContext)
}

export const AppProvider = ({children}: AppProps) => {
  const [data, setData] = useSessionStorage<{name: string, room: string}[]>('app-data', [])

  return (
    <AppContext.Provider value={{data, setData}}>
      {children}
    </AppContext.Provider>
  )
}