import React, { useState } from 'react'

import { Button, Icon, Confirm } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../util/graphql'

function DeleteButton ({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update (proxy) {
      setConfirmOpen(false)
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter(p => p.id !== postId)
        }
      })
      if (callback) callback()  // callback function from SinglePost to redirect to home
    },
    variables: {
      postId
    }
  })

  return (
    <>
      <Button
        as='div'
        color='red'
        onClick={() => setConfirmOpen(true)}
        floated='right'
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default DeleteButton
