import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


const ProfilePage = () => {
    const user = useSelector(state => state.session.user)


    return (
        <>
            <div>
                {user.full_name}
            </div>
            <div>
                {user.username}
            </div>
            <div>
                {user.email}
            </div>
            <div>
                {user.profileImage}
            </div>
            <div>
                ${user.balance}
            </div>
            <div>
                {user.phonenumber}
            </div>
            <NavLink to='/profilesettings'>
                Settings
            </NavLink>
        </>
    )
}

export default ProfilePage
