import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom"
import FriendsComponent from './FriendsComponent'
// import {getFriends} from  '../../store/friend';

export default function FriendsPageComponent(){
    const dispatch = useDispatch()
    const history = useHistory()

    // const friends = useSelector(state=> state.friend.friends)
    // const friend_requests= useSelector(state=> state.friend.friend_requests)
    // const pending_requests= useSelector(state=> state.friend.pending_requests)

    const friendsState = useSelector(state=> state.friend.friends)
    const friend_requestsState = useSelector(state=> state.friend.friend_requests)
    const pending_requestsState = useSelector(state=> state.friend.pending_requests)

    const [friends, setFriends] = useState(friendsState)
    const [friend_requests, setFriendRequests] = useState(friend_requestsState)
    const [pending_requests, setPendingRequests] = useState(pending_requestsState)

    // useEffect(()=>{
    //     const getFL = async () => {
    //         await dispatch(getFriends())
    //         // await setFriends(friendsState)
    //         // await setFriendRequests(friend_requestsState)
    //         // await setPendingRequests(pending_requestsState)
    //     }
    //     getFL()
    // },[dispatch])

    useEffect(()=>{
        
    },[friends, friend_requests, pending_requests])

    if(friends === null){
        history.push('/profile')
    }

    return(
        <>
            <div className="addFriendsButton">
                <NavLink to="/addFriends">
                    <button>Add Friend</button>
                </NavLink>
            </div>
            <div>Friends List:</div>
            <div className="friendsListContainer">
            </div>
            {friends && Object.keys(friends).map((key, id)=>{
                return <FriendsComponent key={key} type={'friends'}
                    username={friends[key].username}
                    requester_id={friends[key].requester_id}
                    accepter_id={friends[key].accepter_id}
                    profileImage = {friends[key].profileImage}
                    />
            })}
            <div>Friend Requests:</div>
            {friend_requests && Object.keys(friend_requests).map((key, id)=>{
                return <FriendsComponent key={key} type={'friend_requests'}
                    username={friend_requests[key].username}
                    requester_id={friend_requests[key].requester_id}
                    accepter_id={friend_requests[key].accepter_id}
                    profileImage = {friend_requests[key].profileImage}
                    />
            })}
            <div>Pending Requests:</div>
            {pending_requests && Object.keys(pending_requests).map((key, id)=>{
                return <FriendsComponent key={key} type={'pending_requests'}
                        username={pending_requests[key].username}
                        requester_id={pending_requests[key].requester_id}
                        accepter_id={pending_requests[key].accepter_id}
                        profileImage = {pending_requests[key].profileImage}
                        />
            })}
            <div>
                <NavLink to='/profile'>
                    <button>BACK</button>
                </NavLink>
            </div>
        </>
    )
}
