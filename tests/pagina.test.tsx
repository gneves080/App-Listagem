import { fireEvent, render, screen, within } from '@testing-library/react';

import PaginaInicial from '@/app/page';
import { tarefasIniciais } from '@/lib/tarefas';

function obterCampoTitulo(): HTMLInputElement {
  return screen.getByRole('textbox', { name: /^nova tarefa$/i }) as HTMLInputElement;
}

function obterBotaoAdicionar(): HTMLButtonElement {
  return screen.getByRole('button', { name: /^adicionar$/i }) as HTMLButtonElement;
}

function obterLista(): HTMLElement {
  return screen.getByRole('list', { name: /^lista de tarefas$/i });
}

describe('app/page (Server Component)', () => {
  it('renderiza o cabecalho e a lista de tarefas vinda do servidor', async () => {
    const pagina = await PaginaInicial();
    render(pagina);

    expect(
      screen.getByRole('heading', { level: 1, name: /^lista de tarefas$/i }),
    ).toBeInTheDocument();

    const itens = within(obterLista()).getAllByRole('listitem');

    expect(itens).toHaveLength(tarefasIniciais.length);
    expect(screen.getByText('Estudar Next.js 15 com App Router')).toBeInTheDocument();
    expect(screen.getByText('Criar o hook useContadorDeTarefas')).toBeInTheDocument();
  });

  it('mostra o total inicial de tarefas', async () => {
    const pagina = await PaginaInicial();
    render(pagina);

    expect(screen.getByText(/^total de tarefas:/i)).toHaveTextContent(
      String(tarefasIniciais.length),
    );
  });

  it('adiciona uma nova tarefa e atualiza lista e contador', async () => {
    const pagina = await PaginaInicial();
    render(pagina);

    const totalEsperado = String(tarefasIniciais.length + 1);

    fireEvent.change(obterCampoTitulo(), {
      target: { value: 'Escrever o README do projeto' },
    });
    fireEvent.click(obterBotaoAdicionar());

    expect(screen.getByText('Escrever o README do projeto')).toBeInTheDocument();

    expect(within(obterLista()).getAllByRole('listitem')).toHaveLength(tarefasIniciais.length + 1);
    expect(screen.getByText(/^total de tarefas:/i)).toHaveTextContent(totalEsperado);
  });
});
