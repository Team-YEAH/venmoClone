import React from "react";
import './TransactionComponent.css'
import { useEffect, useState } from "react";


export default function TransactionComponent(props){
    const [receiverName, setReceiverName] = useState("")

    const dayOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const dateTime = new Date(props.entry[1].created_at)
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

    console.log(props.entry)
    useEffect( async()=> {
        const res = await fetch(`/api/users/${props.entry[1].receiver}`)
        const data = await res.json()
        setReceiverName(data.username)
    }, [])

    let senderReceiver;
    let cost;
    // if current user is the sender
    if (props.entry[1].sender === props.user.id){
        senderReceiver =
        <div className="Sender_Receiver">
            You paid &nbsp;<b>{receiverName}</b>
        </div>
        cost =
        <div className="CostLoss">
            -${props.entry[1].cost}
        </div>
    } else {
        senderReceiver =
        <div className="Sender_Receiver">
            <b>{receiverName}</b>&nbsp; paid you
        </div>
        cost =
        <div className="CostGain">
            +${props.entry[1].cost}
        </div>
    }
    return(
        <div className="TransactionComp">
            {senderReceiver}
            <div className="Description">
                {props.entry[1].description}
            </div>
            {cost}
            <div className="date">
                {`${day}, ${month} ${date}, ${year} at ${hour}:${minute}${pmAm}`}
            </div>
        </div>
    )
}
