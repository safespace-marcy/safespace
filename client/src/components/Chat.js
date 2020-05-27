import React, { useState, useEffect, useContext, useRef } from 'react'
import { TextArea, Button, Container, Comment, Header, Icon, Image } from 'semantic-ui-react'
import { Navbar } from 'react-bootstrap'
import Message from './Message.js'
import { colorPallet } from './Theme'
import { UserContext } from '../contexts/userContext'
import io from 'socket.io-client'

const Chat = () => {
  const { user } = useContext(UserContext)
  const [message, setMessage] = useState('')
  const [yourId, setYourId] = useState()
  const [chatLog, setChatLog] = useState([])
  const [contact, setContact] = useState({})
  const [onlineUsers, setOnlineUsers] = useState([])

  const socketRef = useRef()

  // Upon recieving messages, this functions updates its chatlog with the most recent chats
  const receivedMessage = (message) => {
    setChatLog((oldMsgs) => [...oldMsgs, message])
  }

  // Gets the current time in MM/DD/YYYY HH:MM AM/PM format
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

  // Send a message package to the server to be sent to a specified recipient
  const sendMessage = () => {
    const messageObject = {
      body: message,
      id: yourId,
      username: user.username,
      seed: user.seed,
      sprite: user.sprite,
      sentAt: getTime(),
      socketId: contact.socketId
    }
    socketRef.current.emit('send message', messageObject)
  }
   // Sets the message state as the input is populated
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  // Set contact to be the user that is clicked
  const chooseContact = (peer) => {
    setContact(peer)
  }

  // Signals to the server that the user is online and passes information about its identity
  const goOnline = (id) => {
    const userRef = {
      socketId: id,
      userId: user.id,
      username: user.username,
      seed: user.seed,
      sprite: user.sprite
    }
    socketRef.current.emit('online', userRef)
  }

  // This listens for socket.io events and executes callbacks in response
  useEffect(() => {
    socketRef.current = io.connect('/')
    socketRef.current.on('your id', (id) => setYourId(id))
    socketRef.current.on('message', (message) => receivedMessage(message))
    socketRef.current.on('update', (users) => setOnlineUsers(users))
  }, [])

  // This ensures that the chat always shows the most recent message
  useEffect(() => {
    const chatBox = document.getElementById('chatBox')
    chatBox.scrollTop = chatBox.scrollHeight
  })

  return (
    <div>
      <div style={{display:"flex", justifyContent:"center", flexDirection:"column", marginLeft:"10%"}}>
        <div>{
            onlineUsers.map((user, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    chooseContact(user)
                  }} content={user.username}
                />
              )
            })
          }</div>
        <Header as='h1' style={{ color: colorPallet.lightMarvel , marginTop:"30px"}}>
          <Icon name='fa-inbox' style={{ color: colorPallet.darkMarvel }} />
          <Header.Content>Safespace Chat</Header.Content>
        </Header>
        <Header as='h3' style={{  }}>
          <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />
          Person You're talking to
        </Header>
      <Button
        onClick={() => {
          goOnline(yourId)
        }} content='Contacts' style={{ width: '88.5%' }}
      />
    </div>
    <Container fluid style={{display:"flex", justifyContent:"center"}}>
        <Comment.Group id='chatBox' style={{marginTop: '10px ', overflow: 'auto', height: '500px', border:"3px solid #a7abaf", width:"87%", padding:"15px" }}>
          {
            chatLog.map((message, index) => {
              return (
                <Message key={index} message={message.body} author={message.username} sentAt={message.sentAt} />
              )
            })
          }
        </Comment.Group>
        <Navbar fixed='bottom' expand='lg' style={{ backgroundColor: colorPallet.darkMarvel, display:"flex", justifyContent:"center" }}>
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
