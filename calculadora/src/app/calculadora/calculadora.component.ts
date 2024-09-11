import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
  public painel: string = '';
  private operationAdded: boolean = false;

  teclar(num: string) {
    if (this.operationAdded && isNaN(Number(num))) {
      return;
    }
    this.painel += num;
  }

  addOperation(operation: string) {
    if (!this.operationAdded) {
      this.painel += operation;
      this.operationAdded = true;
    }
  }

  apagar() {
    this.painel = '';
    this.operationAdded = false;
  }

  calcular() {
    try {
      const resultado = this.calcularResultado(this.painel);
      this.painel = resultado.toString();
      this.operationAdded = false;
    } catch (error) {
      this.painel = 'Erro';
      this.operationAdded = false;
    }
  }

  calcularResultado(expressao: string): number {
    const operadores = ['+', '-', '*', '/'];
    let partes = expressao.split(/([+\-*/])/); 

    let resultado = parseFloat(partes[0]);

    for (let i = 1; i < partes.length; i += 2) {
      const operador = partes[i];
      const proximoNumero = parseFloat(partes[i + 1]);

      if (!operadores.includes(operador) || isNaN(proximoNumero)) {
        throw new Error("Expressão inválida");
      }

      switch (operador) {
        case '+':
          resultado += proximoNumero;
          break;
        case '-':
          resultado -= proximoNumero;
          break;
        case '*':
          resultado *= proximoNumero;
          break;
        case '/':
          resultado /= proximoNumero;
          break;
      }
    }

    return resultado;
  }
}
