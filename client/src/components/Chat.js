import React, { useState, useEffect, useContext, useRef } from "react";
import {
  TextArea,
  Button,
  Container,
  Comment,
  Header,
  Icon,
  Image,
  Radio,
  Label,
  Menu,
  Tab,
} from "semantic-ui-react";
import {
  Navbar,
  Modal,
  Overlay,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Message from "./Message";
import { colorPallet } from "./Theme";
import { UserContext } from "../contexts/userContext";
import io from "socket.io-client";

const Chat = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [yourId, setYourId] = useState();
  const [chatLog, setChatLog] = useState([]);
  const [contact, setContact] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [newMessage, setNewMessage] = useState(0);

  const socketRef = useRef();

  // Upon recieving messages, this functions updates its chatlog with the most recent chats
  const receivedMessage = (message) => {
    setChatLog((oldMsgs) => [...oldMsgs, message]);
    setNewMessage((msgCount) => msgCount + 1);
  };

  // Gets the current time in MM/DD/YYYY HH:MM AM/PM format
  const getTime = () => {
    const now = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const time = `${now.getHours()}:${now.getMinutes()}`;
    const AM_PM = now.getHours() >= 12 ? "PM" : "AM";
    return `${month} ${day}, ${year} - ${time} ${AM_PM}`;
  };

  // Send a message package to the server to be sent to a specified recipient
  const sendMessage = () => {
    const messageObject = {
      body: message,
      id: yourId,
      username: user.username,
      seed: user.seed,
      sprite: user.sprite,
      sentAt: getTime(),
      socketId: contact.socketId,
    };
    socketRef.current.emit("send message", messageObject);
  };
  // Sets the message state as the input is populated
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Set contact to be the user that is clicked
  const chooseContact = (peer) => {
    setContact(peer);
  };

  // Signals to the server that the user is online and passes information about its identity
  const goOnline = (id) => {
    const userRef = {
      socketId: id,
      userId: user.id,
      username: user.username,
      seed: user.seed,
      sprite: user.sprite,
    };
    socketRef.current.emit("online", userRef);
    setIsOnline(true);
  };

  // Signals to the server that the user is offline
  const goOffline = () => {
    socketRef.current.emit("go offline");
    setIsOnline(false);
  };

  // This listens for socket.io events and executes callbacks in response
  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.on("your id", (id) => setYourId(id));
    socketRef.current.on("message", (message) => receivedMessage(message));
    socketRef.current.on("update", (users) => setOnlineUsers(users));
  }, []);

  // This ensures that the chat always shows the most recent message
  useEffect(() => {
    if (document.getElementById("chatBox")) {
      const chatBox = document.getElementById("chatBox");
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });

  const panes = [
    {
      menuItem: { key: "users", icon: "users", content: "Online Users" },
      render: () => {
        return onlineUsers.map((user, index) => {
          if (user.socketId !== yourId) {
            return (
              <Comment
                style={{ marginLeft: "25px", marginTop: "20px" }}
                key={index}
                onClick={() => {
                  chooseContact(user);
                }}
              >
                <Comment.Avatar
                  style={{ width: "50px", height: "55px" }}
                  src={`https://avatars.dicebear.com/api/${user.sprite}/${user.seed}.svg`}
                />
                <Comment.Content>
                  <Comment.Author as="a">{user.username}</Comment.Author>
                </Comment.Content>
              </Comment>
            );
          }
        });
      },
    },
    {
      menuItem: (
        <Menu.Item onClick={() => setNewMessage(0)} key="messages">
          Messages<Label>{newMessage}</Label>
        </Menu.Item>
      ),
      render: () => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Comment.Group
              size="large"
              id="chatBox"
              style={{
                marginTop: "25px",
                overflow: "auto",
                height: "400px",
                border: "3px solid #a7abaf",
                width: "100%",
                padding: "25px",
              }}
            >
              {chatLog.map((message, index) => {
                if (message.socketId === yourId) {
                  return (
                    <Message
                      key={index}
                      isPrivate={true}
                      message={message.body}
                      author={message.username}
                      sentAt={message.sentAt}
                      sprite={message.sprite}
                      seed={message.seed}
                      yourId={yourId}
                      contact={contact}
                    />
                  );
                }
                return (
                  <Message
                    key={index}
                    isPrivate={false}
                    message={message.body}
                    author={message.username}
                    sentAt={message.sentAt}
                    sprite={message.sprite}
                    seed={message.seed}
                    yourId={yourId}
                    contact={contact}
                  />
                );
              })}
            </Comment.Group>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Header as="h1" style={{ color: colorPallet.lightMarvel }}>
            <Icon name="fa-inbox" style={{ color: colorPallet.darkMarvel }} />
            <Header.Content>Safespace Chat</Header.Content>
          </Header>
        </Container>
      </Navbar>
      <Navbar expand="lg">
        <Container>
          <OverlayTrigger
            key="overlay"
            placement="right"
            overlay={
              <Tooltip id={`tooltip-right`}>
                Anyone can private message you when online.
              </Tooltip>
            }
          >
            <Radio
              toggle
              onChange={() => {
                isOnline ? goOffline() : goOnline(yourId);
              }}
              label={isOnline ? "Online" : "Offline"}
            />
          </OverlayTrigger>{" "}
          <div>
            {contact.socketId && (
              <Button
                onClick={() => {
                  setContact({});
                }}
                content="Leave private"
              />
            )}
            {contact.socketId && (
              <Comment
                style={{ marginLeft: "25px", marginTop: "10px" }}
                key="contact"
              >
                <Comment.Avatar
                  style={{ width: "50px", height: "55px" }}
                  src={`https://avatars.dicebear.com/api/${contact.sprite}/${contact.seed}.svg`}
                />
                <Comment.Content>
                  Private Messaging:
                  <Comment.Author as="a">{` ${contact.username}`}</Comment.Author>
                </Comment.Content>
              </Comment>
            )}
          </div>
        </Container>
      </Navbar>
      <Tab panes={panes} />
      <Navbar
        fixed="bottom"
        expand="lg"
        style={{
          backgroundColor: colorPallet.darkMarvel,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <TextArea
              value={message}
              onChange={handleChange}
              style={{ width: "100%", height: "40px", fontSize: "22px" }}
            />
            <Button
              onClick={() => {
                sendMessage();
                setMessage("");
              }}
              content="Send"
            />
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Chat;
