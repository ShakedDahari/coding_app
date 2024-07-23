import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [role, setRole] = useState(null);
    const [studentsCount, setStudentsCount] = useState(0);

    useEffect(() => {
        const socketInstance = io('https://coding-app-o6rb.onrender.com', {
            transports: ['websocket', 'polling']
        });

        socketInstance.on('connect', () => {
            console.log('Connected to the server:', socketInstance.id);
        });

        socketInstance.on('role', ({ role }) => {
            setRole(role);
        });

        socketInstance.on('studentsCount', (count) => {
            setStudentsCount(count);
        });

        socketInstance.on('mentorDisconnected', () => {
            alert('The mentor has left. You will be redirected to the lobby.');
            window.location.href = '/';
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, role, studentsCount }}>
            {children}
        </SocketContext.Provider>
    );
};
