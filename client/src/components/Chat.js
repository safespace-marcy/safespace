import React, { useState, useEffect, useContext, useRef } from 'react'
import { TextArea, Button, Container, Comment, Header, Icon, Image } from 'semantic-ui-react'
import { Navbar } from 'react-bootstrap'
import Message from './Message.js'
import { colorPallet } from './Theme'
import { UserContext } from '../contexts/userContext'
import io from 'socket.io-client'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [yourId, setYourId] = useState()
  const [chatLog, setChatLog] = useState([])
  const { user } = useContext(UserContext)

  const socketRef = useRef()

  const receivedMessage = (message) => {
    setChatLog((oldMsgs) => [...oldMsgs, message])
  }

  const getTime = () => {
    const now = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = months[now.getMonth()]
    const day = now.getDate()
    const year = now.getFullYear()
    const time = `${now.getHours()}:${now.getMinutes()}`
    const AM_PM = now.getHours() >= 12 ? 'PM' : 'AM'
    return `${month} ${day}, ${year} - ${time} ${AM_PM}`
  }

  const sendMessage = () => {
    const messageObject = {
      body: message,
      id: yourId,
      username: user.username,
      seed: user.seed,
      sprite: user.sprite,
      sentAt: getTime()
    }
    socketRef.current.emit('send message', messageObject)
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    socketRef.current = io.connect('/')

    socketRef.current.on('your id', (id) => {
      setYourId(id)
    })

    socketRef.current.on('message', (message) => {
      receivedMessage(message)
    })
  }, [])

  useEffect(() => {
    const chatBox = document.getElementById('chatBox')
    chatBox.scrollTop = chatBox.scrollHeight
  })

  return (
    <div>
      <Header as='h1' style={{ color: colorPallet.lightMarvel, marginLeft: '10%', marginTop: '30px' }}>
        <Icon name='fa-inbox' style={{ color: colorPallet.darkMarvel }} />
        <Header.Content>Safespace Chat</Header.Content>
      </Header>
      <Header as='h3' style={{ marginLeft: '10%' }}>
        <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
        Placeholder for user
      </Header>
      <Button
        onClick={() => {
          console.log('Will launch modal with online users to choose from')
        }} content='Contacts' style={{ marginLeft: '10%' }}
      />
      <Container fluid>
        <Comment.Group id='chatBox' style={{ margin: '0 auto', marginTop: '10%', overflow: 'auto', height: '500px' }}>
          {
            chatLog.map((message, index) => {
              return (
                <Message key={index} message={message.body} author={message.username} sentAt={message.sentAt} />
              )
            })
          }
        </Comment.Group>
        <Navbar fixed='bottom' expand='lg' style={{ backgroundColor: colorPallet.darkMarvel }}>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <TextArea value={message} onChange={handleChange} style={{ width: '100%', height: '40px', fontSize: '22px' }} />
              <Button
                onClick={() => {
                  sendMessage()
                  setMessage('')
                }} content='Send'
              />
            </div>
          </Container>
        </Navbar>

      </Container>
    </div>
  )
}

export default Chat
