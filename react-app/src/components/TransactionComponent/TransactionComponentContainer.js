import React from "react";
import TransactionComponent from "./TransactionComponent";
import { useSelector } from "react-redux";


export default function TransactionComponentContainer(){
    const transactionHistories = useSelector(state => Object.entries(state.transactionHistory.transactionsHistory).reverse());
    const user = useSelector(state => state.session.user)
    //[ [3:{}] , [2:{} ], [1:{} ] ]
    return(
        <div>
            {transactionHistories.map((entry)=>{
                return <TransactionComponent key={entry} entry={entry} user={user}/>
            })}
        </div>
    )
}
