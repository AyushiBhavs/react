import React, { useState,useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSignIn from './pages/UserSignIn';
import RetailUserDetails from './pages/RetailUserDetails';
const dashCtx = React.createContext()
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const logoutFunction = () => {
    localStorage.removeItem("userToken")
    setIsLoggedIn(false)
  }

  useEffect(() => {
    let token = localStorage.getItem("userToken")
    setIsLoggedIn(token)
  });

  return (
    <>
    
      <dashCtx.Provider value={{isLoggedIn,setIsLoggedIn,logoutFunction}}>
        {isLoggedIn ? <RetailUserDetails /> : <UserSignIn />}
      </dashCtx.Provider>


    </>
  )
}
export default App
export { dashCtx }