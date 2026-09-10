export type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
};

/**
 * "Banco de dados" simulado em memoria.
 * Representa o que uma API real retornaria na primeira carga da pagina.
 */
export const tarefasIniciais: Tarefa[] = [
  { id: 'tarefa-1', titulo: 'Estudar Next.js 15 com App Router', concluida: true },
  { id: 'tarefa-2', titulo: 'Criar o hook useContadorDeTarefas', concluida: false },
  { id: 'tarefa-3', titulo: 'Escrever os testes com Jest e Testing Library', concluida: false },
];

let contadorDeIds = tarefasIniciais.length;

/** Gera um identificador unico e previsivel para novas tarefas. */
export function gerarIdDeTarefa(): string {
  contadorDeIds += 1;
  return `tarefa-${contadorDeIds}`;
}

/**
 * Simula uma chamada de API que busca a lista de tarefas.
 * Usa Promise.resolve() para manter o mesmo contrato assincrono de um fetch real.
 */
export async function listarTarefas(): Promise<Tarefa[]> {
  return Promise.resolve(tarefasIniciais);
}
