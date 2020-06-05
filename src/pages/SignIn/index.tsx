import React,{useContext} from 'react';
import { View,Button } from 'react-native';

import AuthContext from './../../contexts/auth';

const SignIn:React.FC=()=>{
    const {signed,signIn}=useContext(AuthContext);
    console.log(signed);
    function handleSignIn(){
      signIn();
    }
    return(
            <View style={{flex:1,justifyContent:'center'}}>
            <Button title="Sign In"
            onPress={handleSignIn}
            />
            </View>
        
        )

}

export default SignIn;
