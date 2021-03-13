import { useContext } from "react"
import Layout from "../../containers/Layout"
import SessionsList from "../../components/Session/SessionList/index"
import { SessionsContext } from "../../context/SessionsContext"

export default function HomeWrapper(params) {

  const { sessions, isError, isLoading } = useContext(SessionsContext)

  if (isError) { return "Error - " + isError }
  if (isLoading) { return "Loading" }

  return <Home sessions={sessions} />
}


export function Home({ sessions }) {

  return (
    <Layout>
      <h5>Sessions</h5>
      <SessionsList sessions={sessions} />
    </Layout >
  );
}