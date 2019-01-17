import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChessPage } from './chess';

@NgModule({
  declarations: [
    ChessPage,
  ],
  imports: [
    IonicPageModule.forChild(ChessPage),
  ],
})
export class ChessPageModule {}
