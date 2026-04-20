/*  app.js — Calculadora de Crochê
   ÍNDICE:
   1. Estado global (dados da aplicação)
   2. Funções de fios (yarn)
   3. Funções de cálculo
   4. Funções de renderização (atualizar a tela)
   5. Inicialização*/


/* 1. ESTADO GLOBAL
   Aqui ficam os dados que a aplicação usa.
   "yarns" é a lista de fios. Cada fio tem:
     - id: número único
     - nome: texto exibido no campo
     - preco: preço do novelo inteiro (R$)
     - metros_total: metragem total do novelo
     - metros_usados: quantos metros foram usados na peça*/
let yarns = [
  {
    id: 1,
    nome: "Fio principal",
    preco: 28,
    metros_total: 500,
    metros_usados: 150
  }
];

let complexidade = 1.0;   // multiplicador de complexidade da peça
let proximoId = 2;         // contador para gerar IDs únicos de fios


/* 2. FUNÇÕES DE FIOS*/

/**
 * Adiciona um novo fio à lista e re-renderiza a tela.
 * Chamada pelo botão "+ adicionar fio" no HTML.
 */
function addYarn() {
  yarns.push({
    id: proximoId++,
    nome: "Fio " + yarns.length + 1,
    preco: 20,
    metros_total: 400,
    metros_usados: 80
  });
  renderizarFios();
  calcular();
}

/**
 * Remove um fio da lista pelo id e re-renderiza.
 * @param {number} id - id do fio a remover
 */
function removeYarn(id) {
  // Não permite remover o último fio
  if (yarns.length <= 1) {
    alert("É preciso ter pelo menos um fio.");
    return;
  }
  yarns = yarns.filter(function(y) { return y.id !== id; });
  renderizarFios();
  calcular();
}

/**
 * Atualiza uma propriedade de um fio quando o usuário digita.
 * @param {number} id        - id do fio a atualizar
 * @param {string} campo     - nome do campo (ex: "preco", "metros_usados")
 * @param {any}    valor     - novo valor
 * @param {boolean} eNumero  - se true, converte para número
 */
function atualizarYarn(id, campo, valor, eNumero) {
  yarns = yarns.map(function(y) {
    if (y.id === id) {
      y[campo] = eNumero ? parseFloat(valor) || 0 : valor;
    }
    return y;
  });
  calcular();
}


/* 3. FUNÇÕES DE CÁLCULO */

/**
 * Recalcula o valor/hora quando salário ou horas mudam.
 * Atualiza o campo "Valor/hora calculado" na tela.
 */
function calcularHora() {
  const salario     = parseFloat(document.getElementById("salary").value)      || 0;
  const horasMes    = parseFloat(document.getElementById("hours_month").value) || 1;
  const valorHora   = salario / horasMes;

  // Atualiza o campo na tela (2 casas decimais)
  document.getElementById("hour_val").value = valorHora.toFixed(2);

  calcular(); // recalcula o preço final
}

/**
 * Fórmula central:
 * Preço Final = (Materiais + Overhead) + (Horas × Valor/hora × Complexidade) + Margem
 *
 * Atualiza todos os elementos de resultado na tela.
 */
function calcular() {
  /* — Custo de materiais — */
  const custoFios = yarns.reduce(function(soma, y) {
    const custoPorMetro = y.preco / y.metros_total;
    return soma + (custoPorMetro * y.metros_usados);
  }, 0);

  const extras   = parseFloat(document.getElementById("extras").value)   || 0;
  const overhead = parseFloat(document.getElementById("overhead").value) || 0;
  const totalMateriais = custoFios + extras + overhead;

  /* — Custo de mão de obra — */
  const valorHora  = parseFloat(document.getElementById("hour_val").value)    || 0;
  const horasPeca  = parseFloat(document.getElementById("hours_piece").value) || 0;
  const totalMaoDeObra = valorHora * horasPeca * complexidade;

  /* — Base de custo e margem — */
  const base   = totalMateriais + totalMaoDeObra;
  const margem = (parseFloat(document.getElementById("margin").value) || 30) / 100;

  /* — Preço final — */
  const precoFinal = base * (1 + margem);
  const lucro      = precoFinal - base;

  /* — Atualiza elementos na tela — */
  document.getElementById("final-price").textContent = formatarBRL(precoFinal);
  document.getElementById("r-mat").textContent       = formatarBRL(totalMateriais);
  document.getElementById("r-labor").textContent     = formatarBRL(totalMaoDeObra);
  document.getElementById("r-profit").textContent    = formatarBRL(lucro);

  /* — Atualiza o detalhamento linha a linha — */
  renderizarBreakdown(custoFios, extras, overhead, totalMaoDeObra, horasPeca, valorHora, lucro, margem);
}

