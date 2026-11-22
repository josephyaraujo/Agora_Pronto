
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-detalhe',
  imports: [DatePipe, RouterLink],
  templateUrl: './tarefa-detalhe.html',
  styleUrl: './tarefa-detalhe.css',
})
export class TarefaDetalhePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tarefaService = inject(TarefaService);

  readonly tarefa = signal<Tarefa | null>(null);
  readonly carregando = signal(true);
  readonly erro = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.erro.set('Identificador de tarefa inválido.');
      this.carregando.set(false);
      return;
    }

    const resultado = await this.tarefaService.buscarPorId(id);

    if (resultado) {
      this.tarefa.set(resultado);
    } else {
      this.erro.set('Não foi possível encontrar essa tarefa.');
    }

    this.carregando.set(false);
  }
}
