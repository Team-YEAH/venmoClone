import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeComment, obtainComments } from '../../store/comments'

const Comments = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')
    // const [errors, setErrors] = useState([])
    const { id } = useParams()
    const comments = useSelector(state => (state.comments));
    const updateComment = (e) => {
        setComment(e.target.value)
    }

    const onSubmitComment = async (e) => {
        e.preventDefault()
        const sendComment = await dispatch(makeComment({comment, id }))
        // setComment()
    }
    useEffect(() => {
        dispatch(obtainComments(id))
        console.log('After comments renders')
    }, [dispatch])

    console.log("THESE ARE THE COMENTS ASFJKASHFJKAFH", comments)

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
            <div>
                {comments && comments?.map((comment)=>{
                    return <div>Posted by:{comment.user}--{comment.comment}</div>
                })}
            </div>
        </>
    )
}

export default Comments
