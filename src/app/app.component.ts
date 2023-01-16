import { Component, OnInit } from '@angular/core';
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
  hora: number= 0;
  minutos:number = 0;

  previlValue: any[] = [];
  resultado!: number;
  
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

  getValue(valor: string) {
    if(+valor >= 0 || valor === '.') {
      //console.log("Number: " + typeof valor)
      this.addDigit(valor);
    }else {
      this.processOperation(valor);
    }
  }

  currentOperationText: string[] = [];
  currentOperation!: any;
  addDigit(digite: string) {
    //console.log(digite);
    if(digite === '.' && this.currentOperationText.includes('.')){
      return;
    }
    this.currentOperation = digite;
    this.updatedScreen();
  }

  updatedScreen(
    operationValue?: null,
    operation?: null,
    current?: null,
    previous?: null
    ) {
    console.log(operationValue, operation, current, previous);
    if(operationValue === null) {
      this.currentOperationText.push(this.currentOperation);
      console.log(this.currentOperationText)
    }else {
    
    }

    
  }

  processOperation(operation: string) {
    //console.log(operation);
    let number = 0;
    let operationValue;
    let previous = +this.currentOperation;
    let current = this.currentOperationText.toLocaleString().replace(/,/g, '');
    number = parseInt(current)
    console.log("previous : " + previous);
    console.log("current : " + current);
    console.log(operation);

    switch (operation) {
      case '+':
        operationValue = previous + number;
        this.soma(operationValue, operation, number, previous);
        break;
    
      default:
        break;
    }
  }

  soma(operationValue: number, operation: string, number: number, previous: number) {
    if(operationValue === null) {
      this.currentOperationText.push(this.currentOperation);
      console.log(this.currentOperationText)
    }else {
      if(previous === 0) {
        operationValue = number
      }
      this.previlValue.push(`${operationValue} ${operation}`)
    }
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
