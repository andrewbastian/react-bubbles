import React, {useState} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  const handleLogin = event => {
    event.preventDefault()

    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble-page')
      })
      .catch(err => {
        alert(err.response.data.error)
      })
  }

  return (

  <div>

    <h1>Login to see yr bubbles</h1>

      <form onSubmit={handleLogin}>

        <input type='text' name='username' placeholder='username' onChange={handleChange} />
        <input type='password' name='password' placeholder='password' onChange={handleChange} />
        <button type='submit'>Log In</button>

      </form>

  </div>

  )
}

export default Login;
