import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {makePayment} from "../../store/transaction"
import { setNewTransactionRecord } from "../../store/transactionHistory";
import {useHistory} from "react-router-dom"
import './TransactionForm.css'

const TransactionForm = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [transactionErrors, setTransactionErrors] = useState([])
    const [userName, setUserName] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const user = useSelector(state => state.session.user)

    const onSend = async (e) => {
        e.preventDefault();


        let request = props.request;
        const transactionHistoryData = await dispatch(setNewTransactionRecord(amount, request, user.id, userName, userName, amount, description))
        if (transactionHistoryData.errors) {
            setTransactionErrors(transactionHistoryData.errors);
            }

        if(!request){
            const data = await dispatch(makePayment(userName, amount, description));
            if (data.errors) {
                setErrors(data.errors);
                }
        }

        if(!transactionHistoryData.errors){
            history.push("/transactions")
            history.go(0)
        }
    }

    return (
        <div className='sendreqFormContainer'>
        <form className='sendreqForm' onSubmit={onSend} className="">
            <div>
            {errors.map((error) => (
                <div>{error}</div>
            ))}
            {transactionErrors.map((error) => (
                <div>{error}</div>
            ))}
            </div>
            <div>
            <label className='sendreqLabels'>User To Request/Send:</label>
            <input
                name="username"
                type="text"
                placeholder="Enter Username"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
            />
            </div>
            <div>
            <label className='sendreqLabels'>Amount:</label>
            <input
                name="amount"
                type="text"
                placeholder="00.00"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
            />
            </div>
            <div>
            <label className='sendreqLabels'>Description:</label>
            <textarea
                rows="5"
                cols="18"
                name="description"
                type="text"
                placeholder="Describe your transaction"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />
            <button className='sendreqBtn' type="submit">Send</button>
            </div>
        </form>
        </div>
    )
}

export default TransactionForm
