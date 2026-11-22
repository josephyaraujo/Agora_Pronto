import { Routes } from '@angular/router';

import { TarefasPage } from './pages/tarefas/tarefas';
import { TarefaDetalhePage } from './pages/tarefa-detalhe/tarefa-detalhe';
import { TarefaFormPage } from './pages/tarefa-form/tarefa-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tarefas',
    pathMatch: 'full',
  },
  {
    path: 'tarefas',
    component: TarefasPage,
  },
  {
    path: 'tarefas/nova',
    component: TarefaFormPage,
  },
  {
    path: 'tarefas/:id/editar',
    component: TarefaFormPage,
  },
  {
    path: 'tarefas/:id',
    component: TarefaDetalhePage,
  },
];
