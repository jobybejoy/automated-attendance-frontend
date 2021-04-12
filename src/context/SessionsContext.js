import React from "react"

const initalSessions = {
  sessions: [],
  isError: false,
  isLoading: false
}

export const SessionsContext = React.createContext(initalSessions);