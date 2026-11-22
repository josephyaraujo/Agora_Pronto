import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  form,
  FormField,
  required,
  minLength,
} from '@angular/forms/signals';

import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

interface TarefaFormModel {
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  prazo: string;
  concluida: boolean;
}

@Component({
  selector: 'app-tarefa-form',
  imports: [FormField, RouterLink],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css',
})
export class TarefaFormPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tarefaService = inject(TarefaService);

  readonly editando = signal(false);
  readonly carregando = signal(false);
  readonly erro = signal<string | null>(null);

  readonly modelo = signal<TarefaFormModel>({
    titulo: '',
    descricao: '',
    prioridade: 'media',
    prazo: this.dataAtual(),
    concluida: false,
  });

  readonly tarefaForm = form(this.modelo, (path) => {
    required(path.titulo, {
      message: 'O título é obrigatório.',
    });
    minLength(path.titulo, 3, {
      message: 'O título deve ter pelo menos 3 caracteres.',
    });
    required(path.descricao, {
      message: 'A descrição é obrigatória.',
    });
    required(path.prazo, {
      message: 'O prazo é obrigatório.',
    });
  });

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editando.set(true);
      this.carregando.set(true);

      const tarefa = await this.tarefaService.buscarPorId(Number(id));

      if (!tarefa) {
        this.erro.set('Não foi possível encontrar a tarefa.');
      } else {
        this.modelo.set({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao,
          prioridade: tarefa.prioridade,
          prazo: tarefa.prazo,
          concluida: tarefa.concluida,
        });
      }

      this.carregando.set(false);
    }
  }

  async salvar(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.tarefaForm().valid()) {
      return;
    }

    this.carregando.set(true);
    this.erro.set(null);

    try {
      const dados = this.modelo();

      if (this.editando()) {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        const tarefaAtualizada: Tarefa = {
          id,
          ...dados,
        };

        await this.tarefaService.atualizarTarefa(tarefaAtualizada);
      } else {
        await this.tarefaService.criarTarefa(dados);
      }

      await this.router.navigate(['/tarefas']);
    } catch {
      this.erro.set('Não foi possível salvar a tarefa. Tente novamente.');
    } finally {
      this.carregando.set(false);
    }
  }

  private dataAtual(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}