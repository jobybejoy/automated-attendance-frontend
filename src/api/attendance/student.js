import useSWR from 'swr'

import { GET_STUDENT_ATTENDANCE_URL } from "../urls"

import useToken from "../auth/useToken"
import fetcher from "../fetcher"

// const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useStudentAttendance(course_id, session_id) {
  console.log("Attendance fetch invoked");
  const { token } = useToken();
  const { data, error } = useSWR([GET_STUDENT_ATTENDANCE_URL(course_id, session_id), token], fetcher)

  return {
    session_attendance: data,
    isLoading: !error && !data,
    isError: error
  }
}