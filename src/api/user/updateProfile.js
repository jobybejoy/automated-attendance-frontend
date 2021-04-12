import { UPDATE_PROFILE_URL } from "../urls"




export default async function UpdateUserProfile(data, token) {
  return await fetch(UPDATE_PROFILE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    },
    body: JSON.stringify(data)
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json()
        throw error
      }
      return res.json();
    })
    .catch(err => new Error(err.json()))

}