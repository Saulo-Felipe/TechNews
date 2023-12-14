import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class SocketGateway {
  @WebSocketServer() public io: Server;

  @SubscribeMessage("hello")
  handleMessage() {
    console.log("Recebi OK");
  }
}
