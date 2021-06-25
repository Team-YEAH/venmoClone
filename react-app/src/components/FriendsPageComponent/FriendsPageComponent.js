import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import { NavLink } from "react-router-dom"


export default function FriendsPageComponent(){
    return(
        <>
            <div className="addFriendsButton">
                <NavLink to="/addFriends">
                    <button>Add Friend</button>
                </NavLink>
            </div>
            <div>Friends List:</div>
            <div className="friendsListContainer">
            </div>
        </>
    )
}
