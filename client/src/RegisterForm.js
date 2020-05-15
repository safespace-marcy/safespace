import React, { useState } from 'react'

function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div>
            <form action="/user" method="post" className="registerForm">
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  id="username"/>
                
                <label htmlFor="email">Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  id="email"/>
                
                <label htmlFor="password">Password:</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}  id="password"/>
                
                <button type="submit" >Sign-up</button>
              </form>
        </div>
      );
}

export default Register;
