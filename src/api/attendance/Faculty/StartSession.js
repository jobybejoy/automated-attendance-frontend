import { POST_SESSION_ATTENDANCE_ON_DATE_URL } from "../../urls"


export default async function StartSession(token, course_id, session_id, date) {
  // const { token } = useToken();
  return await fetch(POST_SESSION_ATTENDANCE_ON_DATE_URL(course_id, session_id, date), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    },
  })
    .then(data => data.json())
    .catch(error => error)
  // .then(data => { return { token: "TEST_TOKEN" } }).catch(err => { return { token: "TEST_TOKEN" } })

}