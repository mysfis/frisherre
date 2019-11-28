import React from 'react'
import axios from 'axios';
import { useAuth } from './auth'

const UserContext = React.createContext()

function UserProvider (props) {

    const [userData, setUserData] = React.useState({
        user: null,
        household: null,
        profile: null
    })
    const {data} = useAuth()


    const getUser = () => {
        axios.defaults.headers= {
            "Content-Type": "application/json",
            Authorization: "Token " + data.token,
        }
        return axios.get("/api/currentuser/")
            .then(res => {
                const user_acount = res.data[0].user_account
                setUserData({
                    ...userData,
                    user:res.data[0],
                    profiles: user_acount.profiles
                })
            })
    }


    return (
        <UserContext.Provider value={{userData, getUser}} {...props} />
    )
}

const useUser = () => React.useContext(UserContext)

export { UserProvider, useUser }