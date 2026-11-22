# Relatório Técnico Final — Aplicação Agora Pronto – Etapa 2

## 1. Introdução

Este relatório apresenta a evolução do desenvolvimento da aplicação **Agora Pronto**, criada como parte das atividades práticas da disciplina de Aplicações com Interfaces Ricas (AIR), do curso de Análise e Desenvolvimento de Sistemas.

Nesta etapa, o projeto foi aprimorado para utilizar recursos mais avançados do Angular, com foco na organização da aplicação, no gerenciamento de estado e na comunicação com um backend.

A implementação contemplou a divisão da aplicação em componentes e páginas menores, a utilização de Angular Signals, a criação de um serviço para centralizar as operações com tarefas, a implementação de formulários com Signal Forms e a configuração de rotas para navegação entre as telas.

Também foi implementada a comunicação HTTP com uma API local, utilizando o JSON Server para simular um backend e permitir a persistência dos dados durante a execução da aplicação.

O relatório apresenta as tecnologias utilizadas, as alterações na arquitetura, as funcionalidades implementadas, os procedimentos de execução e os testes realizados.

---

## 2. Tecnologias e configurações

Nesta etapa, foram utilizadas tecnologias e recursos do ecossistema Angular para estruturar a aplicação e implementar a comunicação com o backend.

### 2.1. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| **Angular 22** | Framework utilizado para estruturar a aplicação, componentes e rotas. |
| **TypeScript** | Linguagem utilizada na implementação da lógica e tipagem dos dados. |
| **Angular Signals** | Gerenciamento reativo do estado da aplicação. |
| **Signal Forms** | Criação e validação de formulários utilizando sinais. |
| **HttpClient** | Realização de requisições HTTP para a API. |
| **JSON Server** | Simulação de um backend REST para gerenciamento das tarefas. |
| **OptimusUI 2** | Biblioteca de componentes visuais. |
| **Tailwind CSS 4** | Estilização e organização visual da interface. |
| **PrimeIcons** | Biblioteca de ícones. |
| **Git e GitHub** | Controle de versão e gerenciamento do código-fonte. |

### 2.2. Instalação e configuração do JSON Server

Para permitir a comunicação entre o frontend e o backend, foi instalado o JSON Server na versão 0.17.4 como dependência de desenvolvimento.

Comando utilizado:

```bash
npm install -D json-server@0.17.4
```

Também foi criado o arquivo `db.json`, localizado na raiz do projeto, responsável por armazenar os dados utilizados pela API.

O arquivo contém a coleção `tarefas`, com os registros iniciais utilizados na aplicação.

Foi adicionado ao `package.json` o seguinte script:

```json
"api": "json-server --watch db.json --port 3000"
```

Dessa forma, o backend pode ser iniciado por meio do comando:

```bash
npm run api
```

A API disponibiliza os recursos de tarefas no endereço:

```text
http://localhost:3000/tarefas
```

### 2.3. Configuração do HttpClient e das rotas

O arquivo `src/app/app.config.ts` foi atualizado para disponibilizar os provedores necessários à aplicação.

Trecho da configuração:

```typescript
providers: [
  provideBrowserGlobalErrorListeners(),
  provideRouter(routes),
  provideHttpClient(),
  provideOptimus({ theme: { preset: Aura } }),
],
```

O `provideHttpClient()` disponibiliza o serviço responsável pelas requisições HTTP, enquanto o `provideRouter(routes)` registra as rotas de navegação.

---

## 3. Modelagem dos dados

O modelo de dados continua definido no arquivo `src/app/models/tarefa.ts`, por meio da interface `Tarefa`.

A estrutura foi mantida para representar as informações necessárias ao gerenciamento das atividades.

### 3.1. Interface `Tarefa`

```typescript
export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  prazo: string;
  concluida: boolean;
}
```

### 3.2. Descrição dos atributos

