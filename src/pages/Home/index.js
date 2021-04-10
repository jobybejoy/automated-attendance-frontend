import { useContext } from "react"
import Layout from "../../containers/Layout"
import SessionsList from "../../components/Session/SessionList/index"
import { SessionsContext } from "../../context/SessionsContext"
import ErrorPage from "../../pages/_Error"

export default function HomeWrapper(params) {

  const { sessions, isError, isLoading } = useContext(SessionsContext)

  if (isError) { return <ErrorPage error={isError} /> }
  if (isLoading) {
    return (
      <Layout>
        <h5>Sessions</h5>
        <SessionsList sessions={sessions} loading={true} />

      </Layout>
    )
  }

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