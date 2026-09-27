import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from '@openng/optimus-ui/dialog';

import { Tarefa } from './models/tarefa';

@Component({
  imports: [RouterOutlet, FormsModule, DatePipe, DialogModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Estudar Angular',
      descricao: 'Revisar componentes, diretivas e data binding.',
      prioridade: 'alta',
      prazo: new Date('2026-10-01'),
      concluida: false,
    },
    {
      id: 2,
      titulo: 'Fazer atividade de AIR',
      descricao: 'Implementar o CRUD do projeto Agora Pronto.',
      prioridade: 'alta',
      prazo: new Date('2026-10-05'),
      concluida: false,
    },
    {
      id: 3,
      titulo: 'Revisar identidade visual',
      descricao: 'Conferir cores, tipografia e espaçamentos da aplicação.',
      prioridade: 'media',
      prazo: new Date('2026-10-10'),
      concluida: true,
    },
  ];

  tarefaSelecionada: Tarefa | null = null;

  tarefaEmEdicao: Tarefa | null = null;

  modalVisivel = false;

  selecionarTarefa(tarefa: Tarefa): void {
    this.tarefaEmEdicao = null;
    this.tarefaSelecionada = tarefa;
    this.modalVisivel = true;
  }

  novaTarefa(): void {
    this.tarefaSelecionada = null;

    this.tarefaEmEdicao = {
      id: 0,
      titulo: '',
      descricao: '',
      prioridade: 'media',
      prazo: new Date(),
      concluida: false,
    };

    this.modalVisivel = true;
  }

  editarTarefa(tarefa: Tarefa): void {
    this.tarefaSelecionada = null;

    this.tarefaEmEdicao = {
      ...tarefa,
    };

    this.modalVisivel = true;
  }

  salvarTarefa(): void {
    if (!this.tarefaEmEdicao) {
      return;
    }

    if (this.tarefaEmEdicao.id === 0) {
      const novoId = this.tarefas.length > 0
        ? Math.max(...this.tarefas.map(tarefa => tarefa.id)) + 1
        : 1;

      this.tarefas.push({
        ...this.tarefaEmEdicao,
        id: novoId,
      });
    } else {
      const indice = this.tarefas.findIndex(
        tarefa => tarefa.id === this.tarefaEmEdicao!.id
      );

      if (indice !== -1) {
        this.tarefas[indice] = {
          ...this.tarefaEmEdicao,
        };
      }
    }

    this.fecharModal();
  }

  removerTarefa(tarefa: Tarefa): void {
    this.tarefas = this.tarefas.filter(
      item => item.id !== tarefa.id
    );

    if (this.tarefaSelecionada?.id === tarefa.id) {
      this.tarefaSelecionada = null;
    }

    if (this.tarefaEmEdicao?.id === tarefa.id) {
      this.tarefaEmEdicao = null;
    }
  }

  cancelarEdicao(): void {
    this.fecharModal();
  }

  alternarConclusao(tarefa: Tarefa): void {
    tarefa.concluida = !tarefa.concluida;
  }

  formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  atualizarPrazo(valor: string): void {
    if (this.tarefaEmEdicao && valor) {
      this.tarefaEmEdicao.prazo = new Date(`${valor}T00:00:00`);
    }
  }
  
  fecharModal(): void {
    this.modalVisivel = false;
    this.tarefaSelecionada = null;
    this.tarefaEmEdicao = null;
  }
}