| Atributo | Tipo | Finalidade |
|---|---|---|
| `id` | `number` | Identifica cada tarefa. |
| `titulo` | `string` | Armazena o título da tarefa. |
| `descricao` | `string` | Armazena os detalhes da atividade. |
| `prioridade` | Tipo literal | Define a prioridade como baixa, média ou alta. |
| `prazo` | `string` | Armazena a data limite no formato ISO. |
| `concluida` | `boolean` | Indica se a tarefa foi concluída. |

A interface permite manter uma estrutura padronizada para os registros utilizados tanto no frontend quanto no backend.

---

## 4. Organização da aplicação em componentes

Uma das principais alterações desta etapa foi a reorganização da aplicação. A lógica que anteriormente estava concentrada no componente principal foi distribuída em componentes, páginas e serviços com responsabilidades específicas.

### 4.1. Componente principal

O arquivo `src/app/app.ts` foi simplificado para atuar como componente raiz da aplicação.

Sua responsabilidade passou a ser manter a estrutura geral da interface e disponibilizar a área de navegação por meio do `router-outlet`.

O cabeçalho da aplicação permanece no arquivo `src/app/app.html`, enquanto as páginas são carregadas conforme a rota acessada.

### 4.2. Componente de cartão de tarefa

Foi criado o componente `TarefaCard`, localizado em:

```text
src/app/components/tarefa-card/
```

Esse componente é responsável por apresentar individualmente as informações de uma tarefa, incluindo:

- Título e descrição.
- Prioridade.
- Prazo.
- Estado de conclusão.
- Botões para visualizar, editar, excluir e alterar o status.

O componente recebe os dados da tarefa por meio de `input.required<Tarefa>()` e comunica as ações realizadas pelo usuário utilizando `output<Tarefa>()`.

Exemplo:

```typescript
tarefa = input.required<Tarefa>();

visualizar = output<Tarefa>();
editar = output<Tarefa>();
excluir = output<Tarefa>();
alternarConclusao = output<Tarefa>();
```

Dessa forma, o cartão não precisa executar diretamente as operações de gerenciamento. Ele comunica os eventos ao componente responsável pela listagem.

### 4.3. Organização das páginas

Foram criadas três páginas principais:

| Página | Responsabilidade |
|---|---|
| `TarefasPage` | Apresenta a lista de tarefas e permite iniciar as operações de gerenciamento. |
| `TarefaDetalhePage` | Exibe as informações completas de uma tarefa selecionada. |
| `TarefaFormPage` | Disponibiliza o formulário utilizado para cadastrar e editar tarefas. |

Essa divisão facilita a manutenção do código e evita concentrar todas as funcionalidades em um único componente.

### 4.4. Comunicação entre componentes

A comunicação entre a página de listagem e os cartões de tarefa ocorre por meio dos recursos `input()` e `output()` do Angular.

A página envia os dados da tarefa para o componente de cartão, que emite eventos quando o usuário realiza alguma ação.

Esse mecanismo demonstra a comunicação entre componentes e permite separar a apresentação dos dados das operações executadas pela aplicação.

---

## 5. Angular Signals e gerenciamento de estado

Nesta etapa, foi implementado o gerenciamento reativo de estado utilizando Angular Signals.

Os sinais permitem armazenar valores e atualizar automaticamente os elementos da interface que dependem desses valores.

### 5.1. Signals no serviço de tarefas

No arquivo `src/app/services/tarefa.service.ts`, foram criados sinais para armazenar o estado compartilhado da aplicação.

Exemplo:

```typescript
readonly tarefas = signal<Tarefa[]>([]);
readonly carregando = signal(false);
readonly erro = signal<string | null>(null);
```

Esses sinais representam:

- `tarefas`: lista de tarefas carregadas da API.
- `carregando`: indica se uma operação de carregamento está em andamento.
- `erro`: armazena uma mensagem de erro, quando necessário.

### 5.2. Atualização reativa

O método `update()` permite atualizar o conteúdo de um sinal a partir do valor anterior.

Exemplo utilizado na exclusão de tarefas:

```typescript
this.tarefas.update(lista =>
  lista.filter(tarefa => tarefa.id !== id)
);
```

