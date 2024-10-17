import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
  Inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../interfaces/UserInterface';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-dialog-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ColorPickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogClose,
  ],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss',
})
export class DialogUserComponent {
  readonly dialog = inject(MatDialog);
  color!: any;
  username!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<DialogUserComponent>
  ) {}

  confirm() {
    this.dialogRef.close({ data: [this.username, this.color] });
  }
}
