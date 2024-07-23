require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5500;

const DB = require('../server/utils/DB');
const db = new DB();

const server = express();  
server.use(cors());
server.use(express.json());

server.use('/api/codeBlocks', require('./routes/codeBlocksRoute'));

server.get('/',function(req, res) {
    const ipAddress = req.header('x-forwarded-for') ||
                          req.socket.remoteAddress;
    res.send(ipAddress);
});

const ser = http.createServer(server);

const io = socketIo(ser);

// Track roles and connections
const codeBlockRoles = {}; // Format: { codeBlockId: { mentorSocketId: string, studentSocketIds: Set<string> } }

// Socket.io handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a code block
    socket.on('joinCodeBlock', (codeBlockId) => {
        if (!codeBlockRoles[codeBlockId] || !codeBlockRoles[codeBlockId].mentorSocketId) {
            codeBlockRoles[codeBlockId] = {
                mentorSocketId: socket.id,
                studentSocketIds: new Set(),
            };
            socket.emit('role', { role: 'mentor' });
        } else {
            codeBlockRoles[codeBlockId].studentSocketIds.add(socket.id);
            socket.emit('role', { role: 'student' });
        }

        io.to(codeBlockId).emit('studentsCount', codeBlockRoles[codeBlockId].studentSocketIds.size);
        socket.join(codeBlockId);
    });

    // Handle code changes
    socket.on('codeChange', (data) => {
        socket.to(data.codeBlockId).emit('codeUpdate', data.code);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        Object.keys(codeBlockRoles).forEach(codeBlockId => {
            if (codeBlockRoles[codeBlockId].mentorSocketId === socket.id) {
                codeBlockRoles[codeBlockId].studentSocketIds.forEach(studentSocketId => {
                    io.to(studentSocketId).emit('mentorDisconnected');
                });
                delete codeBlockRoles[codeBlockId];
            } else {
                codeBlockRoles[codeBlockId].studentSocketIds.delete(socket.id);
                io.to(codeBlockId).emit('studentsCount', codeBlockRoles[codeBlockId].studentSocketIds.size);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});