import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputLetterOnlyDirective } from './input-letter-only.directive';

@NgModule({
  declarations: [
    InputLetterOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputLetterOnlyDirective
  ]
})
export class DirectivesModule { }
