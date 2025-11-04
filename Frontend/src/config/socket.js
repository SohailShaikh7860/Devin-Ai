import socket from 'socket.io-client';

let socketInstance = null;
let currentProjectId = null;

export const initializeSocket = (projectId) => {
    // If socket already exists for the same project and is connected, return it
    if (socketInstance && socketInstance.connected && currentProjectId === projectId) {
        console.log('Reusing existing socket connection');
        return socketInstance;
    }

    // Disconnect existing socket if it exists
    if (socketInstance) {
        console.log('Disconnecting old socket');
        socketInstance.removeAllListeners();
        socketInstance.disconnect();
        socketInstance = null;
    }

    console.log('Creating new socket connection for project:', projectId);
    
    // Create new socket connection
    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
    });

    currentProjectId = projectId;

    socketInstance.on('connect', () => {
        console.log('Socket connected with ID:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
        console.log('Socket disconnected');
    });

    return socketInstance;
}

export const receiveMessage = (eventName, cb) => {
    if (socketInstance) {
        // Remove any existing listeners for this event before adding new one
        socketInstance.off(eventName);
        socketInstance.on(eventName, cb);
    }
}

export const sendMessage = (eventName, data) => {
    if (socketInstance && socketInstance.connected) {
        socketInstance.emit(eventName, data);
    } else {
        console.error('Socket not connected. Cannot send message.');
    }
}

export const disconnectSocket = () => {
    if (socketInstance) {
        console.log('Manually disconnecting socket');
        socketInstance.removeAllListeners();
        socketInstance.disconnect();
        socketInstance = null;
        currentProjectId = null;
    }
}