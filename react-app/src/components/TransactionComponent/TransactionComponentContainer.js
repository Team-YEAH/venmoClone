import React from "react";
import TransactionComponent from "./TransactionComponent";
import { useSelector } from "react-redux";
import './TransactionComponentContainer.css'
import { NavLink } from 'react-router-dom';


export default function TransactionComponentContainer(props){
    let transactionHistories = useSelector(state => Object.entries(state.transactionHistory.transactionsHistory));

    const sortByDate = transactionHistories.sort((a,b)=>new Date(b[1].created_at) - new Date(a[1].created_at))

    //order by most recent date
    transactionHistories = sortByDate

    const user = useSelector(state => state.session.user)
    //[ [3:{created_at:3}] , [2:{created_at:2} ], [1:{} ] ]
    let showOnlyRequests;
    if (!props.request){
        showOnlyRequests =
        <div className="TransactionComponentContainer">
            {transactionHistories.map((entry)=>{
                return <NavLink className="redirectToTransaction" to={`/transaction/${entry[0]}`} key={entry}>
                    {!entry[1].request && <TransactionComponent entry={entry} user={user}/>}
                </NavLink>
            })}
        </div>
    } else {
        showOnlyRequests =
        <div className="TransactionComponentContainer">
            {transactionHistories.map((entry)=>{
                if (entry[1].request){
                    return <TransactionComponent entry={entry} user={user} request={true}/>
                }
            })}
        </div>
    }
    return(
        <>
            {showOnlyRequests}
        </>
    )
}
