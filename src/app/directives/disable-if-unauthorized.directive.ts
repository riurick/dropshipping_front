import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDisableIfUnauthorized]'
})
export class DisableIfUnauthorizedDirective implements OnInit, OnChanges {

  // tslint:disable-next-line
  @Input('appDisableIfUnauthorized') role: string;

  /*
    Exemplo:
    <button appDisableIfUnauthorized='CONSULTAR_JURIS' ..."></button>
  */

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.updateElement();
  }

  ngOnChanges(): void {
    this.updateElement();
  }

  private updateElement() {

      this.el.nativeElement.disabled = true;

  }
}
