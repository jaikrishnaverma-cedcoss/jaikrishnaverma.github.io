import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
const SignIn = () => {
  const SignInGoogle=async ()=>
  {
  const provider = new GoogleAuthProvider();
let info= await signInWithPopup(auth, provider)
  }

 
  return (
    <button className="btn btn-warning" onClick={SignInGoogle}>Sign In With Google</button>
  )
}

export default SignIn