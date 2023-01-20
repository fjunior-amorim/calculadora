import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

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
      this.addDigit(valor);
    } else {
      this.processOperation(valor);
    }
  }

  showScreen: string[] = [];
  previousOperationText: number[] = [];
  currentOperationText: string[] = []; //primeira parcela de valores  para fazer a opração
  secondPortion: string[] = [];   //segunda parcela de valores  para fazer a opração
  currentOperation: string = '';
  /**
   * este metodo é responsavel para que o digito (.) não seja duplicado 
   */
  addDigit(digite: string) {
    if (digite === '.' && this.currentOperationText.includes('.')) {
      return;
    }
    this.currentOperation = digite;
    this.showScreen.push(digite);
    this.updatedScreen();
  }

  updatedScreen(
    operationValue?: null | any,
    operation?: null | any,
    current?: null | any,
    previous?: null | any
  ) {
    if (operationValue === null || operationValue === undefined) {
      this.currentOperationText.push(this.currentOperation);
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      
      this.showScreen = []
      this.previousOperationText = operationValue;
      this.showScreen.push(this.previousOperationText.toString());
      this.showScreen.push(operation);
      this.currentOperationText = [];
    }
  }
  
  changeOperation(operation: string){
    const mathOperation = ["+", "-" ,"x", "÷"];
    if(!mathOperation.includes(operation)) {
      return;
    }
    this.showScreen.pop();
    this.showScreen.push(operation);
    this.previousOperationText = (this.previousOperationText);
  }

  delete() {
    this.currentOperationText = this.currentOperationText.slice(0, -1);

    if(this.showScreen.length > 1) {
      this.showScreen.pop();
    }else {
      this.showScreen = [];
      this.previousOperationText = [];
    }
  }

  clearCalculator() {
    this.currentOperationText = [];
    this.previousOperationText = [];
    this.showScreen = [];
  }

  equalOperatuon() {
    const operation = this.showScreen[1];
    this.processOperation(operation);
    //this.showScreen.pop();
    //this.currentOperationText = [];
    //this.previousOperationText = [];
  }
  /**
   *  este metodo é responsavel por chamar os medotos das operaçoes escolhidas
   */
  processOperation(operation: string) {
    //verificar se o current esta fazio
    if(this.currentOperationText.length === 0 && operation !== 'CE' && operation !== 'CA'  && operation !== '=') {
      //chegar operação
      if(this.previousOperationText.length !== 0){
        this.changeOperation(operation);
      }
      return;
    }

    
    let operationValue;
    const previous = +this.previousOperationText.toLocaleString();
    const current = +this.currentOperationText.toLocaleString().replace(/,/g, '');

    switch (operation) {

      case '+':
        operationValue = previous + current;
        this.updatedScreen(operationValue, operation, current, previous);
        break;

      case '-':
        operationValue = previous - current;
        this.updatedScreen(operationValue, operation, current, previous);
        break;

      case 'x':
        operationValue = previous * current;
        this.updatedScreen(operationValue, operation, current, previous);
        break;

      case '÷':
        operationValue = previous / current;
        this.updatedScreen(operationValue, operation, current, previous);
        break;
      case 'CE':
        this.delete();
        break;
      case 'CA':
        this.clearCalculator();
        break;
      case '=':
        this.equalOperatuon();
        break;
      default:
        return;
    }
  }

  ngOnInit() {
    this.getData()
  }
}
