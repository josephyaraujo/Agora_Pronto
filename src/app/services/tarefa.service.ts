
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/tarefas';

  // Estado compartilhado da aplicação
  readonly tarefas = signal<Tarefa[]>([]);
  readonly carregando = signal(false);
  readonly erro = signal<string | null>(null);

  async carregarTarefas(): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const tarefas = await firstValueFrom(
        this.http.get<Tarefa[]>(this.apiUrl)
      );

      this.tarefas.set(tarefas);
    } catch {
      this.erro.set('Não foi possível carregar as tarefas.');
    } finally {
      this.carregando.set(false);
    }
  }

  async buscarPorId(id: number): Promise<Tarefa | undefined> {
    try {
      return await firstValueFrom(
        this.http.get<Tarefa>(`${this.apiUrl}/${id}`)
      );
    } catch {
      this.erro.set('Não foi possível encontrar a tarefa.');
      return undefined;
    }
  }

  async criarTarefa(tarefa: Omit<Tarefa, 'id'>): Promise<void> {
    try {
      this.erro.set(null);

      const novaTarefa = await firstValueFrom(
        this.http.post<Tarefa>(this.apiUrl, tarefa)
      );

      this.tarefas.update(lista => [...lista, novaTarefa]);
    } catch {
      this.erro.set('Não foi possível cadastrar a tarefa.');
      throw new Error('Falha ao cadastrar tarefa.');
    }
  }

  async atualizarTarefa(tarefa: Tarefa): Promise<void> {
    try {
      this.erro.set(null);

      const tarefaAtualizada = await firstValueFrom(
        this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa)
      );

      this.tarefas.update(lista =>
        lista.map(item =>
          item.id === tarefaAtualizada.id ? tarefaAtualizada : item
        )
      );
    } catch {
      this.erro.set('Não foi possível atualizar a tarefa.');
      throw new Error('Falha ao atualizar tarefa.');
    }
  }

  async excluirTarefa(id: number): Promise<void> {
    try {
      this.erro.set(null);

      await firstValueFrom(
        this.http.delete<void>(`${this.apiUrl}/${id}`)
      );

      this.tarefas.update(lista =>
        lista.filter(tarefa => tarefa.id !== id)
      );
    } catch {
      this.erro.set('Não foi possível excluir a tarefa.');
      throw new Error('Falha ao excluir tarefa.');
    }
  }
}
