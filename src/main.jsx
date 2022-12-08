import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ChatPage from './routes/chatpage';
import LoginPage from './routes/login';


const router = createBrowserRouter([
  {
    path: "/",
      element: <LoginPage />,
  },
  {
    path: "/chatpage/:username",
      element: <ChatPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
      <RouterProvider router={router} />
  </ChakraProvider>
);
