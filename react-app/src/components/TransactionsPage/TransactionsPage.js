import React, { useEffect } from "react"
import './TransactionsPage.css';
import { useSelector, useDispatch } from "react-redux"
import { getTransactionsRecords } from "../../store/transactionHistory";
import { getCurrentBalance } from "../../store/transaction";
import TransactionComponentContainer from "../TransactionComponent/TransactionComponentContainer";
import Comments from '../Comment/Comment';

const TransactionsPage = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    useEffect(async()=>{
        await dispatch(getTransactionsRecords())
        await dispatch(getCurrentBalance())
    }, [])
    let requestPage;
    if(!props.request){
        requestPage =
        <>
            <h1 className="TransactionsTitle">My Transactions</h1>
            <div className = "TransactionsPageContainer">
                <TransactionComponentContainer />
            </div>
        </>
    } else {
        requestPage =
        <>
            <h1 className="TransactionsTitle">My Requests</h1>
            <div className = "TransactionsPageContainer">
                <TransactionComponentContainer request={true}/>
            </div>
        </>
    }
    return (
        <>
            {requestPage}
        </>
    )
}

export default TransactionsPage;
