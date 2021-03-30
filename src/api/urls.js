import { API_BASE } from "./base"

export const POST_LOGIN_URL = `${API_BASE}/api/login/?format=json`
export const GET_USER_URL = `${API_BASE}/api/profile/`
export const UPDATE_PROFILE_URL = `${API_BASE}/api/profile/`
export const GET_SESSIONS_URL = `${API_BASE}/api/sessions/`

export const GET_STUDENT_ATTENDANCE_URL = (course_id, session_id) => `${API_BASE}/api/attendance/course/${course_id}/session/${session_id}/`
export const GET_SESSION_ATTENDANCE_URL = (course_id, session_id) => `${API_BASE}/api/attendance/faculty/course/${course_id}/session/${session_id}/`

export const GET_SESSION_ATTENDANCE_ON_DATE_URL = (course_id, session_id, date) => {
  const formated_date = new Date(date).toLocaleDateString('fr-CA')
  return `${API_BASE}/api/attendance/faculty/course/${course_id}/session/${session_id}/date/${formated_date}/`
}

export const UPDATE_SESSION_ATTENDANCE_ON_DATE_URL = (course_id, session_id, date) => {
  const formated_date = new Date(date).toLocaleDateString('fr-CA')
  return `${API_BASE}/api/attendance/faculty/course/${course_id}/session/${session_id}/date/${formated_date}/`
}

export const POST_SESSION_ATTENDANCE_ON_DATE_URL = (course_id, session_id, date) => {
  const formated_date = new Date(date).toLocaleDateString('fr-CA')
  return `${API_BASE}/api/attendance/faculty/course/${course_id}/session/${session_id}/date/${formated_date}/`
}