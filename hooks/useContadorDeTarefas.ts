import { useMemo } from 'react';

import type { Tarefa } from '@/lib/tarefas';

/**
 * Retorna o numero atual de tarefas da lista informada.
 * Isolado em um hook para poder ser testado de forma independente com renderHook.
 */
export function useContadorDeTarefas(tarefas: Tarefa[]): number {
  return useMemo(() => tarefas.length, [tarefas]);
}