/**
 * Define o multiplicador de complexidade e atualiza o botão ativo.
 * @param {HTMLElement} btn - botão clicado
 */
function setComplexidade(btn) {
  // Remove "active" de todos os botões
  document.querySelectorAll(".cbtn").forEach(function(b) {
    b.classList.remove("active");
  });
  // Ativa o botão clicado
  btn.classList.add("active");
  complexidade = parseFloat(btn.dataset.v);
  calcular();
}


/*4. FUNÇÕES DE RENDERIZAÇÃO 
Constroem o HTML dinâmico e inserem na página. */

/**
 * Renderiza a lista de fios no elemento #yarns-list.
 * Cria um "yarn-card" para cada fio do array.
 */
function renderizarFios() {
  const container = document.getElementById("yarns-list");

  container.innerHTML = yarns.map(function(y) {
    return `
      <div class="yarn-card" id="yarn-${y.id}">

        <div class="yarn-card-header">
          <input
            class="yarn-name-input"
            type="text"
            value="${y.nome}"
            onchange="atualizarYarn(${y.id}, 'nome', this.value, false)"
          />
          <button
            class="yarn-remove-btn"
            onclick="removeYarn(${y.id})"
          >remover</button>
        </div>

        <div class="field-row tres-colunas">

          <div class="field">
            <label>Preço do novelo (R$)</label>
            <input
              type="number"
              value="${y.preco}"
              min="0" step="0.50"
              oninput="atualizarYarn(${y.id}, 'preco', this.value, true)"
            />
          </div>

          <div class="field">
            <label>Metragem total (m)</label>
            <input
              type="number"
              value="${y.metros_total}"
              min="1" step="10"
              oninput="atualizarYarn(${y.id}, 'metros_total', this.value, true)"
            />
          </div>

          <div class="field">
            <label>Metros usados (m)</label>
            <input
              type="number"
              value="${y.metros_usados}"
              min="1" step="10"
              oninput="atualizarYarn(${y.id}, 'metros_usados', this.value, true)"
            />
          </div>

        </div>
      </div>
    `;
  }).join("");
}

/**
 * Renderiza o detalhamento de custos no painel de resultado.
 */
function renderizarBreakdown(custoFios, extras, overhead, maoDeObra, horas, valorHora, lucro, margem) {
  const container = document.getElementById("breakdown");

  // Linhas de cada fio
  const linhasFios = yarns.map(function(y) {
    const valor = (y.preco / y.metros_total) * y.metros_usados;
    return `
      <div class="breakdown-row">
        <span>${y.nome} (${y.metros_usados}m de ${y.metros_total}m)</span>
        <span>${formatarBRL(valor)}</span>
      </div>
    `;
  }).join("");

  container.innerHTML = linhasFios + `
    <div class="breakdown-row">
      <span>Outros insumos</span>
      <span>${formatarBRL(extras)}</span>
    </div>
    <div class="breakdown-row">
      <span>Custo fixo / peça</span>
      <span>${formatarBRL(overhead)}</span>
    </div>
    <div class="breakdown-row">
      <span>Mão de obra (${horas}h × ${formatarBRL(valorHora)} × ${complexidade}x)</span>
      <span>${formatarBRL(maoDeObra)}</span>
    </div>
    <div class="breakdown-row">
      <span>Margem de lucro (${Math.round(margem * 100)}%)</span>
      <span>${formatarBRL(lucro)}</span>
    </div>
  `;
}


/*5. UTILITÁRIOS*/
/**
 * Formata um número para o padrão brasileiro de moeda.
 * Exemplo: 1234.5 → "R$ 1.234,50"
 * @param {number} valor
 * @returns {string}
 */
function formatarBRL(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


/*6. INICIALIZAÇÃO */
document.addEventListener("DOMContentLoaded", function() {
  renderizarFios();  // monta a lista de fios inicial
  calcular();         // calcula o preço inicial
});
