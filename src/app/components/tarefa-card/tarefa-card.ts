import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-card',
  imports: [DatePipe],
  templateUrl: './tarefa-card.html',
  styleUrl: './tarefa-card.css',
})
export class TarefaCard {
  tarefa = input.required<Tarefa>();

  visualizar = output<Tarefa>();
  editar = output<Tarefa>();
  excluir = output<Tarefa>();
  alternarConclusao = output<Tarefa>();
}
