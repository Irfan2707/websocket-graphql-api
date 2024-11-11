import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  // Handle new client connections and authenticate using JWT token
  async handleConnection(client: Socket) {
    // Retrieve token from query parameters
    const token = client.handshake.query.token as string;

    if (!token) {
      console.log('No token provided');
      client.disconnect();
      return;
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecretKey');
      console.log('Authenticated user:', decoded);
      
      client.join('authenticated');  
      console.log(`Client ${client.id} joined 'authenticated' room.`);
      
    } catch (err) {
      console.log('Unauthorized client connection attempt');
      client.disconnect();
    }
  }

  // Handle client disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Handle messages sent by authenticated clients
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    console.log('Message received:', message);

    // Broadcast to all connected clients except the sender
    client.broadcast.emit('message', message);
    console.log(`Message broadcasted to other clients, excluding ${client.id}`);
    
    
  }
}
