const API_ROOT = 'http://ratethisbuilding.com/api/buildings_1/user'

const acquireInitialToken = function () {
  return fetch(`${API_ROOT}/token.json`, {
    method: 'POST'
  })
}

const login = function(username, password, CSRFtoken){
  return fetch(`${API_ROOT}/login.json`, {
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN' : CSRFtoken
    },
    body: JSON.stringify({
      username,
      password
    })
  })
}

const logout = function(CSRFtoken) {
  return fetch(`${API_ROOT}/logout.json`,{
    method: 'POST',
    headers: {
      'X-CSRF-TOKEN' : CSRFtoken
    }
  })
}

export default {
  acquireInitialToken,
  login,
  logout
}
