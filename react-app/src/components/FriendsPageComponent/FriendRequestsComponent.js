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
            <img className='friend__icon' src={profileImage}/>
            <div className='div__friend__username'>
                {username}
            </div>
            <button className='friend__button'onClick={acceptFriend}>
                Confirm
            </button>
        </>
    )
}

export default FriendRequestsComponent;
