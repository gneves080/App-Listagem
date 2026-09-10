'use client';

import { useState } from 'react';

import ListaDeTarefas from '@/components/ListaDeTarefas';
import NovaTarefa from '@/components/NovaTarefa';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import { gerarIdDeTarefa, type Tarefa } from '@/lib/tarefas';

type GerenciadorDeTarefasProps = {
  /** Lista inicial carregada no servidor (Server Component). */
  tarefasIniciais: Tarefa[];
};

export default function GerenciadorDeTarefas({ tarefasIniciais }: GerenciadorDeTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const quantidadeDeTarefas = useContadorDeTarefas(tarefas);

  function adicionarTarefa(titulo: string) {
    setTarefas((tarefasAtuais) => [
      ...tarefasAtuais,
      { id: gerarIdDeTarefa(), titulo, concluida: false },
    ]);
  }

  return (
    <section className="painel">
      <NovaTarefa aoAdicionar={adicionarTarefa} />

      <p className="painel__contador" aria-live="polite">
        Total de tarefas: <strong>{quantidadeDeTarefas}</strong>
      </p>

      <ListaDeTarefas tarefas={tarefas} />
    </section>
  );
}
