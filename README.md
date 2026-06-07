# Gestão de Usuários

## Dupla

- André Luiz Martins Fávero
- Guilherme Otto de Souza Leal

---

## Descrição

Aplicação web desenvolvida em React com Vite que consome uma API fake criada com JSON Server. Permite listar posts e usuários cadastrados, além de cadastrar novos usuários através de um formulário com três campos (nome, e-mail e telefone). Os dados são persistidos no arquivo `db.json` e consumidos via requisições HTTP.

---

## Tecnologias utilizadas

- [React](https://react.dev/) — biblioteca para construção de interfaces
- [Vite](https://vitejs.dev/) — ferramenta de build e servidor de desenvolvimento
- [JSON Server](https://github.com/typicode/json-server) — API REST fake baseada em arquivo JSON
- CSS puro — estilização da interface

---

## Instruções de execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado

### Passos

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone <url-do-repositorio>
cd aula-json-server
```

2. Instale as dependências:

```bash
npm install
```

3. Em um terminal, inicie a API fake (JSON Server):

```bash
npm run server
```

A API ficará disponível em `http://localhost:3000`

4. Em outro terminal, inicie a aplicação React:

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`

> Os dois comandos precisam estar rodando ao mesmo tempo.
