import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeComment, obtainComments, deleteComment } from '../../store/comments'

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
                    return <div key={comment}>Posted by:{comment.user}--{comment.comment} <button onClick={(e)=>delComment(e, comment)}> Delete Comment </button> </div>
                })}
            </div>
        </>
    )
}

export default Comments
