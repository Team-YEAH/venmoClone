import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import './ProfilePage.css';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user)


    return (
        <>
            <div className='div__outer__container'>
                <div className='div__profile__container'>
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

                </div>

                <div className='div__transactions__container'>
                    <NavLink to='/transactions'>
                        Transactions
                    </NavLink>
                </div>

            </div>
        </>
    )
}

export default ProfilePage
