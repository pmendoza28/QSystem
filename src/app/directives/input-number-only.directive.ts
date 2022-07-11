import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appInputNumberOnly]'
})

export class InputNumberOnlyDirective {
    @Input() OnlyNumber: any

    @HostListener('keydown', ['$event']) onKeyDown(event: any) {
        let e = <KeyboardEvent>event;
        if (
            e.key == "q" ||
            e.key == "w" ||
            e.key == "e" ||
            e.key == "r" ||
            e.key == "t" ||
            e.key == "u" ||
            e.key == "u" ||
            e.key == "i" ||
            e.key == "o" ||
            e.key == "p" ||

            e.key == "a" ||
            e.key == "s" ||
            e.key == "d" ||
            e.key == "f" ||
            e.key == "g" ||
            e.key == "h" ||
            e.key == "j" ||
            e.key == "k" ||
            e.key == "l" ||
            e.key == "z" ||
            e.key == "x" ||
            e.key == "c" ||
            e.key == "v" ||
            e.key == "b" ||
            e.key == "n" ||
            e.key == "m" ||
            e.key == "c" ||


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