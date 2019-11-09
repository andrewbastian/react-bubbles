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

  event.PreventDefault()

  axiosWithAuth()
  .post ('/api/login', credentials)
  .then(results => {
    localStorage.setItem('token', results.data.payload);
    props.history.push('/bubblepage')
    console.log('login post results', results)
  })
  .catch(err => {
    alert(err.response.data.error)
    console.log('login posting error', err.response)
  })
}
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>login here:</p>
      <form onSubmit={handleLogin}>

        <input type='text' name='username' placeholder='username' onChange={handleChange}/>
        <input type='text' name='password' placeholder='password' onChange={handleChange}/>
        <button type='submit'>Log In</button>

      </form>
    </>
  );
};

export default Login;
