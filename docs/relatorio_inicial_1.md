
# Relatório Técnico Inicial — Aplicação Agora Pronto - Etapa 1

---

## 1. Introdução

Este relatório apresenta o processo de desenvolvimento da aplicação **Agora Pronto**, criada como parte das atividades práticas da disciplina de Aplicações com Interfaces Ricas (AIR), do curso de Análise e Desenvolvimento de Sistemas.

O projeto consiste em uma aplicação web para gerenciamento de tarefas, permitindo ao usuário cadastrar, consultar, editar, excluir e acompanhar o status de conclusão de suas atividades.

O desenvolvimento teve como objetivo aplicar os conceitos de construção de interfaces com Angular e TypeScript, utilizando a biblioteca OptimusUI para componentes visuais e o Tailwind CSS para a estilização da interface.

Além da implementação das funcionalidades, o projeto contempla a utilização de Data Binding, eventos, diretivas de controle de fluxo e modelagem de dados.

O relatório apresenta as tecnologias utilizadas, a estrutura do projeto, a implementação das funcionalidades, os procedimentos de execução e validação e a relação entre os requisitos solicitados e os elementos desenvolvidos.

---

## 2. Tecnologias e configurações

Nesta etapa, foram utilizadas tecnologias e bibliotecas voltadas ao desenvolvimento de aplicações web com interfaces interativas.

### 2.1. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| **Angular 22** | Framework utilizado para estruturar a aplicação e gerenciar seus componentes. |
| **TypeScript** | Linguagem utilizada para implementar a lógica e definir os tipos de dados. |
| **OptimusUI 2** | Biblioteca de componentes visuais utilizada na interface. |
| **Tailwind CSS 4** | Framework de estilização utilizado para personalizar o layout. |
| **PrimeIcons** | Biblioteca de ícones utilizada nos botões e elementos visuais. |
| **Git e GitHub** | Controle de versão e gerenciamento do repositório do projeto. |

### 2.2. Configuração das dependências

As dependências do projeto foram declaradas no arquivo `package.json`, enquanto o arquivo `package-lock.json` registra as versões resolvidas durante a instalação.

Entre as principais dependências utilizadas estão:

```json
"@angular/core": "^22.2.0",
"@openng/optimus-ui": "^2.0.2",
"@openng/optimus-ui-themes": "^2.0.2",
"tailwindcss": "^4.1.12"
```

### 2.3. Configuração do OptimusUI

O arquivo `src/app/app.config.ts` centraliza a configuração dos provedores da aplicação e a inicialização do tema visual.

Trecho de configuração:

```typescript
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideOptimus({ theme: { preset: Aura } }),
  ],
};
```

A configuração utiliza o preset **Aura** para definir o tema dos componentes da biblioteca OptimusUI.

### 2.4. Configuração do Tailwind CSS

O arquivo `postcssrc.json` configura o plugin do Tailwind CSS 4:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Já o arquivo `src/styles.css` reúne os estilos globais, a importação do Tailwind CSS, os ícones e as personalizações visuais da aplicação.

---

## 3. Modelagem dos dados

Para representar as tarefas cadastradas na aplicação, foi criado o modelo `Tarefa`, localizado no arquivo `src/app/models/tarefa.ts`.

O modelo foi definido por meio de uma interface TypeScript, responsável por estabelecer os atributos e os tipos de dados de cada tarefa.

### 3.1. Interface `Tarefa`

