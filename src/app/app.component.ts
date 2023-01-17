import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  meses: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Decembro',
  ];
  ano: number = 0;
  mes: string = '';
  hora: number = 0;
  minutos: number = 0;

  getData() {
    const data = new Date();
    const ano = data.getFullYear();
    this.ano = ano;
    const mes = data.getMonth();
    this.mes = this.meses[mes];
    const horas = data.getHours();
    this.hora = horas;
    const minutos = data.getMinutes();
    this.minutos = minutos;
  }
  /***
   * esse metodo é resposavel por separar os numeros dos operadores.
   */
  getValue(valor: string) {
    if (+valor >= 0 || valor === '.') {
      //console.log("Number: "+ valor)
      this.addDigit(valor);
    } else {
      this.processOperation(valor);
    }
  }
  showScreen: string[] = [];
  currentOperationText: string[] = []; //primeira parcela de valores  para fazer a opração
  secondPortion: string[] = [];   //segunda parcela de valores  para fazer a opração
  currentOperation!: string;
  /**
   * este metodo é responsavel para que o digito (.) não seja duplicado 
   */
  addDigit(digite: string) {
    //console.log("" + digite);
    if (digite === '.' && this.currentOperationText.includes('.')) {
      return;
    }
    this.currentOperation = digite;
    this.showScreen.push(digite);
    this.updatedScreen();
  }

  updatedScreen(
    operationValue?: null,
    operation?: null,
    current?: null,
    previous?: null
  ) {
    //console.log(operationValue, operation, current, previous);
    this.currentOperationText.push(this.currentOperation);

  }

  /**
   *  este metodo é responsavel por chamar os medotos das operaçoes escolhidas
   */
  processOperation(operation: string) {
    //================{ me leia primairo }======================
    //Parei aqui 
    //teitei corta a this.currentOperationText
    //quero separar a primaira parcela antes do sinal de operação
    if (operation) {
      let index = this.showScreen.indexOf(operation);
      this.currentOperationText.forEach((v, i) => {
        while (i < index) {
          console.log(v)
        }
      })
    }
    let operationValue = operation;
    this.showScreen.push(operationValue);
    let previous = +this.currentOperation;
    let convertString = this.currentOperationText.toLocaleString().replace(/,/g, '');
    let current = parseInt(convertString);


    switch (operation) {
      case '+':

        break;
      case '-':

        break;
      case '*':

        break;

      case '÷':

        break;
      case '%':
        break;

      default:
        break;
    }
  }

  soma() {

  }
  subtrair(operador: string) {

  }
  dividir(operador: string) {

  }
  multiplicar(operador: string) {

  }

  ngOnInit() {
    this.getData()
  }
}
