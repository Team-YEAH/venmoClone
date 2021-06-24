import React, { useState }  from 'react'
import { useDispatch } from 'react-redux'
import { removePaymentDetail } from "../../store/session"
import "./PaymentOption.css"

const PaymentOption = ({user, paymentdetails}) => {
    const dispatch = useDispatch()
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    const removePayment = async () => {
        let user_id = user
        let payment_detail_id = paymentdetails.id
        await dispatch(removePaymentDetail({user_id, payment_detail_id}))
        setDeleteTrigger(true)
    }

    return (
        <>
            {!deleteTrigger && <tbody className='div__payment__container'>
                <tr>
                    <td className='payment__td'>
                        {paymentdetails.debit_card}
                    </td>
                    <td className='payment__td'>
                        {paymentdetails.bank_number}
                    </td>
                    <td className='payment__td'>
                        {paymentdetails.bank}
                    </td>
                    <td className='payment__td'>
                        {paymentdetails.billing_address}
                    </td>
                    <button onClick={removePayment}>
                        Delete
                    </button>
                </tr>
            </tbody > }
        </>
    )
}

export default PaymentOption
