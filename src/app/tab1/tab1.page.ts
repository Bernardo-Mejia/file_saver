import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { File } from '@ionic-native/file/ngx';

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

  constructor(private file: File) {}

  async submitForm() {
    console.log('Método con file saver');
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

    console.log('Método con axios');
    try {
      this.fileName = 'testSave1.pdf';
      console.log('URL enviada:', this.formData.url);
      const response = await axios({
        url: this.formData.url,
        method: 'GET',
        responseType: 'blob',
      });

      const filePath = this.file.dataDirectory;

      await this.file.writeFile(filePath, this.fileName, response.data, {
        replace: true,
      });
      //filePath, response.data, { replace: true }

      console.log('Archivo PDF descargado y guardado correctamente.');
    } catch (error) {
      console.error('Error al descargar o guardar el archivo PDF:', error);
    }
  }
}
