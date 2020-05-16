import React, { useState } from 'react'

function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function submitForm (e) {
    e.preventDefault()

    async function registerUser () {
      await fetch('/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          })
        })
    }

    registerUser()
  }

  return (
    <div>
      <form onSubmit={submitForm} className='registerForm'>
        <div class='form-group'>
          <label htmlFor='username'>Username:</label>
          <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} id='username' />
        </div>

        <div class='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='text' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} id='email' />
        </div>

        <div class='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} id='password' />
        </div>

        <button type='submit' class='btn btn-primary'>Sign-up</button>
      </form>
    </div>
  )
}

export default Register
