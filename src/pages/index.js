import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_MESSAGE, GET_MESSAGES } from "../utils"

import store from "store"
import expirePlugin from "store/plugins/expire"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Messages from "../components/messages"

store.addPlugin(expirePlugin)

const IndexPage = () => {
  const [message, setMessage] = useState("")
  const [addMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    update(cache, { data }) {
      const { allMessages } = cache.readQuery({ query: GET_MESSAGES })
      cache.writeQuery({
        query: GET_MESSAGES,
        data: {
          allMessages: {
            ...allMessages,
            data: [...allMessages.data, data.createMessage],
          },
        },
      })
    },
  })

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <form
        onSubmit={e => {
          e.preventDefault()
          addMessage({
            variables: { message: message, created: new Date().toISOString() },
          })
          console.log("Submit")
          setMessage("")
        }}
      >
        <input
          onChange={e => setMessage(e.target.value)}
          type="text"
          placeholder="message"
          value={message}
        />

        <button type="submit"></button>
      </form>
      <Messages />

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
