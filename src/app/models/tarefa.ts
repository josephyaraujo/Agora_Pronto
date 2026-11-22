export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  prazo: string;
  concluida: boolean;
}