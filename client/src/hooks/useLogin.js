import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const login = async (password, username) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("api/v1/user/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password, username})
        })

        const json = await response.json();

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            navigate("/homepage");

        }
    }

    return { login, isLoading, error }
}
