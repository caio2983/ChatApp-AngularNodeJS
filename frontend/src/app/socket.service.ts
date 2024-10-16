import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | undefined;

  constructor() { }

  connect() : void {
    this.socket = io('http://localhost:3000/')
  }

  sendMessage(message : string) : void {
    if(this.socket) {
      this.socket.emit('message',message)
    }
  } // mandar mensagens , emite evento ''message'' com conteúdo da mensagem 

  onMessage(): void {
    if (this.socket) {
      this.socket.on('message', (data: any) => {
        console.log('Mensagem recebida: ', data);
      });
    }
  } // receber mensagens, reage ao evento '' message ''

}
