export const findSession = (sessions, department, course_number, session_id) => {
  if (sessions) {
    const param_course_string = department.toLowerCase() + " " + course_number
    return sessions.find(x => (x.session_name === session_id) && (x.course_string === param_course_string))
  }
}