import './SplashPage.css';
import StackImg from './StackImg';
import React from "react";
import logo from '../img/Doughmo.png'


// Fast, Safe, Seemless, Easy to use interface
export default function SplashPage(){
    return(
        <div className="SplashContainer">
            <img className='logo' src={logo}></img>
            <StackImg text="Drop the need to pay with cash and pay others in a single click! Our simple design allows users to seamlessly navigate through the interface with ease." imgUrl="https://images.pexels.com/photos/928184/pexels-photo-928184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="left" header="Payments Made Easy"/>
            <StackImg text="Pay. Get Paid. Or request money from users such as your friends, family, or anyone you know. As long as you have their username, you can send money to anybody!" imgUrl="https://images.pexels.com/photos/7149133/pexels-photo-7149133.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="right" header="Have Fun Paying Friends"/>
            <StackImg text="We do the remembering so you don't have to. Add messages to each transaction and view transaction logs for any payments between other friends. " imgUrl="https://images.pexels.com/photos/68562/pexels-photo-68562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="left" header="Easily Keep Track of Your Payments"/>
            <StackImg text="It's okay, we have you covered. Pay others from your Doughmo balance or directly from your bank! Directly pay your friends from your bank when your Doughmo balance is low." imgUrl="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" orient="right" header="Forget Your Wallet?"/>
        </div>
    )
}
