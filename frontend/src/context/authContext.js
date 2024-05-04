import { createContext, useEffect, useReducer } from "react";


export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                isFournisseur: action.payload.user.is_fournisseur,
                isConsommateur: action.payload.user.is_consommateur,
                isAdmin :action.payload.user.is_admin,
                token: action.payload.token,
                username: action.payload.user.username
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                isFournisseur: false,
                isConsommateur: false,
                isAdmin :false,
                token: null,
                username: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        isFournisseur: null,
        isConsommateur: null,
        isAdmin :null,
        token: null,
        username: null
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const username = localStorage.getItem('username');
        const isFournisseur = localStorage.getItem('isFournisseur');
        const isConsommateur = localStorage.getItem('isConsommateur');
        const isAdmin = localStorage.getItem('isAdmin');
        if (token && username) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: token,
                    user: {
                        username: username,
                        is_fournisseur: isFournisseur === 'true',
                        is_consommateur: isConsommateur === 'true',
                        is_admin: isAdmin === 'true'
                    }
                }
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
