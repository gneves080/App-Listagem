import type { Tarefa } from '@/lib/tarefas';

type ListaDeTarefasProps = {
  tarefas: Tarefa[];
};

export default function ListaDeTarefas({ tarefas }: ListaDeTarefasProps) {
  if (tarefas.length === 0) {
    return <p className="lista-tarefas__vazia">Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <ul className="lista-tarefas" aria-label="Lista de tarefas">
      {tarefas.map((tarefa) => (
        <li
          key={tarefa.id}
          className={tarefa.concluida ? 'lista-tarefas__item lista-tarefas__item--concluida' : 'lista-tarefas__item'}
        >
          <span className="lista-tarefas__status" aria-hidden="true">
            {tarefa.concluida ? '✓' : '○'}
          </span>
          <span className="lista-tarefas__titulo">{tarefa.titulo}</span>
        </li>
      ))}
    </ul>
  );
}