```typescript
export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  prazo: Date;
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
| `prazo` | `Date` | Representa a data limite para conclusão. |
| `concluida` | `boolean` | Indica se a tarefa foi concluída. |

A utilização dessa interface permite manter uma estrutura padronizada para as tarefas e demonstra o uso de diferentes tipos de dados, incluindo texto, número, data e valor booleano.

---

## 4. Desenvolvimento da interface

A interface da aplicação foi organizada em arquivos que separam a lógica, a estrutura visual e a estilização.

### 4.1. Organização dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `src/app/app.ts` | Contém a lógica da aplicação e os métodos de gerenciamento das tarefas. |
| `src/app/app.html` | Define a estrutura HTML e os elementos interativos da interface. |
| `src/app/app.css` | Contém os estilos específicos do componente principal. |
| `src/styles.css` | Centraliza os estilos globais, as configurações visuais e a importação do Tailwind CSS. |
| `src/app/models/tarefa.ts` | Define a estrutura de dados das tarefas. |
| `src/app/app.config.ts` | Configura os provedores e o tema da aplicação. |

### 4.2. Organização visual

A interface foi desenvolvida com foco na organização das tarefas e na facilidade de interação.

Os principais elementos visuais são:

- Cabeçalho com o nome da aplicação e uma breve apresentação.
- Área de listagem das tarefas cadastradas.
- Identificação visual da prioridade e do status de conclusão.
- Botões para visualizar, editar, concluir e excluir tarefas.
- Botão para adicionar uma nova tarefa.
- Janela modal para cadastro, edição e visualização de detalhes.

O projeto utiliza classes do Tailwind CSS para ajustar espaçamentos, cores, dimensões e disposição dos elementos. O OptimusUI é utilizado no componente de diálogo, enquanto o PrimeIcons fornece os ícones das ações.


---

## 5. Data Binding e diretivas do Angular

A aplicação utiliza mecanismos do Angular para conectar os dados definidos no componente TypeScript aos elementos visuais do template.

### 5.1. Interpolação

A interpolação é utilizada para exibir informações dinâmicas na interface.

Exemplo:

```html
{{ tarefa.titulo }}
```

Nesse caso, o título da tarefa é exibido diretamente no elemento HTML.

Outro exemplo é a apresentação da quantidade de tarefas cadastradas:

```html
{{ tarefas.length }}
```

### 5.2. Property Binding

O Property Binding permite associar uma propriedade do elemento HTML a uma expressão do componente.

Exemplo:

```html
[disabled]="formTarefa.invalid"
```

Esse vínculo desabilita o botão de envio enquanto o formulário estiver inválido, contribuindo para a validação dos dados antes do salvamento.

### 5.3. Event Binding

O Event Binding conecta eventos da interface aos métodos definidos no componente.

Exemplo:

```html
(click)="novaTarefa()"
```

Ao clicar no botão correspondente, o método `novaTarefa()` é executado e abre o formulário de cadastro.

Outros eventos utilizados incluem os cliques para editar, excluir e alterar o status de conclusão.

### 5.4. Two-Way Data Binding

O Two-Way Data Binding é utilizado com `[(ngModel)]`, permitindo sincronizar o valor de um campo do formulário com uma propriedade do componente.

Exemplo:

```html
[(ngModel)]="tarefaEmEdicao.titulo"
```

Dessa forma, o título digitado pelo usuário é associado ao objeto que está sendo editado.

### 5.5. Diretivas de controle de fluxo

A aplicação utiliza as estruturas de controle de fluxo do Angular para exibir conteúdos de acordo com as condições e percorrer a lista de tarefas.

#### Diretiva `@if`

Utilizada para verificar se existem tarefas cadastradas e exibir a listagem ou uma mensagem de estado vazio.

#### Diretiva `@for`

Utilizada para percorrer a lista de tarefas e gerar um cartão visual para cada item.

Exemplo:

```html
@for (tarefa of tarefas; track tarefa.id) {
  <!-- Conteúdo de cada tarefa -->
}
```

A expressão `track tarefa.id` permite identificar cada item pelo seu identificador.

### 5.6. Formulários e validação

O formulário utiliza `ngForm` e `ngModel` para acompanhar os dados e o estado de validação.

Campos obrigatórios são marcados com `required`, e o botão de envio permanece desabilitado quando o formulário está inválido.

---

## 6. Implementação do CRUD

O gerenciamento das tarefas foi implementado no arquivo `src/app/app.ts`, por meio de métodos responsáveis pelas operações de criação, consulta, atualização e exclusão.

Os dados são armazenados em memória, por meio de uma lista de objetos do tipo `Tarefa`, sem utilização de banco de dados.

### 6.1. Create — Criação de tarefas

O método `novaTarefa()` prepara um objeto com os valores iniciais do formulário e abre a janela modal.

Após o preenchimento, o método `salvarTarefa()` verifica se a tarefa é nova. Caso seja, atribui um identificador e adiciona o objeto à lista.

### 6.2. Read — Consulta de tarefas

A consulta é realizada por meio da exibição da lista de tarefas na interface.

O método `selecionarTarefa()` permite selecionar uma tarefa para visualizar seus detalhes em uma janela modal.

### 6.3. Update — Atualização de tarefas

O método `editarTarefa()` prepara uma cópia da tarefa selecionada para edição.

Após as alterações, o método `salvarTarefa()` localiza o item correspondente pelo identificador e atualiza os dados na lista.

Também foi implementado o método `alternarConclusao()`, que modifica o status de conclusão de uma tarefa.

### 6.4. Delete — Exclusão de tarefas

O método `removerTarefa()` utiliza o identificador da tarefa para removê-la da lista.

Após a exclusão, a interface é atualizada para refletir a alteração.

---

## 7. Execução e validação

Após a implementação, a aplicação foi executada para verificar o funcionamento da interface e das operações de gerenciamento de tarefas.

### 7.1. Execução da aplicação

O projeto pode ser iniciado a partir do terminal, na pasta raiz do repositório, utilizando o comando:

```bash
npm start
```

Caso o script de inicialização não esteja configurado, pode-se utilizar:

```bash
ng serve
```

A aplicação é disponibilizada localmente pelo servidor de desenvolvimento do Angular.

### 7.2. Validação funcional

Durante a validação manual, foram realizadas as seguintes operações:

| Funcionalidade | Resultado |
|---|---|
| Exibição da lista inicial | Funcionou conforme esperado. |
| Cadastro de tarefa | Funcionou conforme esperado. |
| Consulta dos detalhes | Funcionou conforme esperado. |
| Edição de tarefa | Funcionou conforme esperado. |
| Exclusão de tarefa | Funcionou conforme esperado. |
| Alteração do status de conclusão | Funcionou conforme esperado. |

Os testes manuais permitiram verificar o funcionamento das principais operações implementadas na aplicação.

### 7.3. Compilação

A compilação do projeto foi executada com sucesso.

---

## 8. Conclusão

O desenvolvimento da aplicação **Agora Pronto** permitiu aplicar, na prática, os conceitos abordados na disciplina de Aplicações com Interfaces Ricas.

Durante a implementação, foram utilizados Angular e TypeScript para estruturar a aplicação, definir o modelo de dados e implementar as funcionalidades de gerenciamento de tarefas. A interface foi construída com o apoio do OptimusUI, do Tailwind CSS e do PrimeIcons.

As operações de criação, consulta, edição e exclusão foram implementadas e testadas manualmente, assim como a alteração do status de conclusão das tarefas.

Também foram aplicados conceitos de Data Binding, eventos, formulários e diretivas de controle de fluxo do Angular.

Por fim, conclui-se que a aplicação atende aos principais objetivos propostos para essa etapa inicial de desenvolvimento, demonstrando a construção de uma interface interativa e a implementação das funcionalidades solicitadas.
