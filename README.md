 <p align="center">
  <img
    src="docs/imgs/banner_agora_pronto.png"
    alt="Agora Pronto"
    width="auto"
  />
</p>

# 🌵 Agora Pronto

**Agora Pronto** é um aplicativo de lista de tarefas desenvolvido para ajudar na organização da rotina, no acompanhamento de atividades e na conclusão de tarefas de forma simples e prática.

Inspirado na expressão nordestina "agora pronto", o projeto une produtividade, leveza e identidade regional.

## 🎯 Objetivo

Esta aplicação é destinada à realização dos exercícios práticos da disciplina de **Aplicações com Interfaces Ricas**, com foco no desenvolvimento de interfaces web modernas e interativas utilizando Angular, OptimusUI e Tailwind CSS.

## 🛠️ Tecnologias utilizadas

- **Angular 22** — Framework utilizado para desenvolvimento da aplicação.
- **TypeScript** — Linguagem utilizada na implementação da lógica e tipagem dos dados.
- **Angular Signals** — Gerenciamento reativo do estado da aplicação.
- **Signal Forms** — Construção e validação de formulários utilizando sinais.
- **Angular Router** — Gerenciamento da navegação entre páginas.
- **HttpClient** — Comunicação HTTP entre o frontend e o backend.
- **JSON Server** — Simulação de uma API REST para armazenamento e gerenciamento das tarefas.
- **OptimusUI 2** — Biblioteca de componentes de interface.
- **Tailwind CSS 4** — Framework CSS para estilização e construção de interfaces responsivas.
- **PrimeIcons** — Biblioteca de ícones.

## ✨ Funcionalidades

Atualmente, a aplicação permite:

- Listar tarefas cadastradas.
- Cadastrar novas tarefas.
- Visualizar os detalhes de uma tarefa.
- Editar tarefas existentes.
- Excluir tarefas.
- Alterar o status de conclusão.
- Definir prioridade e prazo.
- Validar os campos dos formulários.
- Atualizar os dados por meio de comunicação com uma API REST.

## 🏗️ Organização do projeto

A aplicação está organizada em componentes, páginas, serviços e modelos, separando as responsabilidades de cada parte.

```text
src/
└── app/
    ├── components/
    │   └── tarefa-card/
    │       ├── tarefa-card.ts
    │       ├── tarefa-card.html
    │       └── tarefa-card.css
    │
    ├── models/
    │   └── tarefa.ts
    │
    ├── pages/
    │   ├── tarefas/
    │   ├── tarefa-detalhe/
    │   └── tarefa-form/
    │
    ├── services/
    │   └── tarefa.service.ts
    │
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.ts
    └── app.html
```

O gerenciamento do estado das tarefas é centralizado no `TarefaService`, utilizando Angular Signals. As páginas e os componentes consomem esses dados para atualizar a interface de forma reativa.

## 🔌 Backend e API

O projeto utiliza o **JSON Server** para simular um backend REST local.

Os dados iniciais ficam armazenados no arquivo `db.json`, na raiz do projeto.

A API disponibiliza as operações de gerenciamento de tarefas:

| Método HTTP | Operação |
|---|---|
| `GET` | Consultar tarefas |
| `POST` | Cadastrar tarefa |
| `PUT` | Atualizar tarefa |
| `DELETE` | Excluir tarefa |

O endereço local da API é:

```text
http://localhost:3000/tarefas
```

## 🚀 Como executar o projeto

### 1. Pré-requisitos

- Node.js
- npm

### 2. Clonar o repositório

```bash
git clone https://github.com/josephyaraujo/Agora_Pronto.git
```

### 3. Acessar a pasta do projeto

```bash
cd Agora_Pronto
```

### 4. Instalar as dependências

```bash
npm install
```

### 5. Iniciar o backend

Em um primeiro terminal, execute:

```bash
npm run api
```

O JSON Server será iniciado na porta `3000`.

### 6. Iniciar o frontend

Em outro terminal, execute:

```bash
npm start
```

A aplicação Angular será disponibilizada em:

```text
http://localhost:4200
```

**Importante:** mantenha os dois terminais em execução para que o frontend consiga se comunicar com a API local.

## 🧪 Validação

Para verificar se o projeto compila corretamente, execute:

```bash
npm run build
```

Para verificar a resposta da API:

```bash
curl http://localhost:3000/tarefas
```

## 🚧 Status do projeto

Em desenvolvimento, como parte das atividades práticas da disciplina de **Aplicações com Interfaces Ricas**.

As funcionalidades de gerenciamento de tarefas, navegação entre páginas, formulários reativos e comunicação com a API local já foram implementadas.

---

**Agora Pronto — Organize suas tarefas. Resolva uma de cada vez.** 🌵