import { OnChanges, OnInit, Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appHideIfNacional]'
})
export class HideIfNacionalDirective implements OnChanges, OnInit {

     // tslint:disable-next-line
    @Input('appHideIfNacional') role: string;
    innerWidth: any;

      /*
    Exemplo:
    <button appHideIfNacional='PARAMETRIZAR_JURIS' ..."></button>
    */
    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
        this.updateElement();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.innerWidth = window.innerWidth;
    }

    ngOnChanges(): void {
        this.updateElement();
      }

    private updateElement() {

          this.el.nativeElement.style.display = '';

      }
}
