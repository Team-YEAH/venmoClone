import React, {useEffect, useState} from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { edit } from "../../store/session";
import "./ProfileSettings.css"

const ProfileSettings = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [full_name, setFullName] = useState(user?.full_name)
    const [username, setUsername] = useState(user?.username)
    const [password, setPassword] = useState(user?.password)
    const [email, setEmail] = useState(user?.email)
    const [phonenumber, setPhoneNumber] = useState(user?.phonenumber)
    const [profileImage, setProfileImage] = useState(user?.profileImage)
    const [errors, setErrors] = useState([]);

    const onEdit = async (e) => {
        e.preventDefault();
        setErrors([])
        const id = user.id
        let newErrors = []

        if(phonenumber.length !== 11) {
            newErrors.push('Phone number is too long/short. Please do not exceed 11 digits.')

        }

        if (newErrors.length) {
            setErrors(newErrors)
            return
        }
        const data = await dispatch(edit({id, full_name, username, email, phonenumber, profileImage}))

        try{
            if (data.errors) {
                setErrors(data.errors);
            }
        } catch {
            //
        }
        history.push("/profile")

    }

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
        const file = e.target.files[0];
        if (file) setProfileImage(file)
    }

    return (
        <>
        <div className='ProfileSettingsContainer'>
            <form className='ProfileSettingsBox' onSubmit={onEdit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label className='ProfileSettingsLabel'>
                        Full Name
                    </label>
                    <input
                    className='ProfileSettingsBoxes'
                    name="full_name"
                    value={full_name}
                    type="text"
                    onChange={updateFullName}
                    />
                </div>
                <div>
                    <label className='ProfileSettingsLabel'>
                        Username
                    </label>
                    <input
                    className='ProfileSettingsBoxes'
                    name="username"
                    value={username}
                    type="text"
                    onChange={updateUsername}
                    />
                </div>
                <div>
                    <label className='ProfileSettingsLabel'>
                        Email
                    </label>
                    <input
                    className='ProfileSettingsBoxes'
                    name="email"
                    value={email}
                    type="text"
                    onChange={updateEmail}
                    />
                </div>
                <div>
                    <label className='ProfileSettingsLabel'>
                        Password
                    </label>
                    <input
                    className='ProfileSettingsBoxes'
                    name="password"
                    value={password}
                    type="text"
                    onChange={updatePassword}
                    />
                </div>
                <div>
                    <label className='ProfileSettingsLabel'>
                        Phone number
                    </label>
                    <input
                    className='ProfileSettingsBoxes'
                    name="phonenumber"
                    value={phonenumber}
                    type="text"
                    onChange={updatePhoneNumber}
                    />
                </div>
                <div>
                    <label className='ProfileSettingsLabel'>
                        Profile Image
                    </label>
                    <input
                    className='ProfileSettingsBoxes'
                    type="file"
                    onChange={updateProfileImage}
                    />
                </div>
                <button className='ProfileSettingsSubmit' type="submit">Edit</button>
                <NavLink className='ProfileBtn' to='/profile'>
                    Back to Profile
                </NavLink>
            </form>
        </div>
        </>
    )
}

export default ProfileSettings
