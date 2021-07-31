import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addPaymentDetail } from '../../store/session'
import './PaymentMethodsPage.css'

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
        const paymentmethod = await dispatch(addPaymentDetail(payload))

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
            <div className='paymentMethodContainer'>
                PAYMENT METHOD
            </div>
            <div className='paymentMethodPageContainer'>
                <form className='paymentMethodBox'onSubmit={onPaymentSubmit}>
                    <div>
                        <label className='paymentMethodLabel'>Debit Card</label>
                        <input
                        className='paymentMethodInput'
                        type='text'
                        name='debit_card'
                        onChange={updateDebitCard}
                        value={debit_card}
                        ></input>
                    </div>
                    <div>
                        <label className='paymentMethodLabel'>Bank Number</label>
                        <input
                        className='paymentMethodInput'
                        type='text'
                        name='bank_number'
                        onChange={updateBankNumber}
                        value={bank_number}
                        ></input>
                    </div>
                    <div>
                        <label className='paymentMethodLabel'>Bank</label>
                        <input
                        className='paymentMethodInput'
                        type='text'
                        name='bank'
                        onChange={updateBank}
                        value={bank}
                        ></input>
                    </div>
                    <div>
                        <label className='paymentMethodLabel'>Billing Address</label>
                        <input
                        className='paymentMethodInput'
                        type='text'
                        name='billing_address'
                        onChange={updateBillingAddress}
                        value={billing_address}
                        ></input>
                    </div>
                    <button className='paymentMethodBtn'type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default PaymentMethod
