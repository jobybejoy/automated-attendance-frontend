import { UserContext } from "./UserContext"
import { SessionsContext } from "./SessionsContext"
import { SkeletonTheme } from "react-loading-skeleton"

export default function TestProviderWrapper(props) {

  const { user, isUserError, isUserLoading } = props

  const { sessions, isSessionsError, isSessionsLoading } = props

  const { children } = props

  return (
    <UserContext.Provider value={{ user, isError: isUserError, isLoading: isUserLoading }}>
      <SessionsContext.Provider value={{ sessions, isError: isSessionsError, isLoading: isSessionsLoading }}>
        <SkeletonTheme color="var(--bg-secondary-color)" highlightColor="var(--bg-primary-color)">
          {children}
        </SkeletonTheme>
      </SessionsContext.Provider>
    </UserContext.Provider>
  )
}