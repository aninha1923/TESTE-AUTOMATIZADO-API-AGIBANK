# 🐕 Dog API - Automação de Testes de API

Este projeto consiste em um framework de automação de testes para a [Dog CEO API](https://dog.ceo/dog-api/), desenvolvido com **Playwright** e **TypeScript**. O objetivo é garantir a qualidade e a disponibilidade dos endpoints de raças de cães, utilizando padrões de projeto como Controllers e Helpers para uma estrutura escalável e de fácil manutenção.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework de Testes:** [Playwright](https://playwright.dev/)
- **Relatórios:** [Allure Report](https://allurereport.org/)
- **CI:** [GitHub Actions](https://github.com/features/actions)
- **Outros:** Dotenv (Gerenciamento de ambiente), FS/Path (Manipulação de arquivos)

---

## 📁 Estrutura do Projeto

O projeto segue uma organização modular para separar responsabilidades:

```text
├── .github/workflows/      # Configuração do Pipeline (CI/CD)
├── allure-results/         # Resultados brutos do Allure (gerado pós-teste)
├── test-images/            # Imagens de cães baixadas durante os testes
├── tests/
│   ├── dog-api.spec.ts     # Suítes de testes automatizados
│   ├── dog.controller.ts   # Abstração das chamadas HTTP (Request Layer)
│   ├── dog.helper.ts       # Validações, asserts e lógica de apoio
├── .env                    # Variáveis de ambiente (não versionado)
├── playwright.config.ts    # Configurações globais do Playwright
└── package.json            # Scripts e dependências
```

---

## 🚀 Como Começar

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### 2. Instalação
Clone o repositório e instale as dependências:
```bash
git clone <url-do-repositorio>
cd api-dog
npm install
```

### 3. Configuração
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (conforme `playwright.config.ts`):
```env
URL_PADRAO=https://dog.ceo/api
URL_RANDOM=https://dog.ceo/api/breeds
RACA_DOG=affenpinscher
```

---

## 🧪 Executando os Testes

Você pode executar os testes utilizando os scripts configurados no `package.json`:

```bash
# Executar todos os testes em modo headless
npm run test:e2e

# Executar testes com a interface visual do Playwright
npx playwright test --ui

# Executar um teste específico
npx playwright test tests/dog-api.spec.ts
```

---

## 📊 Relatórios com Allure

O projeto está integrado ao Allure para fornecer relatórios detalhados e visuais.

1. **Gerar e abrir o relatório temporário:**
   ```bash
   npm run allure:serve
   ```

2. **Gerar o relatório estático (HTML):**
   ```bash
   npm run allure:generate:html
   npm run allure:open
   ```

---

## ⚙️ CI/CD (GitHub Actions)

O projeto possui um workflow configurado (`.github/workflows/playwright.yml`) que é disparado automaticamente em:
- **Push** na branch `main`.
- **Pull Requests** para a branch `main`.

O pipeline executa os testes, gera os resultados e pode ser configurado para publicar o Allure Report.

---

## 📝 Cenários de Teste Cobertos

- **Consulta de Raça Específica:** Valida o status code, a estrutura da resposta e se a URL da imagem condiz com a raça solicitada.
- **Listagem de Todas as Raças:** Garante que a lista completa está sendo retornada e valida a existência de raças específicas.
- **Imagem Aleatória:** Valida a captura de imagens aleatórias e o download do arquivo para a pasta `test-images/`.

---

## 🤝 Boas Práticas Adotadas

1. **Controller Pattern:** Centraliza as requisições, facilitando alterações de endpoints em um único lugar.
2. **Helpers:** Isola a lógica de validação (Schema/Asserts), mantendo o arquivo de teste limpo e legível.
3. **Gerenciamento de Evidências:** Armazenamento automático de imagens capturadas para auditoria visual.
4. **Timeouts Otimizados:** Configurações globais para lidar com variações de performance da API.

---
Desenvolvido por [Seu Nome] - 2026
