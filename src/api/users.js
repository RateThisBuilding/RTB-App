import { POSTOpts } from './'

const API_ROOT = 'http://ratethisbuilding.com/api/buildings_1/user'

const acquireInitialToken = function () {
  return fetch(`${API_ROOT}/token.json`, POSTOpts()).then(response => response.json())
}

const login = function(username, password, CSRFtoken){
  return fetch(`${API_ROOT}/login.json`, { ...POSTOpts(CSRFtoken),
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(response => {
    console.log(response);
    if (!response.ok) {
      return response.json().then(respBody => {
        throw Error(respBody)
      })
    }
    else return response.json()
  })
}

const logout = function(CSRFtoken) {
  return fetch(`${API_ROOT}/logout.json`,POSTOpts(CSRFtoken)).then(response => response.json())
}

export default {
  acquireInitialToken,
  login,
  logout
}
