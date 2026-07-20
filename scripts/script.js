class Parquimetro {
  constructor() {
    this.tabelaPrecos = {
      30: 1.0,
      60: 1.75,
      120: 3.0,
    };
  }

  obterPreco(tempo) {
    return this.tabelaPrecos[tempo];
  }

  validarPagamento(valorPago, preco) {
    return valorPago >= preco;
  }

  calcularTroco(valorPago, preco) {
    return (valorPago - preco).toFixed(2).replace(".", ",");
  }

  processarPagamento(tempo, valorPago) {
    const preco = this.obterPreco(tempo);

    if (!this.validarPagamento(valorPago, preco)) {
      return {
        sucesso: false,
        mensagem: `Valor insuficiente. Para ${tempo} minutos são necessários R$ ${preco.toFixed(2)}.`,
      };
    }

    return {
      sucesso: true,
      tempo: tempo,
      valor: preco.toFixed(2).replace(".", ","),
      troco: this.calcularTroco(valorPago, preco),
    };
  }
}

const parquimetro = new Parquimetro();

const obterElemento = (id) => document.getElementById(id);

function limparCampos(){
  obterElemento("valor").value = "";
  obterElemento("categoria").selectedIndex = 0;
}

function calcularValor() {
  const tempo = parseFloat(obterElemento("categoria").value);
  const valorPago = parseFloat(obterElemento("valor").value);
  const resultado = obterElemento("resultado");

  if (valorPago < 1) {
    resultado.textContent =
      "Valor insuficiente. Valores inferiores a R$ 1,00 são inválidos.";
    return;
  }

  const pagamento = parquimetro.processarPagamento(tempo, valorPago);

  if (!pagamento.sucesso) {
    resultado.textContent = pagamento.mensagem;
    return;
  }

  resultado.innerHTML = `
    <strong>Tempo:</strong> ${pagamento.tempo} minutos <br>
    <strong>Valor:</strong> R$ ${pagamento.valor} <br>
    <strong>Troco:</strong> R$ ${pagamento.troco}
  `;

  limparCampos();
}
