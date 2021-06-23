import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './PaymentDetailsPage.css'

const PaymentDetailsPage = () => {
    const user = useSelector(state => state.session.user)

    return (
        // map through payment details here
        <>
            <NavLink to='/paymentmethods'> Payment Methods </NavLink>
        </>
    )
}

export default PaymentDetailsPage
