import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// import { addPayment } from '../../store/session'

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state)  => state.session.user)
    const [debit_card, setDebitCard] = useState(user?.debit_card)
    const [bank_number, setBankNumber] = useState(user?.bank_number)
    const [bank, setBank] = useState(user?.bank)
    const [billing_address, setBillingAddress] = useState(user?.billing_address)

    const onPaymentSubmit = async (e) => {
        e.preventDefault();
        const id = user.id
        const payload = { id, debit_card, bank_number, bank, billing_address}
        // const paymentmethod = await dispatch(addPayment(payload))

        history.push('/paymentdetails')

    }

    const updateDebitCard = (e) => {
        setDebitCard(e.target.value)
    }

    const updateBankNumber = (e) => {
        setBankNumber(e.target.value)
    }

    const updateBank = (e) => {
        setBank(e.target.value)
    }

    const updateBillingAddress = (e) => {
        setBillingAddress(e.target.value)
    }

    return (
        <>
            <form onSubmit={onPaymentSubmit}>
                <div>
                    <label>Debit Card</label>
                    <input
                    type='text'
                    name='debit_card'
                    onChange={updateDebitCard}
                    value={debit_card}
                    ></input>
                </div>
                <div>
                    <label>Bank Number</label>
                    <input
                    type='text'
                    name='bank_number'
                    onChange={updateBankNumber}
                    value={bank_number}
                    ></input>
                </div>
                <div>
                    <label>Bank</label>
                    <input
                    type='text'
                    name='bank'
                    onChange={updateBank}
                    value={bank}
                    ></input>
                </div>
                <div>
                    <label>Billing Address</label>
                    <input
                    type='text'
                    name='billing_address'
                    onChange={updateBillingAddress}
                    value={billing_address}
                    ></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default PaymentMethod
