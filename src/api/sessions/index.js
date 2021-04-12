import useSWR from 'swr'

import { GET_SESSIONS_URL } from "../urls"

import useToken from "../auth/useToken"

import fetcher from "../fetcher"

// const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useSessions() {
  console.log("User Sessions fetch invoked");
  const { token } = useToken();
  const { data, error } = useSWR([GET_SESSIONS_URL, token], fetcher)

  return {
    sessions: data,
    isLoading: !error && !data,
    isError: error
  }
}