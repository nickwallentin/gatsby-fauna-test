import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useQuery, useMutation } from "@apollo/client"
import { GET_MESSAGES, DELETE_MESSAGE } from "../utils"
import store from "store"
import expirePlugin from "store/plugins/expire"

const Messages = () => {
  const staticData = useStaticQuery(graphql`
    query getAllMessages {
      fauna {
        allMessages {
          data {
            message
            author {
              name
            }
          }
        }
      }
    }
  `)
  const [messages, setMessages] = useState(
    store.get("messages") ? store.get("messages") : null
  )

  const { loading, error, data } = useQuery(GET_MESSAGES)
  const [deleteMessage, { deleting, deleteError }] = useMutation(
    DELETE_MESSAGE,
    {
      update(cache, { data }) {
        console.log(data)
        const { allMessages } = cache.readQuery({ query: GET_MESSAGES })
        console.log(allMessages)
        const index = allMessages.data.findIndex(
          message => message._id === data.deleteMessage._id
        )
        const newMessageList = [...allMessages.data]
        newMessageList.splice(index, 1)

        cache.writeQuery({
          query: GET_MESSAGES,
          data: {
            allMessages: {
              ...allMessages,
              data: [...newMessageList],
            },
          },
        })
      },
    }
  )

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error</p>
  }

  return (
    <ul>
      {data &&
        data.allMessages.data.map(node => (
          <li
            onClick={() => deleteMessage({ variables: { id: node._id } })}
            key={node._id}
          >
            {node.message} - {node.author && node.author.name}
          </li>
        ))}
    </ul>
  )
}

export default Messages
