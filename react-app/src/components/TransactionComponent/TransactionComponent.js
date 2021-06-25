import React from "react";
import './TransactionComponent.css'
import { useEffect, useState } from "react";



export default function TransactionComponent(props){

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

    let senderReceiver;
    let cost;
    // if current user is the sender
    if (props.entry[1].sender === props.user.id){
        senderReceiver =
        <div className="Sender_Receiver">
            You paid &nbsp;<b>{props.entry[1].requester_username}</b>
        </div>
        cost =
        <div className="CostLoss">
            -${props.entry[1].cost}
        </div>
    } else { //current user is receiver
        senderReceiver =
        <div className="Sender_Receiver">
            <b>{props.entry[1].sender_username}</b>&nbsp; paid you
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
            {/* <div>
                <Comments/>
            </div> */}
        </div>
    )
}
