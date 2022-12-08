import {
    Box,
    Input,
    Container,
    Button
} from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';


export default function LoginPage(){
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const socket = io("http://localhost:3001");

    const handleSubmit = () => {
      navigate(`/chatpage/${userName}`);
      socket.emit("username", userName);
    }

    const handleInputChange = (event) => {
      setUserName(event.target.value)
    }

    return(
        <Container display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Box>
            <Input onChange={handleInputChange} placeholder='Username'/>
            <Button onClick={handleSubmit}  type="submit">Join</Button>
          </Box>
        </Container> 
    );
}
