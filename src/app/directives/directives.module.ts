import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputLetterOnlyDirective } from './input-letter-only.directive';
import { InputNumberOnlyDirective } from './input-number-only.directive';

@NgModule({
  declarations: [
    InputLetterOnlyDirective,
    InputNumberOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputLetterOnlyDirective,
    InputNumberOnlyDirective
  ]
})
export class DirectivesModule { }
