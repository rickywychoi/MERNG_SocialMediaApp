import React from 'react'
import { Card } from 'semantic-ui-react'
import moment from 'moment'

import DeleteButton from '../../components/DeleteButton'

function CommentCard ({ comment, user, postId }) {
  return (
    <Card fluid key={comment.id}>
      <Card.Content>
        {user && user.username === comment.username && (
          <DeleteButton postId={postId} commentId={comment.id} />
        )}
        <Card.Header>{comment.username}</Card.Header>
        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default CommentCard
