import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { addNewFriend } from "../../store/friend";


export default function AddFriendsFormComponent(){
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)

    const onSend = async (e) => {
        e.preventDefault();
        let accepted = false;
        const friendData = await dispatch(addNewFriend(user.id,userName, accepted))
        if (friendData.errors) {
            setErrors(friendData.errors);
            }
    }

    return(
        <form onSubmit={onSend} className="">
            <div>
            {errors.map((error) => (
                <div>{error}</div>
            ))}
            </div>
            <div>
            <label>Who do you want to add?:</label>
            <input
                name="username"
                type="text"
                placeholder="Enter Friends Username"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
            />
            </div>
            <button type="submit">Send Friend Request</button>
        </form>
    )
}
