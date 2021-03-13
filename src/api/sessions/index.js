import useSWR from 'swr'
import { API_BASE } from "../base"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useSessions() {
  console.log("User Sessions fetch invoked");
  const { data, error } = useSWR(`${API_BASE}/sessions`, fetcher)

  return {
    sessions: data?.sessions,
    isLoading: !error && !data,
    isError: error
  }
}