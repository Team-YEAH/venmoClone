import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeComment, obtainComments, deleteComment } from '../../store/comments'
import './Comment.css'

const Comments = () => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')
    let { id } = useParams()
    const comments = useSelector(state => (state.comments));

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    const delComment = async (e, comment) => {
        e.preventDefault();
        console.log("im deleting jimmy off", comment)
        id = comment.id
        await dispatch(deleteComment({comment, id}))
    }

    const onSubmitComment = async (e) => {
        e.preventDefault()
        const sendComment = await dispatch(makeComment({comment, id }))
    }

    useEffect(() => {
        dispatch(obtainComments(id))
        console.log('After comments renders')
    }, [dispatch])

    return (
        <>
            <form className='commentForm' onSubmit={onSubmitComment}>
                <div className='commentFormBox'>
                    <label className='commentFormName'></label>
                        <input className='commentFormInput'name='comment'
                                type='text'
                                placeholder='Write a comment...'
                                value={comment}
                                onChange={updateComment}
                        ></input>
                    <button className='submitCommentBtn'> Submit </button>
                </div>
            </form>
            <div className='comments'>
                {comments && comments?.map((comment)=>{
                    return <div className='individualComments' key={comment}>{comment.user}: {comment.comment} {} <button className='deleteCommentBtn' onClick={(e)=>delComment(e, comment)}> ❌ </button> </div>
                })}
            </div>
        </>
    )
}

export default Comments
