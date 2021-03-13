import useSWR from 'swr'
import { API_BASE } from "../base"

const fetcher = (...args) => fetch(...args).then(res => res.json())

// Fetches the User using SWR
export default function useUser() {
  console.log("User API fetch invoked");
  const { data, error } = useSWR(`${API_BASE}/user`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}