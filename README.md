# 🐕 Dog API - Automação de Testes de API (Clean Code & Allure)

Este projeto é um framework de automação de testes para a [Dog CEO API](https://dog.ceo/dog-api/), desenvolvido com **Playwright**, **TypeScript** e **Allure Report**. O foco principal é demonstrar padrões de **Código Limpo (Clean Code)**, separação de responsabilidades e relatórios de testes profissionais com evidências visuais e tratamento de erros.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework de Testes:** [Playwright](https://playwright.dev/)
- **Relatórios Profissionais:** [Allure Report](https://allurereport.org/) (utilizando `allure-js-commons` v3)
- **CI:** [GitHub Actions](https://github.com/features/actions) com deploy automático no **GitHub Pages**
- **Gestão de Ambiente:** [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 📁 Estrutura do Projeto (Padrões Adotados)

O projeto segue uma arquitetura modular para garantir escalabilidade e fácil manutenção:

- **`tests/dog-api/dog.ts` (Controller)**: Camada de abstração das chamadas HTTP. Centraliza os endpoints e métodos de requisição.
- **`tests/dog-api/utils/dog.helper.ts` (Helper)**: Camada de lógica e validação. Contém asserts customizados, tratamento de erros e anexos do Allure.
- **`tests/dog-api.spec.ts` (Specs)**: Camada de testes declarativa. Foca no fluxo de negócio (Arrange, Act, Assert) sem poluição de lógica técnica.
- **`test-images/`**: Armazena as evidências visuais (imagens de cães) baixadas durante a execução dos testes.

---

## 🚀 Como Começar

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [NPM](https://www.npmjs.com/)

### 2. Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta e instale as dependências
npm install
```

### 3. Configuração de Ambiente (.env)
Crie um arquivo `.env` na raiz do projeto:
```env
URL_PADRAO=https://dog.ceo/api
URL_RANDOM=https://dog.ceo/api/breeds
RACA_DOG=affenpinscher
```

---

## 🧪 Cenários de Teste Implementados

O projeto cobre 4 cenários fundamentais, demonstrando diferentes validações:

1.  **Cenário 1: Consulta de Imagem por Raça**: Valida o sucesso (200 OK) e se a URL retornada pertence à raça configurada no `.env`.
2.  **Cenário 2: Listagem de Todas as Raças**: Garante que a API retorna a lista completa e íntegra de todas as raças de cães.
3.  **Cenário 3: Captura e Evidência Visual**: Realiza a consulta de uma imagem aleatória geral, faz o download do arquivo e **anexa a foto do cachorro diretamente no relatório Allure**.
4.  **Cenário 4: Falha no Filtro (Retorno Tratado)**: Um cenário de **falha proposital** que demonstra como o framework captura um erro 404 (raça inexistente) e gera um "retorno tratado" no Allure, exibindo o motivo da falha e o JSON de erro da API.

---

## 📊 Relatórios Allure

Os relatórios são ricos em detalhes, incluindo passos (steps), severidade, labels e anexos.

```bash
# Executar testes e gerar relatório HTML único
npx playwright test
npm run allure:generate:html

# Abrir o relatório gerado
npm run allure:open
```

---

## ⚙️ Pipeline CI/CD

O workflow no GitHub Actions (`playwright.yml`) automatiza todo o processo:
1.  Instala dependências e browsers.
2.  Executa os testes (mesmo que o Cenário 4 falhe, o pipeline continua para gerar o relatório).
3.  Gera o histórico de execuções do Allure.
4.  **Publica o relatório no GitHub Pages**: O link do relatório fica disponível na branch `gh-pages` do seu repositório.

---

## 🤝 Boas Práticas de Código Limpo (Clean Code)

- **DRY (Don't Repeat Yourself)**: Validações de status e corpo da resposta centralizadas no Helper.
- **Separation of Concerns**: Testes não sabem *como* a requisição é feita, apenas *o que* deve ser testado.
- **Nomes Semânticos**: Métodos e variáveis com nomes claros que descrevem sua intenção.
- **Tratamento de Erros Amigável**: Falhas de validação geram mensagens claras (`FALHA NO FILTRO`) em vez de stacks técnicos complexos.

---
