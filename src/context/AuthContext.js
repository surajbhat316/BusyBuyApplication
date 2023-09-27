import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword , onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    // const [loading, setLoading] = useState(true);


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    useEffect(()=>{

        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Enters");
              // User is signed in, see docs for a list of available properties
              console.log("User ",user);
              setCurrentUser(user);
            //   setLoading(false);
            }
            else{
                console.log("User is not signed in");
                setCurrentUser(null);
            }
        });
        return unsubscribe;
    },[])
    

    const value ={
        currentUser,
        signup,
        login,
        logout,
        setCurrentUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
