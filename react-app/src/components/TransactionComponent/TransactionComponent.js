import React from "react";
import './TransactionComponent.css'
import { useEffect, useState } from "react";
import { updateTransactionRecord, deleteTransactionRecord } from "../../store/transactionHistory";
import {useDispatch, useSelector} from "react-redux"
import {updateBalance} from "../../store/transaction"



export default function TransactionComponent(props){

    const dispatch = useDispatch();

    const approveTransaction = async () => {
        await dispatch(updateTransactionRecord(props.entry[0]))
        await dispatch(updateBalance(props.entry[1].requester_username, props.entry[1].cost))
    }

    const denyTransaction = async () => {
        await dispatch(deleteTransactionRecord(props.entry[0]))
    }

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

    let transComp;

    // if current user is the sender
    if (props.entry[1].sender === props.user.id){
        if(!props.request){
            transComp=
            <div className="TransactionComp">
                <div className="Sender_Receiver">
                    You paid &nbsp;<b>{props.entry[1].requester_username}</b>
                </div>
                <div className="Description">
                    {props.entry[1].description}
                </div>
                <div className="CostLoss">
                    -${props.entry[1].cost}
                </div>
                <div className="date">
                    {`${day}, ${month} ${date}, ${year} at ${hour}:${minute}${pmAm}`}
                </div>
                {/* <div>
                    <Comments/>
                </div> */}
            </div>
        } else {
            transComp=
            <div className="TransactionComp">
                <div className="Sender_Receiver">
                    You requested &nbsp;<b>{props.entry[1].requester_username}</b>&nbsp;for&nbsp;<b>${props.entry[1].cost}</b>
                </div>
                <div className="Description">
                    {props.entry[1].description}
                </div>
                <div className="date">
                    {`${day}, ${month} ${date}, ${year} at ${hour}:${minute}${pmAm}`}
                </div>
                {/* <div>
                    <Comments/>
                </div> */}
            </div>
        }
    } else { //current user is receiver
        if(!props.request){
            transComp=
            <div className="TransactionComp">
                <div className="Sender_Receiver">
                    <b>{props.entry[1].sender_username}</b>&nbsp; paid you
                </div>
                <div className="Description">
                    {props.entry[1].description}
                </div>
                <div className="CostGain">
                    +${props.entry[1].cost}
                </div>
                <div className="date">
                    {`${day}, ${month} ${date}, ${year} at ${hour}:${minute}${pmAm}`}
                </div>
                {/* <div>
                    <Comments/>
                </div> */}
            </div>
        } else {
            transComp=
            <div className="TransactionCompRequest">
                <div className="Sender_Receiver">
                    <b>{props.entry[1].sender_username}</b>&nbsp; requested you&nbsp;for&nbsp;<b>${props.entry[1].cost}</b>
                </div>
                <div className="Description">
                    {props.entry[1].description}
                </div>
                <div className="date">
                    {`${day}, ${month} ${date}, ${year} at ${hour}:${minute}${pmAm}`}
                </div>
                <div className="RequestButtons">
                    <button onClick={approveTransaction}>
                        Approve
                    </button>
                    <button onClick={denyTransaction}>
                        Deny
                    </button>
                </div>
                {/* <div>
                    <Comments/>
                </div> */}
            </div>
        }
    }


    return(
        <>
            {transComp}
        </>
    )
}
