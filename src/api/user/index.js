import useSWR from 'swr'

import { GET_USER_URL } from "../urls"

import useToken from "../auth/useToken"
import fetcher from "../fetcher"


// Fetches the User using SWR
export default function useUser() {
  console.log("User API fetch invoked");
  const { token } = useToken()
  const { data, error } = useSWR([GET_USER_URL, token], fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}