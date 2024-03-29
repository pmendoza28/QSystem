import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputLetterOnly]'
})
export class InputLetterOnlyDirective {

  @Input() OnlyLetter: any;

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent>event;
    if (
      e.key == "1" ||
      e.key == "2" ||
      e.key == "3" ||
      e.key == "4" ||
      e.key == "5" ||
      e.key == "6" ||
      e.key == "7" ||
      e.key == "8" ||
      e.key == "9" ||
      e.key == "0" ||
      e.key == "," ||
      e.key == "/" ||
      e.key == "'" ||
      e.key == "+" ||
      e.key == "-" ||
      e.key == "*" ||
      e.key == "!" ||
      e.key == "@" ||
      e.key == "#" ||
      e.key == "$" ||
      e.key == "%" ||
      e.key == "^" ||
      e.key == "&" ||
      e.key == "*" ||
      e.key == "(" ||
      e.key == ")" ||
      e.key == "_" ||
      e.key == "=" ||
      e.key == "`" ||
      e.key == "~" ||
      e.key == "?" ||
      e.key == ">" ||
      e.key == "<" ||
      e.key == ":" ||
      e.key == "{" ||
      e.key == "}" ||
      e.key == "." ||
      e.key == "[" ||
      e.key == "]" ||
      e.key == ";" ||
      e.keyCode == 220 ||
      e.keyCode == 222 ||
      (e.ctrlKey == true && e.key == "v")
    ) {
      e.preventDefault()
    }
    else {
      return
    }
  }

}
