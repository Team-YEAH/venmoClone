import React from 'react';
import {useSelector, useDispatch } from "react-redux";

import {acceptFriendRequest, removeFriend} from  '../../store/friend';

import './FriendsComponent.css'

const FriendsComponent = ({username, requester_id, accepter_id, profileImage}) =>{

    const dispatch = useDispatch();

    const deleteFriend = async (e) =>{
        e.preventDefault();
        await dispatch(removeFriend({requester_id, accepter_id}))
    }

    return (
        <>
            <div className='div__friend__username'>
                {username}
            </div>
            <img className='friend__icon' src={profileImage}/>
            <button className='friend__button'onClick={deleteFriend}>
                Delete Friend
            </button>
        </>
    )
}

export default FriendsComponent;
