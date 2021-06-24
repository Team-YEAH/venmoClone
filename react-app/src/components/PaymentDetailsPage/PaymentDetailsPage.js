import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import './PaymentDetailsPage.css'
import PaymentOption from "../PaymentOption/PaymentOption"
import { getPaymentDetail } from "../../store/session"

const PaymentDetailsPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const paymentDetails = useSelector(state => state.session.paymentdetails)

    useEffect(() => {
        const id = user.id
        const d = async () => {
            await dispatch(getPaymentDetail({id}))
          }
          d()
    }, [dispatch])


    return (
        // map through payment details here
        <>
            {Object.keys(paymentDetails).map((key) => {
                return <PaymentOption key={key} paymentdetails={paymentDetails[key]}/>
            })}
            <NavLink to='/paymentmethods'> Payment Methods </NavLink>
        </>
    )
}

export default PaymentDetailsPage
