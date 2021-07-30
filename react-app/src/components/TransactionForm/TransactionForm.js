import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {makePayment} from "../../store/transaction"
import { setNewTransactionRecord } from "../../store/transactionHistory";
import {useHistory} from "react-router-dom"
import './TransactionForm.css'

const TransactionForm = (props) => {
    const request = props.request;

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
        <>
            {request &&
                <>
                <div className='titleText'>
                    REQUEST MONEY
                </div>
                {/* <div className='sendreqFormContainer'> */}
                    <form className='sendreqForm' onSubmit={onSend} >
                        <div>
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                        {transactionErrors.map((error) => (
                            <div>{error}</div>
                        ))}
                        </div>

                        <div className="top-card">
                            <div className='amountReqContainer'>
                                <label className='sendreqLabels'>Amount:</label>
                                <div className="input-cont">
                                    <div className="dollar">
                                        $
                                    </div>
                                    <input
                                        className='amountInput'
                                        name="amount"
                                        type="number"
                                        placeholder="00.00"
                                        value={amount}
                                        step='.01'
                                        onChange={(e)=>setAmount(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='userReqContainer'>
                                <label className='sendreqLabels'>User To Send:</label>
                                <input
                                    className='usernameInput'
                                    name="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    value={userName}
                                    onChange={(e)=>setUserName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="middle-card">
                            <div className='transactionContainer'>
                                <label className='sendreqLabelsDesc'>Description:</label>
                                <textarea
                                    className='textAreaInput'
                                    rows="5"
                                    cols="18"
                                    name="description"
                                    type="text"
                                    placeholder="Describe your transaction"
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="button-cont">
                            <button className='sendreqBtn-request' type="submit">Request</button>
                        </div>

                    </form>
                {/* </div> */}
            </>
            }

            {!request &&
                <>
                    <div className='titleText'>
                        SEND MONEY
                    </div>
                    {/* <div className='sendreqFormContainer'> */}
                        <form className='sendreqForm' onSubmit={onSend} >
                            <div>
                            {errors.map((error) => (
                                <div>{error}</div>
                            ))}
                            {transactionErrors.map((error) => (
                                <div>{error}</div>
                            ))}
                            </div>

                            <div className="top-card">
                                <div className='amountReqContainer'>
                                    <label className='sendreqLabels'>Amount:</label>
                                    <div className="input-cont">
                                        <div className="dollar">
                                            $
                                        </div>
                                        <input
                                            className='amountInput'
                                            name="amount"
                                            type="number"
                                            placeholder="00.00"
                                            value={amount}
                                            step='.01'
                                            onChange={(e)=>setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='userReqContainer'>
                                    <label className='sendreqLabels'>User To Send:</label>
                                    <input
                                        className='usernameInput'
                                        name="username"
                                        type="text"
                                        placeholder="Enter Username"
                                        value={userName}
                                        onChange={(e)=>setUserName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="middle-card">
                                <div className='transactionContainer'>
                                    <label className='sendreqLabelsDesc'>Description:</label>
                                    <textarea
                                        className='textAreaInput'
                                        rows="5"
                                        cols="18"
                                        name="description"
                                        type="text"
                                        placeholder="Describe your transaction"
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="button-cont">
                                <button className='sendreqBtn' type="submit">Send</button>
                            </div>

                        </form>
                    {/* </div> */}
                </>
            }
        </>
    )
}

export default TransactionForm