Nesse caso, é criada uma nova lista contendo apenas as tarefas cujo identificador é diferente daquele que foi excluído.

A utilização de Signals permite que os componentes que dependem da lista recebam as atualizações automaticamente.

### 5.3. Centralização do estado no serviço

O estado das tarefas foi centralizado no `TarefaService`, evitando que cada página mantenha uma lista independente.

Assim, as páginas utilizam o mesmo serviço para consultar e modificar os dados, mantendo a aplicação organizada e facilitando a comunicação entre suas partes.

---

## 6. Formulários, rotas e comunicação com o backend

### 6.1. Formulários com Signal Forms

O formulário de cadastro e edição foi implementado no componente `TarefaFormPage`, utilizando os recursos de Signal Forms disponibilizados pelo Angular.

A implementação utiliza:

```typescript
import {
  form,
  FormField,
  required,
  minLength,
} from '@angular/forms/signals';
```

O estado inicial dos campos é definido por meio de um sinal:

```typescript
readonly modelo = signal<TarefaFormModel>({
  titulo: '',
  descricao: '',
  prioridade: 'media',
  prazo: this.dataAtual(),
  concluida: false,
});
```

A validação é configurada com as regras `required` e `minLength`.

Foram definidas as seguintes condições:

- O título é obrigatório.
- O título deve possuir pelo menos três caracteres.
- A descrição é obrigatória.
- O prazo é obrigatório.

Durante os testes, foi possível verificar as mensagens de validação para o título vazio e para títulos com menos de três caracteres.

O mesmo formulário é utilizado para cadastrar uma nova tarefa e editar uma tarefa existente, identificando a operação por meio do parâmetro da rota.

### 6.2. Configuração das rotas

O arquivo `src/app/app.routes.ts` foi atualizado para definir os caminhos de navegação da aplicação.

As principais rotas são:

| Rota | Funcionalidade |
|---|---|
| `/` | Redireciona para a listagem de tarefas. |
| `/tarefas` | Exibe a lista de tarefas. |
| `/tarefas/nova` | Abre o formulário de cadastro. |
| `/tarefas/:id` | Exibe os detalhes de uma tarefa. |
| `/tarefas/:id/editar` | Abre o formulário de edição. |

A utilização do Angular Router permite navegar entre as páginas sem precisar concentrar todas as funcionalidades em uma única tela.

### 6.3. Serviço de comunicação com a API

O arquivo `src/app/services/tarefa.service.ts` centraliza as operações de comunicação com o backend.

O serviço utiliza `HttpClient` e `firstValueFrom()` para realizar as requisições HTTP.

As operações implementadas são:

| Operação | Método HTTP | Finalidade |
|---|---|---|
| Carregar tarefas | `GET` | Consulta a lista de tarefas. |
| Buscar por identificador | `GET` | Consulta uma tarefa específica. |
| Criar tarefa | `POST` | Cadastra uma nova tarefa. |
| Atualizar tarefa | `PUT` | Atualiza os dados de uma tarefa. |
| Excluir tarefa | `DELETE` | Remove uma tarefa. |

O serviço também trata situações de carregamento e erros, disponibilizando essas informações por meio dos Signals.

### 6.4. Implementação do CRUD

O CRUD foi adaptado para realizar as operações diretamente na API, substituindo o gerenciamento exclusivamente em memória utilizado na etapa anterior.

**Create — Criação**

O usuário acessa a rota `/tarefas/nova`, preenche o formulário e envia os dados. O serviço realiza uma requisição `POST` para cadastrar a tarefa.

**Read — Consulta**

A listagem utiliza uma requisição `GET` para carregar os registros disponíveis na API. Também é possível consultar uma tarefa individualmente por seu identificador.

**Update — Atualização**

Na edição, os dados da tarefa são carregados no formulário. Após as alterações, o serviço realiza uma requisição `PUT` para atualizar o registro correspondente.

Também foi mantida a funcionalidade de alterar o estado de conclusão da tarefa.

**Delete — Exclusão**

