import { Directive, ElementRef, Input, OnInit, DoCheck, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective implements OnChanges, OnInit {

  // tslint:disable-next-line
  @Input('appHideIfUnauthorized') role: string;

  /*
  Exemplo:
  <button appHideIfUnauthorized='CONSULTAR_JURIS' ..."></button>
  */
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.updateElement();
  }

  ngOnChanges(): void {
    this.updateElement();
  }

  private updateElement() {

      this.el.nativeElement.style.display = '';

  }
}
