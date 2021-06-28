import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import FriendsComponent from './FriendsComponent'
import FriendRequestsComponent from "./FriendRequestsComponent";
import PendingRequestsComponent from "./PendingRequestsComponent";
import friend_l_icon from '../img/friend_lists.png';
import pending_icon from '../img/pending.png';
import friend_r_icon from '../img/friend_requests.png'
// import {getFriends} from  '../../store/friend';

import './FriendsPageComponent.css'

export default function FriendsPageComponent(){
    const dispatch = useDispatch()
    const history = useHistory()

    const divFriendsList = useRef()
    const divFriendRequests = useRef()
    const divPendingRequests = useRef()

    const friendButton = useRef()
    const friendReqButton = useRef()
    const pendingReqButton = useRef()

    const friends = useSelector(state=> state.friend.friends)
    const friend_requests = useSelector(state=> state.friend.friend_requests)
    const pending_requests = useSelector(state=> state.friend.pending_requests)

    // useEffect(()=>{

    // },[friends, friend_requests, pending_requests])

    if(friends === null){
        history.push('/profile')
    }

    const friendListButton = () => {
        if (friendReqButton.current.classList.contains('active')){
            friendReqButton.current.classList.remove('active')
            divFriendRequests.current.classList.add('hidden')

            divFriendsList.current.classList.remove('hidden')
            friendButton.current.classList.add('active')
        } else if (pendingReqButton.current.classList.contains('active')) {
            pendingReqButton.current.classList.remove('active')
            divPendingRequests.current.classList.add('hidden')

            divFriendsList.current.classList.remove('hidden')
            friendButton.current.classList.add('active')
        }
    }

    const friendRequestButton = () => {
        if (friendButton.current.classList.contains('active')){
            friendButton.current.classList.remove('active')
            divFriendsList.current.classList.add('hidden')

            divFriendRequests.current.classList.remove('hidden')
            friendReqButton.current.classList.add('active')
        } else if (pendingReqButton.current.classList.contains('active')) {
            pendingReqButton.current.classList.remove('active')
            divPendingRequests.current.classList.add('hidden')

            divFriendRequests.current.classList.remove('hidden')
            friendReqButton.current.classList.add('active')
        }
    }

    const pendingRequestButton = () => {
        if (friendReqButton.current.classList.contains('active')){
            friendReqButton.current.classList.remove('active')
            divFriendRequests.current.classList.add('hidden')

            divPendingRequests.current.classList.remove('hidden')
            pendingReqButton.current.classList.add('active')
        } else if (friendButton.current.classList.contains('active')){
            friendButton.current.classList.remove('active')
            divFriendsList.current.classList.add('hidden')

            divPendingRequests.current.classList.remove('hidden')
            pendingReqButton.current.classList.add('active')
        }
    }

    return(
        <>
            {/* <div className="addFriendsButton">
                <NavLink to="/addFriends">
                    <button>Add Friend</button>
                </NavLink>
            </div> */}
            <div className='div__friends__list__container'>
                <div className="div__friends__list__flex">
                    <div className='friends__list' ref={divFriendsList}>Friends List:
                        <ul className='ul__friends__lists'>
                        {friends && Object.keys(friends).map((key, id)=>{
                            return (
                                <li>
                                    <FriendsComponent key={key}
                                        username={friends[key].username}
                                        requester_id={friends[key].requester_id}
                                        accepter_id={friends[key].accepter_id}
                                        profileImage = {friends[key].profileImage}
                                    />
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className='friend__requests hidden' ref={divFriendRequests}>Friend Requests:
                        <ul className='ul__friend__requests'>
                            {friend_requests && Object.keys(friend_requests).map((key, id)=>{
                                return (
                                    <li>
                                        <FriendRequestsComponent key={key}
                                            username={friend_requests[key].username}
                                            requester_id={friend_requests[key].requester_id}
                                            accepter_id={friend_requests[key].accepter_id}
                                            profileImage = {friend_requests[key].profileImage}
                                            />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='pending__requests hidden' ref={divPendingRequests}>Pending Requests:
                        <ul className='ul__pending__requests'>
                            {pending_requests && Object.keys(pending_requests).map((key, id)=>{
                                return(
                                    <li>
                                        <PendingRequestsComponent key={key}
                                                username={pending_requests[key].username}
                                                requester_id={pending_requests[key].requester_id}
                                                accepter_id={pending_requests[key].accepter_id}
                                                profileImage = {pending_requests[key].profileImage}
                                                />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='div__friend__buttons__container'>
                    <div>
                        <img className='img__icons__friends__1 active'
                             ref={friendButton} src={friend_l_icon}
                             onClick={friendListButton}
                             />
                    </div>
                    <div>
                        <img className='img__icons__friends__2'
                             ref={friendReqButton} src={friend_r_icon}
                             onClick={friendRequestButton}
                             />
                    </div>
                    <div>
                        <img className='img__icons__friends__3'
                             ref={pendingReqButton} src={pending_icon}
                             onClick={pendingRequestButton}
                             />
                    </div>
                </div>
            </div>


        </>
    )
}
