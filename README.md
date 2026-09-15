# App de Listagem

Aplicação de lista de tarefas construída com **Next.js 15 (App Router)**, **React 19** e **TypeScript**,
com testes em **Jest** e **Testing Library**.

## Funcionalidades

- Renderização da lista inicial de tarefas no servidor (Server Component).
- Adição de novas tarefas no cliente (Client Component), com validação de título vazio ou só com espaços.
- Contador de tarefas que reage ao tamanho da lista através do hook `useContadorDeTarefas`.
- Mensagens de erro acessíveis (`role="alert"`) e lista navegável por leitores de ecrã.

## Estrutura do projeto

```
app/
  layout.tsx              Layout raiz da aplicação
  page.tsx                Server Component que carrega as tarefas iniciais
  globals.css             Estilos globais
components/
  GerenciadorDeTarefas.tsx Client Component que orquestra estado e ações
  ListaDeTarefas.tsx       Apresentação da lista de tarefas
  NovaTarefa.tsx           Formulário de criação de tarefas
hooks/
  useContadorDeTarefas.ts  Hook que devolve o total de tarefas
lib/
  tarefas.ts               Tipos, dados iniciais e simulação de API
tests/
  NovaTarefa.test.tsx
  pagina.test.tsx
  useContadorDeTarefas.test.tsx
```

## Requisitos

- Node.js 18.18 ou superior
- npm 9 ou superior

## Instalação

Instala todas as dependências do projeto:

```bash
npm install
```

## Ambiente de desenvolvimento

Inicia o servidor de desenvolvimento do Next.js em `http://localhost:3000`:

```bash
npm run dev
```

## Testes

Executa toda a suíte de testes definida no `package.json`:

```bash
npm test
```

Executa a suíte em modo de observação (reexecuta ao guardar ficheiros):

```bash
npm run test:watch
```

Executa os testes com relatório de cobertura e aplica os limites mínimos
definidos em `jest.config.js` (80% de instruções, 70% de branches, 80% de funções e 80% de linhas):

```bash
npm run test:coverage
```

## Verificação de tipos

Valida os tipos TypeScript sem gerar ficheiros de saída:

```bash
npm run typecheck
```

## Construção e produção

Gera a build de produção e inicia o servidor de produção:

```bash
npm run build
npm start
```

## Licença

Projeto privado, sem licença definida.
