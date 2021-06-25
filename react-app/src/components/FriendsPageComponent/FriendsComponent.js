import React from 'react';
import {useSelector, useDispatch } from "react-redux";

import {acceptFriendRequest, removeFriend} from  '../../store/friend';

import './FriendsComponent.css'

const FriendsComponent = ({username, requester_id, accepter_id, type, profileImage}) =>{

    const dispatch = useDispatch();

    let accepted = true;

    const deleteFriend = async (e) =>{
        e.preventDefault();
        await dispatch(removeFriend({requester_id, accepter_id}))
    }

    const acceptFriend = async (e) =>{
        e.preventDefault();
        await dispatch(acceptFriendRequest({requester_id, accepter_id, accepted}))
    }

    const cancelRequest = async (e) =>{
        e.preventDefault();
        await dispatch(removeFriend({requester_id, accepter_id}))
    }

    return (
        <>
            {type === 'friends' &&
                <>
                    <div className='div__friend__username'>
                        {username}
                    </div>
                    <img className='friend__icon' src={profileImage}/>
                    <button onClick={deleteFriend}>
                        Delete Friend
                    </button>
                </>
            }
            {type === 'friend_requests' &&
                <>
                    <div className='div__friend__username'>
                        {username}
                    </div>
                    <img className='friend__icon' src={profileImage}/>
                    <button onClick={acceptFriend}>
                        Accept Friend
                    </button>
                </>
            }
            {type === 'pending_requests' &&
                <>
                    <div className='div__friend__username'>
                        {username}
                    </div>
                    <img className='friend__icon' src={profileImage}/>
                    <button onClick={cancelRequest}>
                        Cancel Request
                    </button>
                </>
            }
        </>
    )
}

export default FriendsComponent;
