import React from "react";
import './Footer.css'
import {FaLinkedin, FaGithub} from 'react-icons/fa'

function Footer(){
    return(
        <footer className="footerContainer">
            <div className="team-container">
                <a className="team-link" target="_blank" href="https://github.com/Team-YEAH/venmoClone">
                    Brought to you by Team-YEAH
                    <FaGithub className="footIcon"/>
                </a>
            </div>
            <div className="justin-container">
                <a className="justin" href="https://github.com/Sirpeter89" target="_blank">Justin Wong</a>
                <a className="justin" href="https://github.com/Sirpeter89" target="_blank">
                    <FaGithub className="footIcon"/>
                </a>
                <a href="https://www.linkedin.com/in/justin-wong-29a247217/" target="_blank">
                    <FaLinkedin className="footIcon"/>
                </a>
            </div>
            <div className="alex-container">
                <a className="alex" href="https://github.com/AlexBetita">Alex Betita</a>
                <a className="alex" href="https://github.com/AlexBetita">
                    <FaGithub className="footIcon"/>
                </a>
                <a href="https://www.linkedin.com/in/alex-betita/" target="_blank">
                    <FaLinkedin className="footIcon"/>
                </a>
            </div>
            <div className="eddy-container">
                <a className="eddy" href="https://github.com/Eddy220">Eddy Kim</a>
                <a className="eddy" href="https://github.com/Eddy220">
                    <FaGithub className="footIcon"/>
                </a>
                <a href="https://www.linkedin.com/in/edward-kim-a97538215/" target="_blank">
                    <FaLinkedin className="footIcon"/>
                </a>
            </div>
            <div className="jimmy-container">
                <a className="jimmy"href="https://github.com/lyjimmy1">Jimmy Ly</a>
                <a className="jimmy"href="https://github.com/lyjimmy1">
                    <FaGithub className="footIcon"/>
                </a>
                <a href="https://www.linkedin.com/in/jimmy-ly-22b925134/" target="_blank">
                    <FaLinkedin className="footIcon"/>
                </a>
            </div>
        </footer>
    )
}

export default Footer
