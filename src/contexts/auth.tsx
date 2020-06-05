import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';

interface AuthContextData{
    signed:boolean;
    user:object | null;
    loading:boolean;
    signIn():Promise<void>;
    signOut():void;
}

const AuthContext=createContext<AuthContextData>({}as AuthContextData);

export const AuthProvider:React.FC=({children})=>{
    const[user,setUser]=useState<object | null>(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        async function loadStoragedData(){
       const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
       const storagedData = await AsyncStorage.getItem('@RNAuth:token');
       await new Promise(resolve=>setTimeout(resolve,3000));
       
       if(storagedData && storagedData){
           setUser(JSON.parse(storagedUser));
           
       }
       
       setLoading(false);
        }
        loadStoragedData();
     }, []);
    
    async function signIn(){
       const response=await auth.signIn();
       
       setUser(response.user);  
       await AsyncStorage.setItem('@RNAuth:user',JSON.stringify(response.user));
       await AsyncStorage.setItem('@RNAuth:token',response.token);
    }
    async function signOut(){
        AsyncStorage.clear().then(()=>{
setUser(null);
        })
    }

    return(
        <AuthContext.Provider value= { {signed:!!user,user,signIn,signOut,loading } }>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;