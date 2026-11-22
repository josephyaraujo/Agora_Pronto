
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { TarefaCard } from '../../components/tarefa-card/tarefa-card';

@Component({
  selector: 'app-tarefas',
  imports: [TarefaCard],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css',
})
export class TarefasPage implements OnInit {
  readonly tarefaService = inject(TarefaService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    void this.tarefaService.carregarTarefas();
  }

  novaTarefa(): void {
    void this.router.navigate(['/tarefas/nova']);
  }

  visualizarTarefa(tarefa: Tarefa): void {
    void this.router.navigate(['/tarefas', tarefa.id]);
  }

  editarTarefa(tarefa: Tarefa): void {
    void this.router.navigate(['/tarefas', tarefa.id, 'editar']);
  }

  async excluirTarefa(tarefa: Tarefa): Promise<void> {
    const confirmar = window.confirm(
      `Deseja realmente excluir "${tarefa.titulo}"?`
    );

    if (confirmar) {
      await this.tarefaService.excluirTarefa(tarefa.id);
    }
  }

  async alternarConclusao(tarefa: Tarefa): Promise<void> {
    await this.tarefaService.atualizarTarefa({
      ...tarefa,
      concluida: !tarefa.concluida,
    });
  }
}
