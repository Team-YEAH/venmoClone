import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import './IndividualTransactionPageComponent.css';


export default function IndividualTransactionPageComponent(){
    const [transaction, setTransaction] = useState("")
    const user = useSelector(state => state.session.user)
    const {id} = useParams();
    useEffect( async()=>{
        const res = await fetch(`/api/transaction/get-transaction/${id}`)
        const data = await res.json()
        setTransaction(data)
    }, [])
    const dayOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const dateTime = new Date(transaction.created_at)
    let pmAm = 'PM';
    if(dateTime.getHours() < 12){
        pmAm = 'AM';
    }
    const hour = dateTime.getHours() % 12 || 12;
    let minute = dateTime.getMinutes();
    if(minute < 10){
        minute = `0${minute}`;
    }
    const day = dayOfWeek[dateTime.getDay()];
    const date = dateTime.getDate();
    const month = monthNames[dateTime.getMonth()];
    const year = dateTime.getFullYear();

    let senderReceiver;
    let cost;
    // if current user is the sender
    if (transaction.sender === user.id){
        senderReceiver =
        <div className="Sender_Receiver_Big">
            You paid&nbsp;<b>{transaction.requester_username}</b>
        </div>
        cost =
        <div className="CostLoss_Big">
            -${transaction.cost}
        </div>
    } else { //current user is receiver
        senderReceiver =
        <div className="Sender_Receiver_Big">
            <b>{transaction.sender_username}</b>&nbsp;paid you
        </div>
        cost =
        <div className="CostGain_Big">
            +${transaction.cost}
        </div>
    }
    return(
            <div className="IndividualTransactionContainer">
                {senderReceiver}
                <div className="Description_Big">
                    {transaction.description}
                </div>
                {cost}
                <div className="date_Big">
                    {`${day}, ${month} ${date}, ${year} at ${hour}:${minute}${pmAm}`}
                </div>
            </div>
    )
}
