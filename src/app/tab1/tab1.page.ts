import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  formData = {
    url: 'https://tescha.edomex.gob.mx/sites/tescha.edomex.gob.mx/files/files/archivos/calendario23_23.pdf',
  };
  fileName = '';

  constructor() {}

  async submitForm() {
    try {
      this.fileName = 'test save 1';
      console.log('URL enviada:', this.formData.url);
      const response = await fetch(this.formData.url);
      const blob = await response.blob();
      await new Promise<void>((resolve, reject) => {
        saveAs(blob, this.fileName);
        resolve();
      });
      console.log('Archivo PDF descargado y guardado correctamente.');
    } catch (error) {
      console.error('Error al descargar o guardar el archivo PDF:', error);
    }
  }
}
