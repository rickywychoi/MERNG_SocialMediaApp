import React, { useState, useRef } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Card, Form } from 'semantic-ui-react'

function CommentForm ({ postId }) {
  const [comment, setComment] = useState('')
  const commentInputRef = useRef(null)

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update () {
      setComment('')
      commentInputRef.current.blur() // remove focus after submitting comment
    },
    variables: {
      postId,
      body: comment
    }
  })

  return (
    <Card fluid>
      <Card.Content>
        <p>Post a comment</p>
        <Form>
          <div className='ui action input fluid'>
            <input
              type='text'
              placeholder='Comment...'
              name='comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
              ref={commentInputRef}
            />
            <button
              type='submit'
              className='ui button teal'
              disabled={comment.trim() === ''}
              onClick={submitComment}
            >
              Submit
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default CommentForm
