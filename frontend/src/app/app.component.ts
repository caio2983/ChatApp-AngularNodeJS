import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  
  mensagens : string[] = [];
  mensagensSubscription : Subscription | undefined;
 

  constructor(private socketService : SocketService) {
   
  }

  ngOnInit() {
    this.socketService.connect();
    this.sendMessage('aaa')

    this.socketService.onMessage();

    this.mensagensSubscription = this.socketService.mensagens$.subscribe({
      next:(messages: string[]) => {
        this.mensagens= messages
      }

    // inscrição no observable mensagens$ / mensagensSubject que está no services. atualiza o array this.mensagens com a resposta do
    // observable 
    })


  }

  sendMessage(newMessage: string): void {
  
    this.socketService.sendMessage(newMessage);
  
  }

  
}
