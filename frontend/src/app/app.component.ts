import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  model,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ColorPicker, ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton,
    ColorPickerModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';

  mensagens: any = [];
  mensagensSubscription: Subscription | undefined;

  color!: string;
  username!: string;

  constructor(
    private socketService: SocketService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.socketService.connect();

    this.socketService.onMessage();

    this.mensagensSubscription = this.socketService.mensagens$.subscribe({
      next: (messages: string[]) => {
        this.mensagens = messages;
      },

      // inscrição no observable mensagens$ / mensagensSubject que está no services. atualiza o array this.mensagens com a resposta do
      // observable
    });

    this.openDialog();
  }

  sendMessage(newMessage: string): void {
    const username = this.username;
    const color = this.color;
    this.socketService.sendMessage(newMessage, username, color);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: { username: this.username, color: this.color },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.username = result.data[0];
        this.color = result.data[1];
      }
    });
  }

  teste() {
    console.log(this.mensagens);
  }
}
