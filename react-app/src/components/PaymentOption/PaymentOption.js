import React from 'react'
import "./PaymentOption.css"

const PaymentOption = ({paymentdetails}) => {
    return (
        <>
            <tbody className='div__payment__container'>
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
                </tr>
            </tbody >
        </>
    )
}

export default PaymentOption
