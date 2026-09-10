import { renderHook } from '@testing-library/react';

import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import type { Tarefa } from '@/lib/tarefas';

function criarTarefas(quantidade: number): Tarefa[] {
  return Array.from({ length: quantidade }, (_, indice) => ({
    id: `tarefa-${indice + 1}`,
    titulo: `Tarefa ${indice + 1}`,
    concluida: false,
  }));
}

describe('useContadorDeTarefas', () => {
  it('retorna 0 para uma lista vazia', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));

    expect(result.current).toBe(0);
  });

  it('retorna a quantidade de tarefas da lista informada', () => {
    const tarefas = criarTarefas(3);
    const { result } = renderHook(() => useContadorDeTarefas(tarefas));

    expect(result.current).toBe(3);
  });

  it('atualiza o valor quando a lista cresce entre renderizacoes', () => {
    const { result, rerender } = renderHook(
      ({ tarefas }: { tarefas: Tarefa[] }) => useContadorDeTarefas(tarefas),
      { initialProps: { tarefas: criarTarefas(2) } },
    );

    expect(result.current).toBe(2);

    rerender({ tarefas: criarTarefas(5) });

    expect(result.current).toBe(5);
  });
});
