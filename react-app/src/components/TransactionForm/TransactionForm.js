import React, { useEffect, useState } from "react";
import {useDispatch} from "react-redux"
import {makePayment} from "../../store/transaction"

const TransactionForm = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [userName, setUserName] = useState("");
    const [amount, setAmount] = useState("");

    const onSend = async (e) => {
        e.preventDefault();

        const data = await dispatch(makePayment(userName, amount));
        if (data.errors) {
            setErrors(data.errors);
          }
    }

    return (
        <form onSubmit={onSend} className="">
            <div>
            {errors.map((error) => (
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