A exclusão utiliza uma requisição `DELETE`. Antes de remover o registro, a aplicação solicita a confirmação do usuário.

Após a operação, o estado compartilhado é atualizado para refletir a alteração na interface.

---

## 7. Execução e validação

Após a implementação, foram realizados testes para verificar a compilação, a comunicação com a API e o funcionamento das operações de gerenciamento de tarefas.

### 7.1. Execução do backend

Na pasta raiz do projeto, o backend pode ser iniciado com:

```bash
npm run api
```

O JSON Server disponibiliza a API na porta 3000.

Para verificar a resposta do backend, foi utilizado:

```bash
curl http://localhost:3000/tarefas
```

### 7.2. Execução do frontend

Em outro terminal, a aplicação Angular pode ser iniciada com:

```bash
npm start
```

O frontend é disponibilizado pelo servidor de desenvolvimento do Angular, normalmente na porta 4200.

É necessário manter os dois processos em execução para que a aplicação consiga consultar e modificar os dados da API local.

### 7.3. Testes funcionais realizados

Durante a validação manual, foram realizadas as seguintes operações:

| Funcionalidade | Resultado |
|---|---|
| Carregamento da lista de tarefas pela API | Funcionou conforme esperado. |
| Abertura da tela de cadastro | Funcionou conforme esperado. |
| Validação de título obrigatório | Funcionou conforme esperado. |
| Validação de título com menos de três caracteres | Funcionou conforme esperado. |
| Cadastro de uma nova tarefa | Funcionou conforme esperado. |
| Consulta dos detalhes de uma tarefa | Funcionou conforme esperado. |
| Edição de uma tarefa existente | Funcionou conforme esperado. |
| Exclusão de uma tarefa | Funcionou conforme esperado. |
| Atualização do status de conclusão | Implementada na aplicação. |

Durante o teste de cadastro e edição, foi criada uma tarefa de teste chamada `Testar Signal Forms`. Em seguida, seu título foi alterado para `Testar Signal Forms - Editado`.

A consulta à API confirmou a atualização do mesmo registro, sem criação de uma tarefa duplicada. Posteriormente, a tarefa de teste foi excluída, e uma nova consulta confirmou que os registros iniciais permaneciam disponíveis.

### 7.4. Compilação do projeto

A compilação foi realizada utilizando:

```bash
npm run build
```

O Angular concluiu a geração dos arquivos da aplicação sem erros.

O resultado apresentou um aviso de orçamento (*bundle budget*), pois o pacote inicial atingiu 515,36 kB, ultrapassando em 15,36 kB o limite configurado de 500 kB.

Esse aviso não impediu a compilação, que foi concluída com sucesso.

### 7.5. Controle de versão

As alterações foram organizadas na branch:

```text
feat/angular-signals-services-api
```

Foi realizado um commit para registrar a implementação:

```text
c5326d5
:sparkles:feat: implementa CRUD de tarefas com Angular Signals e API
```

O commit registrou 22 arquivos alterados, incluindo os novos componentes, páginas, serviço de tarefas e arquivo de dados do JSON Server.

---

## 8. Conclusão

O desenvolvimento desta etapa permitiu evoluir a aplicação Agora Pronto, aplicando recursos mais avançados do Angular e aprimorando sua organização interna.

A implementação de componentes menores possibilitou separar as responsabilidades da interface, enquanto o uso de Angular Signals permitiu centralizar e atualizar o estado da aplicação de maneira reativa.

Também foram utilizados Signal Forms para construção e validação dos formulários, Angular Router para navegação entre as telas e HttpClient para comunicação com o backend.

A integração com o JSON Server permitiu implementar e testar as operações de criação, consulta, atualização e exclusão de tarefas por meio de requisições HTTP.

Com isso, a aplicação passou de um gerenciamento local em memória para uma estrutura organizada em frontend e backend, atendendo aos principais requisitos propostos para esta etapa da disciplina de Aplicações com Interfaces Ricas.

A autenticação JWT não foi implementada, pois estava prevista como funcionalidade opcional na atividade.
