import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.cookie
      ? fetch('/user')
        .then(res => {
          if (res.status === 200) return res.json()
          return null
        })
        .then(json => setUser(json)) : setUser(null)
  }, [setUser])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
