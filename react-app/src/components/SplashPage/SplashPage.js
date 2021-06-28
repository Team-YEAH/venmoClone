import './SplashPage.css';
import StackImg from './StackImg';
import React from "react";
import logo from '../img/Doughmo.png'

export default function SplashPage(){
    return(
        <div className="SplashContainer">
            <img className='logo' src={logo}></img>
            <StackImg text="Fast, Safe, Seemless, Easy to use interface" imgUrl="https://images.pexels.com/photos/928184/pexels-photo-928184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="left" header="Payments Made Easy"/>
            <StackImg text="Send Money To People You Know" imgUrl="https://images.pexels.com/photos/7149133/pexels-photo-7149133.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="right" header="Have Fun Paying Friends"/>
            <StackImg text="We Do The Remembering So You Don't Have To" imgUrl="https://images.pexels.com/photos/68562/pexels-photo-68562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="left" header="Easily Keep Track of Your Payments"/>
            <StackImg text="It's Okay, We Have You Covered" imgUrl="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="right" header="Forget Your Wallet?"/>
        </div>
    )
}
