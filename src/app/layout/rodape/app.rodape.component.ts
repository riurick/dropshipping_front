import { Component } from '@angular/core';

@Component({
    selector: 'app-rodape',
    template: `
            <div class="layout-footer">
                <div>
                    <div >
                        <img  src="./../../../assets/images/grafismo.png" />

                        <div>
                            <div class="ui-g-4">
                                <div class="ui-g-4 ui-g-offset-4">
                                    <a href="https://somoscooperativismo.coop.br/">
                                        <img class="logo-footer-left" src="../../../assets/images/logo-ocb.png">
                                    </a>
                                </div>
                            </div>
                            <div class="ui-g-4">
                                <span class="footer-text">
                                    <span class="pi pi-copyright"></span>
                                    <span>SISTEMA OCB © TODOS OS DIREITOS RESERVADOS.</span>
                                </span>
                            </div>
                            <div class="ui-g-4" >
                                <div class="ui-g-4 ui-g-offset-4">
                                    <a href="http://somos.coop.br/">
                                        <img class="logo-footer" alt="Cooperativas constroem um mundo melhor"
                                        src="../../../assets/images/somoscoop_marca_horizontal.png">
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    `
})
export class AppRodapeComponent {

}
