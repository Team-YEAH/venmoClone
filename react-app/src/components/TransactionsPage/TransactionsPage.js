import React, { useEffect } from "react"
import './TransactionsPage.css';
import { useSelector, useDispatch } from "react-redux"
import { getTransactionsRecords } from "../../store/transactionHistory";
import { getCurrentBalance } from "../../store/transaction";
import TransactionComponentContainer from "../TransactionComponent/TransactionComponentContainer";
import Comments from '../Comment/Comment';

const TransactionsPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(async()=>{
        await dispatch(getTransactionsRecords())
        await dispatch(getCurrentBalance())
    }, [])

    return (
        <>
        <h1 className="TransactionsTitle">My Transactions</h1>
        <div className = "TransactionsPageContainer">
            <TransactionComponentContainer />
        </div>
        <div>
            <Comments/>
        </div>
        </>
    )
}

export default TransactionsPage;
