import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeComment } from '../../store/comments'

const Comments = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')
    // const [errors, setErrors] = useState([])
    const { id } = useParams()

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    const onSubmitComment = async (e) => {
        console.log('hello')
        e.preventDefault()
        console.log(id)
        const sendComment = await dispatch(makeComment({comment, id }))
        // if (sendComment.errors) {
        //     setErrors(sendComment.error)
        // }
    }

    return (
        <>
            <form onSubmit={onSubmitComment}>
                <div>
                    <label> Make a comment </label>
                        <input name='comment'
                                type='text'
                                placeholder='Write a comment...'
                                value={comment}
                                onChange={updateComment}
                        ></input>
                    <button> Submit </button>
                </div>
            </form>
        </>
    )
}

export default Comments
