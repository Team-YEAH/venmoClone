import React from "react";
import {useSelector, useDispatch } from "react-redux";

import {acceptFriendRequest, removeFriend} from  '../../store/friend';


const PendingRequestsComponent = ({username, requester_id, accepter_id, profileImage}) => {

    const dispatch = useDispatch();

    const cancelRequest = async (e) =>{
        e.preventDefault();
        await dispatch(removeFriend({requester_id, accepter_id}))
    }

    return (
        <>
            <img className='friend__icon' src={profileImage}/>
            <div className='div__friend__username'>
                {username}
            </div>
            <button className='friend__button' onClick={cancelRequest}>
                Cancel
            </button>
        </>
    )
}

export default PendingRequestsComponent;
