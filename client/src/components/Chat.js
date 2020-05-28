import React, { useState, useEffect, useContext, useRef } from 'react'
import { TextArea, Button, Container, Comment, Header, Icon, Image, Radio, Label, Menu, Tab } from 'semantic-ui-react'
import { Navbar, Modal } from 'react-bootstrap'
import Message from './Message'
import OnlineUsers from './OnlineUsers'
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
  const [modalShow, setModalShow] = useState(false)

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
    if(document.getElementById('chatBox')){
      const chatBox = document.getElementById('chatBox')
      chatBox.scrollTop = chatBox.scrollHeight
    }

  })

  const panes = [
  {
    menuItem: { key: 'users', icon: 'users', content: 'Users' },
    render: () => {
      return onlineUsers.map((user, index) => {
        if(user.socketId !== yourId){
          return (

              <Comment
                style={{marginLeft:"25px", marginTop:"20px"}}
                key={index}
                onClick={() => {
                  chooseContact(user)
                }} >
                <Comment.Avatar src={`https://react.semantic-ui.com/images/avatar/small/elliot.jpg`} />
                <Comment.Content>
                  <Comment.Author as='a'>{user.username}</Comment.Author>
                </Comment.Content>
              </Comment>

          )
        }

      })
    },
  },
  {
    menuItem: (
      <Menu.Item key='messages'>
        Messages<Label>{chatLog.length}</Label>
      </Menu.Item>
    ),
    render: () => {
      return(
        <Comment.Group id='chatBox' style={{marginTop: '10px ', overflow: 'auto', height: '300px', border:"3px solid #a7abaf", width:"100%", padding:"25px" }}>
          {
            chatLog.map((message, index) => {
              return (
                <Message key={index} message={message.body} author={message.username} sentAt={message.sentAt} />
              )
            })
          }
        </Comment.Group>
      )
       }
  },
]



  return (
    <div>
      <Navbar expand='lg'>
        <Container>
          <Header as='h1' style={{color: colorPallet.lightMarvel }}>
            <Icon name='fa-inbox' style={{ color: colorPallet.darkMarvel }} />
            <Header.Content>Safespace Chat</Header.Content>
          </Header>
        </Container>
      </Navbar>
      <Navbar expand='lg'>
        <Container>
          <Radio toggle onChange={() => goOnline(yourId)} label="Go Online"/>
        </Container>
      </Navbar>
      <Tab panes={panes} />
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
    </div>
  )
}

export default Chat
