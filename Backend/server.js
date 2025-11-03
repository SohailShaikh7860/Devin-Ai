import http from 'http';
import app from './app.js';
import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Project from './models/project_model.js';

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: '*'
  }
});

io.use(async(socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.split(' ')[1];

    const projectId = socket.handshake.query.projectId;

    if(!mongoose.Types.ObjectId.isValid(projectId)){
      return next(new Error('Invalid Project ID format'));
    }

    socket.Project = await Project.findById(projectId);
    if (!token) {
      return next(new Error('Authentication error: Token not provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return next(new Error('Authentication error: Invalid token'));
    }

    socket.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
})

io.on('connection',(socket)=>{
    console.log("Socket io is connected");
    socket.join(socket.Project._id.toString());

     socket.on('message',data=>{
      console.log(data);
      
      socket.broadcast.to(socket.Project._id.toString()).emit('message',data);
     })
})


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
