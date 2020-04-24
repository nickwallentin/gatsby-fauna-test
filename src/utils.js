import { gql } from "@apollo/client"

export const GET_MESSAGES = gql`
  query GetMessages {
    allMessages {
      data {
        _id
        message
        created
        author {
          name
        }
      }
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation($message: String!, $created: String!) {
    createMessage(
      data: {
        message: $message
        created: $created
        author: { connect: "263539513033228811" }
      }
    ) {
      _id
      message
      created
      author {
        name
      }
    }
  }
`

export const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id) {
      _id
    }
  }
`
