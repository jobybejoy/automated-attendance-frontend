import useSWR from 'swr'

import { GET_SESSION_ATTENDANCE_URL } from "../urls"

import useToken from "../auth/useToken"

// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = (url, token) => fetch(url, {
  headers: { Authorization: `token ${token}` }
})
  .then(res => res.json())

export default function useSessionAttendance(course_id, session_id) {
  console.log("Session Attendance Rquest fetch invoked");
  const { token } = useToken();
  const { data, error } = useSWR([GET_SESSION_ATTENDANCE_URL(course_id, session_id), token], fetcher)

  return {
    session_attendance: data,
    isLoading: !error && !data,
    isError: error
  }
}