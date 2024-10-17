import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | undefined;

  mensagensSubject = new BehaviorSubject<string[]>([]);
  mensagens$ = this.mensagensSubject.asObservable(); // observable somente de leitura. quem consome não pode mudar os dados

  constructor() {}

  connect(): void {
    this.socket = io('http://localhost:3000/');
  }

  sendMessage(message: string, username: string, color: string): void {
    if (this.socket) {
      this.socket.emit('message', {
        message,
        username,
        color,
      });
    }
  }
  // mandar mensagens para o server . emite evento ''message'' com conteúdo da mensagem. O server está configurado para emitir
  // ''message'' quando uma mensagem é recebida por ele.OnMessage() abaixo ouve o evento ''message'', recebe a mensagem do server
  //  e adiciona a nova mensagem ao observable acima

  onMessage(): void {
    if (this.socket) {
      this.socket.on('message', (data: any) => {
        console.log('Mensagem recebida: ', data);
        const currentMessages = this.mensagensSubject.getValue();
        this.mensagensSubject.next([...currentMessages, data]);
      });
    }
  } // receber mensagens do server. reage ao evento ''message'' e atualiza o observable para que a nova mensagem entre no array
}
