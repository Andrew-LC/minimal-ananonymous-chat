import { Container, Box, Text, Input, Button, Heading } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import randomColor from "randomcolor";
import io from "socket.io-client";

// Generate a random color for the other users
const color = randomColor({
  luminosity: "dark",
});

export default function App() {
  let { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [users, setUsers] = useState([]);
  const socket = io("http://localhost:3001");

  useEffect(() => {
    // Listen to new messages
    socket.on("messages", async (data) => {
      setMessages([...messages, await data]);
    });
    socket.on("newuser", (user) => {
      setMessages([...messages, user]);
      setUsers([...users, user]);
      console.log(users);
    });
    console.log(messages);
  }, [messages]);

  const handleSendMessage = () => {
    const input = document.getElementById("input");
    socket.emit("message", {
      user: username,
      message: currentMessage,
      id: socket.id,
    });
    input.value = "";
    setCurrentMessage("");
  };

  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleAllUsers = () => {};

  return (
    <Container
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box height="100%" display="flex" flexDirection="column">
        <Box
          width="100%"
          height="90vh"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          gap="1rem"
          padding=".5rem"
        >
          {messages.map((message) => {
            return typeof message == "string" ? (
              <DisplayNewUser username={message} key={message.id} />
            ) : (
              <ChatBox
                message={message}
                user={message.user}
                username={username}
                key={message.id}
              />
            );
          })}
        </Box>
        <Box width="100%" height="10%" display="flex" gap=".5rem">
          <Input
            id="input"
            placeholder="Type a message"
            onChange={handleChange}
          />
          <Button border="1px solid red">
            <Box
              as="div"
              backgroundColor="red"
              borderRadius="100%"
              padding=".5rem"
            ></Box>
          </Button>
          <Button onClick={handleSendMessage}>Send</Button>
        </Box>
      </Box>
    </Container>
  );
}

const ChatBox = ({ message, user, username }) => {
  return user == username ? (
    <Box
      alignSelf="flex-end"
      background="#0783ff"
      padding="1rem"
      width="60%"
      borderRadius="10px"
    >
      <Text as="span" color="#e5e5ea" fontWeight="bold">
        |{message.user}
      </Text>
      <Text as="p" color="white">
        {message.message}
      </Text>
    </Box>
  ) : (
    <Box
      key={message.id}
      background="#e5e5ea"
      padding="1rem"
      width="60%"
      borderRadius="10px"
    >
      <Text as="span" color={color} fontWeight="bold">
        |{message.user}
      </Text>
      <Text as="p">{message.message}</Text>
    </Box>
  );
};

const DisplayNewUser = ({ username }) => {
  return (
    <Text
      as="p"
      width="100%"
      color="black"
      fontWeight="bold"
      textAlign="center"
    >
      {username} has joined the conversation 🎉
    </Text>
  );
};
