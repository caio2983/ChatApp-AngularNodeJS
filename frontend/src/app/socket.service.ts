import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | undefined;

  constructor() { }

  connect() : void {
    this.socket = io('http://localhost3000.com')
  }
}
