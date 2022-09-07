import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionRoutingModule } from './actions.routing.module';
import { ActionsComponent } from './component/actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    ActionRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ActionsModule { }
