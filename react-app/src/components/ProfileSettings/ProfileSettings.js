import React, {useEffect, useState} from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const ProfileSettings = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [full_name, setFullName] = useState(user?.full_name)
    const [username, setUsername] = useState(user?.username)
    const [password, setPassword] = useState(user?.password)
    const [email, setEmail] = useState(user?.email)
    const [phonenumber, setPhoneNumber] = useState(user?.phonenumber)
    const [profileImage, setProfileImage] = useState(user?.profileImage)

    const updateFullName = (e) => {
        setFullName(e.target.value)
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const updateProfileImage = (e) => {
        setProfileImage(e.target.value)
    }

    return (
        <>
            <div>
                <label>
                    Full Name
                </label>
                <input
                name="full_name"
                value={full_name}
                type="text"
                onChange={updateFullName}
                />
            </div>
            <div>
                <label>
                    Username
                </label>
                <input
                name="username"
                value={username}
                type="text"
                onChange={updateUsername}
                />
            </div>
            <div>
                <label>
                    Email
                </label>
                <input
                name="email"
                value={email}
                type="text"
                onChange={updateEmail}
                />
            </div>
            <div>
                <label>
                    Password
                </label>
                <input
                name="password"
                value={password}
                type="text"
                onChange={updatePassword}
                />
            </div>
            <div>
                <label>
                    Phone number
                </label>
                <input
                name="phonenumber"
                value={phonenumber}
                type="text"
                onChange={updatePhoneNumber}
                />
            </div>
            <div>
                <label>
                    Profile Image
                </label>
                <input
                name="profileImage"
                value={profileImage}
                type="text"
                onChange={updateProfileImage}
                />
            </div>
            <NavLink to='/profile'>
                Back to Profile
            </NavLink>
        </>
    )
}

export default ProfileSettings
