import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {makePayment} from "../../store/transaction"
import { setNewTransactionRecord } from "../../store/transactionHistory";

const TransactionForm = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [transactionErrors, setTransactionErrors] = useState([])
    const [userName, setUserName] = useState("");
    const [amount, setAmount] = useState("");
    const user = useSelector(state => state.session.user)

    const onSend = async (e) => {
        e.preventDefault();


        let request = false;
        const transactionHistoryData = await dispatch(setNewTransactionRecord(amount, request, user.id, userName, userName, amount))
        if (transactionHistoryData.errors) {
            setTransactionErrors(transactionHistoryData.errors);
            }


        const data = await dispatch(makePayment(userName, amount));
        if (data.errors) {
            setErrors(data.errors);
            }
    }

    return (
        <form onSubmit={onSend} className="">
            <div>
            {/* {errors.map((error) => (
                <div>{error}</div>
            ))} */}
            {transactionErrors.map((error) => (
                <div>{error}</div>
            ))}
            </div>
            <div>
            <label>User To Send Money:</label>
            <input
                name="username"
                type="text"
                placeholder="Enter Username"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
            />
            </div>
            <div>
            <label>Amount:</label>
            <input
                name="amount"
                type="text"
                placeholder="00.00"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
            />
            <button type="submit">Send</button>
            </div>
        </form>
    )
}

export default TransactionForm
