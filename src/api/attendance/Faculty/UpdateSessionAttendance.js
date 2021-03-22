import { UPDATE_SESSION_ATTENDANCE_ON_DATE_URL } from "../../urls"


export default async function UpdateSessionAttendance(token, course_id, session_id, date, student_id) {
  // const { token } = useToken();
  return await fetch(UPDATE_SESSION_ATTENDANCE_ON_DATE_URL(course_id, session_id, date), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    },
    body: JSON.stringify({
      id: student_id
    })
  })
    .then(data => data.json())
    .catch(error => error)
  // .then(data => { return { token: "TEST_TOKEN" } }).catch(err => { return { token: "TEST_TOKEN" } })

}