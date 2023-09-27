import React from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, currentUser}) {
  console.log("currentUser from protected route ", currentUser);
  if(!currentUser){
    return (<Navigate to="/login" replace={true} />);
  }else{
    return (<Navigate to="/" replace={true} />);
  }
}
