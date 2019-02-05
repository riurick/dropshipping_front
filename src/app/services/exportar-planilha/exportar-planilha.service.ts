import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { utils, WorkBook, write } from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportarPlanilhaService {

  constructor() { }
  exportar(planilha, nomeArquivo) {

    const ws_name = 'SomeSheet';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(planilha.data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        // tslint:disable-next-line
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), nomeArquivo);
  }
}
