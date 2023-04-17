import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { TextMaskModule } from 'angular2-text-mask';
import { SearchPipe } from './pipes/search.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    TextMaskModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    TextMaskModule,
    MatIconModule,
    SearchPipe,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
  ],
})
export class SharedModule {}
