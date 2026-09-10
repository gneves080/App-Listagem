import { fireEvent, render, screen, within } from '@testing-library/react';

import PaginaInicial from '@/app/page';
import { tarefasIniciais } from '@/lib/tarefas';

describe('app/page (Server Component)', () => {
  it('renderiza o cabecalho e a lista de tarefas vinda do servidor', async () => {
    const pagina = await PaginaInicial();
    render(pagina);

    expect(screen.getByRole('heading', { level: 1, name: /lista de tarefas/i })).toBeInTheDocument();

    const lista = screen.getByRole('list', { name: /lista de tarefas/i });
    const itens = within(lista).getAllByRole('listitem');

    expect(itens).toHaveLength(tarefasIniciais.length);
    expect(screen.getByText('Estudar Next.js 15 com App Router')).toBeInTheDocument();
    expect(screen.getByText('Criar o hook useContadorDeTarefas')).toBeInTheDocument();
  });

  it('mostra o total inicial de tarefas', async () => {
    const pagina = await PaginaInicial();
    render(pagina);

    expect(screen.getByText(/total de tarefas:/i)).toHaveTextContent(
      String(tarefasIniciais.length),
    );
  });

  it('adiciona uma nova tarefa e atualiza lista e contador', async () => {
    const pagina = await PaginaInicial();
    render(pagina);

    const totalEsperado = String(tarefasIniciais.length + 1);

    fireEvent.change(screen.getByLabelText(/nova tarefa/i), {
      target: { value: 'Escrever o README do projeto' },
    });
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(screen.getByText('Escrever o README do projeto')).toBeInTheDocument();

    const lista = screen.getByRole('list', { name: /lista de tarefas/i });
    expect(within(lista).getAllByRole('listitem')).toHaveLength(tarefasIniciais.length + 1);
    expect(screen.getByText(/total de tarefas:/i)).toHaveTextContent(totalEsperado);
  });
});
