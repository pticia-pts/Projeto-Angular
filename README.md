# 📚 Biblioteca

Aplicação web para gerenciamento de livros, desenvolvida como projeto frontend utilizando **Angular 22, OptimusUI 2 e Tailwind CSS 4**.

O projeto possui um CRUD completo com dados armazenados em memória, permitindo cadastrar, visualizar, editar e excluir livros.

## 🛠️ Tecnologias

- **Angular 22.2.1**
- **OptimusUI 2.0.2**
- **Tailwind CSS 4.3.3**
- **TypeScript**
- **HTML/CSS**

### Uso das tecnologias

- **Angular:** estrutura da aplicação, componentes, rotas e lógica.
- **OptimusUI:** componentes de interface, como `Button`, `Card`, `Tag` e `Breadcrumb`.
- **Tailwind CSS:** layout, espaçamento e alinhamento.

## 📋 Funcionalidades

- Listagem de livros
- Cadastro de livros
- Edição de livros
- Visualização de detalhes
- Exclusão com confirmação
- Status de leitura
- Avaliação por estrelas
- Comentários
- Breadcrumb e navegação entre páginas
- Dados armazenados em memória

## 🚀 Configuração

### 1. Pré-requisitos

- Node.js
- npm
- Angular CLI

Verifique as versões instaladas:

```
node --version
npm.cmd --version
ng.cmd version
```

### 2. Instalar o Angular CLI
O comando instala o Angular CLI globalmente, permitindo utilizar os comandos ng para criar, executar e administrar projetos Angular.

```
npm.cmd install -g @angular/cli
```
### 3. Instalar as dependências
Esse comando lê o arquivo package.json e instala todas as dependências do projeto, incluindo Angular, OptimusUI e Tailwind CSS.

```
npm.cmd install
```

### 4. Criação do projeto

```
ng new biblioteca
```
### 5. Criação dos componentes

```
ng.cmd generate component components/nome-do-componente

```

### 4. Executar o projeto

```
ng serve
```

## Estrutura das páginas
```text
src/app/
├── components/
│   ├── avaliacao-estrelas/
│   ├── confirmar-exclusao/
│   ├── livro-detalhes/
│   ├── livro-form/
│   └── livro-lista/
│
├── models/
│   └── livro.ts
│
├── services/
│   └── livro.ts
│
├── app.html
├── app.ts
└── app.routes.ts
```

