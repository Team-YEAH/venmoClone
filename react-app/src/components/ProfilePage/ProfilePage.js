import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getTransactionsRecords } from "../../store/transactionHistory";
import { getCurrentBalance } from "../../store/transaction";
import TransactionComponentContainer from "../TransactionComponent/TransactionComponentContainer";

import './ProfilePage.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(async()=>{
        await dispatch(getTransactionsRecords())
        await dispatch(getCurrentBalance())
    }, [])

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
                    <div className='button__profile__friends'>
                        <NavLink to='/friends'>
                            <button >Friends</button>
                        </NavLink>
                    </div>
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
        </>
    )
}

export default ProfilePage
