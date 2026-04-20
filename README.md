# Calculadora Crochê

> Uma ferramenta web intuitiva projetada para ajudar artesãos a precificarem suas peças de forma justa e profissional. A aplicação calcula o preço final baseando-se no custo de materiais, tempo de produção, complexidade técnica e margem de lucro desejada.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## 📋 Sobre o projeto

Muitos artesãos têm dificuldade em precificar o próprio trabalho — cobram pouco, não contabilizam o tempo e acabam no prejuízo. Esse projeto resolve isso com uma calculadora simples e inteligente que transforma materiais, tempo e margem de lucro em um preço justo e sustentável.

### ✨ Funcionalidades

- **Múltiplos fios** — adicione quantos fios quiser, com cálculo proporcional por metragem usada
- **Valor/hora automático** — informe o salário desejado e as horas mensais; o sistema calcula o valor por hora
- **Multiplicador de complexidade** — simples (×1.0), média (×1.2), complexa (×1.5) e premium (×2.0)
- **Margem de lucro ajustável** — slider de 10% a 200%
- **Detalhamento completo** — veja o custo discriminado de cada fio, mão de obra e lucro
- **Funciona offline** — não precisa de internet após abrir a página
- **Responsivo** — funciona no celular e no computador

---

## 🚀 Como usar

### Opção 1 — Direto no navegador (sem instalar nada)

```bash


# Entre na pasta
cd croche-preco

# Abra o arquivo no navegador
# Windows:
start index.html

# Mac:
open index.html

# Linux:
xdg-open index.html
```

### Opção 2 — Com Live Server (VS Code)

1. Instale o [VS Code](https://code.visualstudio.com/)
2. Instale a extensão **Live Server**
3. Abra a pasta do projeto no VS Code
4. Clique com botão direito em `index.html` → **Open with Live Server**
5. A página abre no navegador e atualiza automaticamente ao salvar

---

## 🗂️ Estrutura do projeto

```
croche-preco/
├── index.html   # Estrutura da página (HTML)
├── style.css    # Visual e tema (CSS)
├── app.js       # Lógica e cálculos (JavaScript)
├── GUIA.md      # Guia completo de modificações
└── README.md    # Este arquivo
```

> **Sem frameworks, sem dependências.** HTML + CSS + JavaScript puro.

---

## 🧮 Fórmula de cálculo

```
Preço Final = (Materiais + Overhead) + (Horas × Valor/hora × Complexidade) + Margem de Lucro
```

| Variável | Descrição |
|---|---|
| Materiais | Soma do custo proporcional de cada fio + outros insumos |
| Overhead | Custo fixo rateado por peça (luz, internet, aluguel) |
| Horas | Tempo gasto na peça |
| Valor/hora | Salário desejado ÷ horas mensais trabalhadas |
| Complexidade | Multiplicador por dificuldade da peça (1.0 a 2.0) |
| Margem de Lucro | Percentual de lucro sobre o custo total |

---

## 🎨 Personalizando o visual

Todas as cores ficam em variáveis CSS no topo do `style.css`:

```css
:root {
  --cor-fundo:         #f7f3ef;   /* fundo da página */
  --cor-card:          #ffffff;   /* fundo dos cards */
  --cor-destaque:      #c0533a;   /* cor principal */
  --cor-destaque-soft: #f5e8e4;   /* versão clara */
  --cor-borda:         #e8e0d8;
  --cor-texto:         #2c2420;
  --cor-texto-suave:   #7a6a62;
}
```

Exemplo de tema roxo:
```css
--cor-destaque:      #7c4dbb;
--cor-destaque-soft: #ede5f6;
```
---

## 🗺️ Roadmap

- [ ] Salvar peças cadastradas (localStorage)
- [ ] Exportar orçamento em PDF
- [ ] Cronômetro integrado para medir tempo de produção
- [ ] Modo "amigo vs. cliente" (ajuste de margem rápido)
- [ ] Banco de materiais (cadastro de fios reutilizável)
- [ ] Histórico de peças calculadas
---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
