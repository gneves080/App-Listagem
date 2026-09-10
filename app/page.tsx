import GerenciadorDeTarefas from '@/components/GerenciadorDeTarefas';
import { listarTarefas } from '@/lib/tarefas';

/**
 * Server Component: carrega a lista inicial de tarefas no servidor
 * e delega a interatividade (adicionar tarefas / contador) para o
 * Client Component <GerenciadorDeTarefas />.
 */
export default async function PaginaInicial() {
  const tarefas = await listarTarefas();

  return (
    <main className="pagina">
      <header className="pagina__cabecalho">
        <h1 className="pagina__titulo">Lista de Tarefas</h1>
        <p className="pagina__subtitulo">Organize o seu dia, uma tarefa por vez.</p>
      </header>

      <GerenciadorDeTarefas tarefasIniciais={tarefas} />
    </main>
  );
}
