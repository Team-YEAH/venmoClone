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
                        {user.full_name}
                    </div>
                    <div>
                        {user.username}
                    </div>
                    <div>
                        {user.email}
                    </div>
                    <div>
                        {user.profileImage}
                    </div>
                    <div>
                        ${user.balance}
                    </div>
                    <div>
                        {user.phonenumber}
                    </div>
                    <NavLink to='/profilesettings'>
                        Settings
                    </NavLink>
                    <NavLink to='/paymentdetails'>
                        Payment Details
                    </NavLink>
                </div>

                <div className='div__transactions__container'>
                    <NavLink to='/transactions'>
                        Transactions
                    </NavLink>
                    <TransactionComponentContainer />
                </div>

            </div>
        </>
    )
}

export default ProfilePage
