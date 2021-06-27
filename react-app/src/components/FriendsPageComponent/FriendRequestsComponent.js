import React from "react";
import {useSelector, useDispatch } from "react-redux";

import {acceptFriendRequest, removeFriend} from  '../../store/friend';


const FriendRequestsComponent = ({username, requester_id, accepter_id, profileImage}) => {

    const dispatch = useDispatch();

    let accepted=true

    const acceptFriend = async (e) =>{
        e.preventDefault();
        await dispatch(acceptFriendRequest({requester_id, accepter_id, accepted}))
    }

    return (
        <>
            <div className='div__friend__username'>
                {username}
            </div>
            <img className='friend__icon' src={profileImage}/>
            <button onClick={acceptFriend}>
                Accept Friend
            </button>
        </>
    )
}

export default FriendRequestsComponent;
