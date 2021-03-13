import React from "react"

const initalSessions = {
  sessions: [],
  selectedSession: undefined,
  isError: false,
  isLoading: false
}

export const SessionsContext = React.createContext(initalSessions);