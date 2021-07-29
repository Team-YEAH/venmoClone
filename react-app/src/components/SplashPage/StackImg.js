import React from "react";
import  "./StackImg.css";

export default function StackImg(props){
    const orient = props.orient;
    let section;
    if (orient === "left"){
        section =
        <div className="StackContainer">
            <div className="class1">
                <img className="img" src={props.imgUrl}/>
            </div>

            <div className="class2">
                <h2 className="splashHeaders">{props.header}</h2>
                <p className="splashText">
                    {props.text}
                </p>
            </div>
        </div>
    } else {
        section =
        <div className="StackContainer">
            <div className="class1">
                <h2 className="splashHeaders">{props.header}</h2>
                <p className="splashText">
                    {props.text}
                </p>
            </div>

            <div className="class2">
                <img className="img" src={props.imgUrl}/>
            </div>
        </div>
    }
    return(
        <>
            {section}
        </>
    )
}
