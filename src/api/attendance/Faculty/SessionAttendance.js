import useSWR from 'swr'

import { GET_SESSION_ATTENDANCE_ON_DATE_URL } from "../../urls"

import useToken from "../../auth/useToken"

// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = (url, token) => fetch(url, {
  headers: { Authorization: `token ${token}` }
})
  .then(res => res.json())

export default function useAllStudentAttendance(course_id, session_id, date) {

  console.log("Session Attendance Rquest fetch invoked");
  const { token } = useToken();
  const { data, error } = useSWR([GET_SESSION_ATTENDANCE_ON_DATE_URL(course_id, session_id, date), token], fetcher, { refreshInterval: 1000 })

  return {
    student_attendance: data,
    isLoading: !error && !data,
    isError: error
  }
}