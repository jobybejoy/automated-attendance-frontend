import React from "react"

const initalUser = {
  user: { name: "", email: "" },
  isError: false,
  isLoading: false
}

export const UserContext = React.createContext(initalUser);