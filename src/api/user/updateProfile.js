import { UPDATE_PROFILE_URL } from "../urls"

export default async function updateUserProfile(data) {
  return await fetch(UPDATE_PROFILE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
    .catch(error => error)
  // .then(data => { return { token: "TEST_TOKEN" } }).catch(err => { return { token: "TEST_TOKEN" } })

}