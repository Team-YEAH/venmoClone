import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getTransactionsRecords } from "../../store/transactionHistory";
import { getCurrentBalance } from "../../store/transaction";
import TransactionComponentContainer from "../TransactionComponent/TransactionComponentContainer";
import {getFriends} from  '../../store/friend';
import friendIcon from '../img/friend.png';
import AddFriendsFormComponent from "../FriendsPageComponent/AddFriendsFormComponent";
import FriendsPageComponent from "../FriendsPageComponent/FriendsPageComponent";

import './ProfilePage.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const friendImageIcon = useRef()
    const divFriendList = useRef()
    const frLength = useRef()

    const friend_requests = useSelector(state=> state.friend.friend_requests)

    useEffect(async()=>{
        await dispatch(getTransactionsRecords())
        await dispatch(getCurrentBalance())
        const getFL = async () => {
            await dispatch(getFriends())
        }
        getFL()

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };

    }, [])

    const toggleFriends = () => {
        if(divFriendList.current.classList.contains('hidden')){
            divFriendList.current.classList.remove('hidden')
            friendImageIcon.current.classList.add('hidden')
            frLength.current.classList.add('hidden')
        } else {
            divFriendList.current.classList.add('hidden')
        }
    }

    const handleClick = e =>{
        try {
          if(divFriendList.current.contains(e.target)){
            return
          }
          divFriendList.current.classList.add('hidden')
          friendImageIcon.current.classList.remove('hidden')
          frLength.current.classList.remove('hidden')
        } catch {
          //
        }
      }

    return (
        <>
            <div className='div__outer__container'>
                <div className='div__profile__container'>
                    <div>
                        <img className='profileImage' src={user.profileImage}>
                        </img>
                    </div>
                    <div className='div__profile__descriptions'>
                        Welcome back, {user.full_name}!
                    </div>
                    <div className='div__profile__descriptions'>
                        User: {user.username}
                    </div>
                    <div className='div__profile__descriptions'>
                        Email: {user.email}
                    </div>
                    <div className='div__profile__descriptions'>
                        Current Balance: ${user.balance}
                    </div>
                    <div className='div__profile__descriptions'>
                        Phone #: {user.phonenumber}
                    </div>
                    <div className='div__profile__links'>
                    <NavLink to='/profilesettings' className='div__profile__links'>
                        Settings
                    </NavLink>
                    </div>
                    <div className='div__profile__links'>
                    <NavLink to='/paymentdetails' className='div__profile__links'>
                        Payment Details
                    </NavLink>
                    </div>
                    {/* <div className='button__profile__friends'>
                        <NavLink to='/friends'>
                            <button >Friends</button>
                        </NavLink>
                    </div> */}
                </div>

                <div className="transaction_display">
                    <NavLink className="transaction_link" to='/transactions'>
                            Transactions
                    </NavLink>
                    <div className='div__transactions__container'>
                        <TransactionComponentContainer />
                    </div>
                </div>


            </div>


            <div className='div__friend__icon'>
                {friend_requests && Object.keys(friend_requests).length !== 0 &&
                    <div className='div__friend__requests__length' ref={frLength}>
                        <span>
                            {Object.keys(friend_requests).length}
                        </span>
                    </div>
                    }
                <img className='img__friend__icon' src={friendIcon} ref={friendImageIcon}
                     onClick={toggleFriends}/>
                <div className='div__friends__list hidden' ref={divFriendList}>
                    <div className='div__friend__list__flex__container'>
                        <div className='div__add__friends__form__container'>
                            <AddFriendsFormComponent />
                        </div>
                        <div className='div__friends__page__container'>
                            <FriendsPageComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
