import client from 'apiClient'

const localStorageKey = '__bookshelf_token__'

function handleUserResponse(response) {
    window.localStorage.setItem(localStorageKey, response.key)
    return client('get', '/api/v1/myuserinfo/')
}

function getUser() {
    const token = getToken()
    if (!token) {
        return Promise.resolve(null)
    }
    return client('get', '/api/v1/myuserinfo/').catch(error => {
        logout()
        return Promise.reject(error)
    })
}

function login({username, password}) {
  return client('post', 
                '/api/v1/auth/login/', 
                {body: { username: username, password: password,}})
    .then(handleUserResponse)
}

function register({email, password}) {
  return client('post', 
                '/api/v1/auth/registration/', 
                {body: {username: username,
                        email: email,
                        password1: password1,
                        password2: password2,}})
        .then(handleUserResponse)
}

function logout() {
  window.localStorage.removeItem(localStorageKey)
  return Promise.resolve()
}

function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

export {login, register, logout, getToken, getUser}