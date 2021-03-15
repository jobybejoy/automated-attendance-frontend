import { API_BASE } from "./base"

export const POST_LOGIN_URL = `${API_BASE}/api/login/?format=json`
export const GET_USER_URL = `${API_BASE}/api/profile/`
export const UPDATE_PROFILE_URL = `${API_BASE}/api/profile/`
export const GET_SESSIONS_URL = `${API_BASE}/api/sessions/`

export const GET_ATTENDANCE_URL = (course_id, session_id) => `${API_BASE}/api/attendance/course/${course_id}/session/${session_id}`