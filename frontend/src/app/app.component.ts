import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private socketService : SocketService) {

  }

  ngOnInit() {
    this.socketService.connect();
  }
}
