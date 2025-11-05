import http from 'http';
import app from './app.js';
import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Project from './models/project_model.js';
import { main } from './services/ai_service.js';

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

io.on('connection',async (socket)=>{
    console.log("Socket io is connected");
    socket.join(socket.Project._id.toString());

     socket.on('message',async(data)=>{
      console.log(data);

      const message = data.message;

      const aiIsPresent = message.includes('@ai')

      if(aiIsPresent){
        console.log("ai message");
        
        const prompt = message.replace('@ai','').trim();

        const result = await main(prompt);

        io.to(socket.Project._id.toString()).emit('message',{
          message: result,
          sender:{
            _id: 'ai-bot',
            email: 'AI Bot'
          }
        })
        return;
      }
      
      socket.broadcast.to(socket.Project._id.toString()).emit('message',data);
     })


     socket.on('disconnect',()=>{
      console.log('Socket disconnected');
      socket.leave(socket.Project._id.toString());
     })
})


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
