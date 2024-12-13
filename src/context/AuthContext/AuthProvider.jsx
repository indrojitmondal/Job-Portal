import React, { Children, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import auth from '../../firebase/firebase.init';
import {onAuthStateChanged } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";
const AuthProvider = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading]= useState(true);
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{

       const unsubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            console.log('state captured: ',currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }

    },[])

    const authInfo={
        user,
        loading,
        createUser,
        signInUser,
        signOutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;