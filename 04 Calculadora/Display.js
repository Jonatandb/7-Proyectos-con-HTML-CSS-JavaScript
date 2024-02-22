class Display {
  constructor(displayValorAnterior, displayValorActual) {
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
    this.calculadora = new Calculadora();
    this.valorActual = '';
    this.valorAnterior = '';
    this.tipoOperacion = '';
    this.signos = {
      sumar: '+',
      restar: '-',
      multiplicar: '*',
      dividir: '/'
    }
  }

  borrar() {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    this.imprimirValores()
  }

  borrarTodo() {
    this.valorAnterior = ''
    this.valorActual = ''
    this.tipoOperacion = ''
    this.imprimirValores()
  }

  agregarNumero(numero) {
    if (numero == '.' && this.valorActual.indexOf('.') != -1) return
    this.valorActual = this.valorActual.toString() + numero;
    this.imprimirValores()
  }

  imprimirValores() {
    this.displayValorActual.textContent = this.valorActual
    this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`
  }

  computar(tipoOperacion) {
    this.tipoOperacion !== 'igual' && this.calcular()
    this.tipoOperacion = tipoOperacion
    this.valorAnterior = this.valorActual || this.valorAnterior
    this.valorActual = ''
    this.imprimirValores()
  }

  calcular() {
    const valorAnterior = parseFloat(this.valorAnterior)
    const valorActual = parseFloat(this.valorActual)
    if (isNaN(valorAnterior) || isNaN(valorActual)) return
    this.valorActual = this.calculadora[this.tipoOperacion](valorAnterior, valorActual)
    this.imprimirValores()
  }
}