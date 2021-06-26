import React from "react";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { addNewFriend } from "../../store/friend";
import { searchUser } from "../../store/users";

export default function AddFriendsFormComponent(){
    const dispatch = useDispatch();
    const [username, setUserName] = useState("");
    const [errors, setErrors] = useState([]);
    const [searchedUser, setSearchedUser] = useState('');
    const [friendRequestSuccess, setFriendRequestSucess] = useState(false)
    const user = useSelector(state => state.session.user)

    const search = async (e) => {
        e.preventDefault();
        setErrors([])
        setSearchedUser('')
        setFriendRequestSucess(false)
        const data = await dispatch(searchUser({username}))
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setSearchedUser(data)
        }
    }

    const sendFriendRequest = async (e) => {
        e.preventDefault();
        const requester_id = user.id;
        const accepter_id = searchedUser.id;
        const accepted = false
        setErrors([])
        setSearchedUser([])
        setFriendRequestSucess(false)

        const data = await dispatch(addNewFriend({requester_id, accepter_id, accepted}))
        if (data.errors) {
            setErrors(data.errors);
        } else {
            setFriendRequestSucess(true)
        }

    }

    return(
        <>
        <form onSubmit={search} className="">
            <div>
            {errors.map((error, id) => (
                <div key={id}>{error}</div>
            ))}
            </div>
            {friendRequestSuccess &&
                <div>
                    Friend request sent!
                </div>
            }
            <div>
            <label>Who do you want to add? </label>
            <input
                name="username"
                type="text"
                placeholder="Enter Friends Username"
                value={username}
                onChange={(e)=>setUserName(e.target.value)}
            />
            </div>
            <button type="submit">Search User</button>
        </form>
        {searchedUser &&
            <div>
                <div>
                    {searchedUser.username}
                </div>
                <button onClick={sendFriendRequest}>
                    Send Friend Request
                </button>
            </div>

        }
        <div>
            <NavLink to='/friends'>
                <button>BACK</button>
            </NavLink>
        </div>
        </>
    )
}
