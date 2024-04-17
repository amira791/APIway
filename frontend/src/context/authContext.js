import { useEffect } from "react";
import { createContext , useReducer  } from "react";



export const  AuthContext = createContext();



export const authReducer = (state , action) => {
    switch(action.type){
        case 'LOGIN' :
            return { 
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                username: action.payload.username
            }
        case 'LOGOUT' :
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                username : null
            }
        default :
            return state
    }
}
export const AuthContextPrivider = ({children}) => {

   const [state,dispatch] = useReducer(authReducer , {
    isAuthenticated: false,
    token: null,
    username : null
   });

   useEffect(()=>{
    
     const token = localStorage.getItem('jwtToken');
     const username = localStorage.getItem('username');
     if (token && username) {
        dispatch({type : 'LOGIN' , payload: {token : token , username : username}})
     }
   },[])

   console.log('AuthContext state:' , state);

   return(
     <AuthContext.Provider value={{ ...state , dispatch }}>
        { children }
    </AuthContext.Provider>
   )
}


