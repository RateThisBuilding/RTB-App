import users from './users'
import reviews from './reviews'

export default {
  users,
  reviews
}

export function POSTOpts(CSRFtoken = null){
  return {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'X-CSRF-TOKEN' : CSRFtoken,
    }
  }
}
