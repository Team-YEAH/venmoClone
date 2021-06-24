import React from "react";
import TransactionComponent from "./TransactionComponent";
import { useSelector } from "react-redux";
import './TransactionComponentContainer.css'
import { NavLink } from 'react-router-dom';


export default function TransactionComponentContainer(){
    const transactionHistories = useSelector(state => Object.entries(state.transactionHistory.transactionsHistory).reverse());
    const user = useSelector(state => state.session.user)
    //[ [3:{}] , [2:{} ], [1:{} ] ]
    return(
        <div className="TransactionComponentContainer">
            {transactionHistories.map((entry)=>{
                return <NavLink className="redirectToTransaction" to={`/transaction/${entry[0]}`} key={entry}>
                    <TransactionComponent entry={entry} user={user}/>
                </NavLink>
            })}
        </div>
    )
}
