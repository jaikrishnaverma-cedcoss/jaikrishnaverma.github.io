import React, { useEffect, useState } from 'react';
import './App.css';
import SignIn from './Auth/SignIn';
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import { getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import app from './firebaseConfig';
function App() {
  const auth = getAuth(app)
  const [authUser, setAuthUser] = useState(null)
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
      console.log(user)
    })
  }, [])

  if (!authUser)
    return <div className="container d-flex vh-100 justify-content-center align-items-center"><SignIn /></div>

  return (
    <>
      <NavBar />
      <div className="container d-flex ">
        <Home authUser={authUser}/>
      </div>
    </>
  );
}

export default App;
