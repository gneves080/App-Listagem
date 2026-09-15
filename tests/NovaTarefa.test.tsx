import { fireEvent, render, screen } from '@testing-library/react';

import NovaTarefa from '@/components/NovaTarefa';

function obterCampoTitulo(): HTMLInputElement {
  return screen.getByRole('textbox', { name: /^nova tarefa$/i }) as HTMLInputElement;
}

function obterBotaoAdicionar(): HTMLButtonElement {
  return screen.getByRole('button', { name: /^adicionar$/i }) as HTMLButtonElement;
}

describe('<NovaTarefa />', () => {
  it('renderiza o label, o input e o botao de adicionar', () => {
    render(<NovaTarefa aoAdicionar={jest.fn()} />);

    expect(screen.getByLabelText(/^nova tarefa$/i)).toBeInTheDocument();
    expect(obterCampoTitulo()).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^digite o titulo da tarefa$/i)).toBeInTheDocument();
    expect(obterBotaoAdicionar()).toBeInTheDocument();
  });

  it('nao chama aoAdicionar e exibe erro quando o input esta vazio', () => {
    const aoAdicionar = jest.fn();
    render(<NovaTarefa aoAdicionar={aoAdicionar} />);

    fireEvent.click(obterBotaoAdicionar());

    expect(aoAdicionar).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/^informe o titulo da tarefa\.$/i);
  });

  it('nao chama aoAdicionar quando o input contem apenas espacos', () => {
    const aoAdicionar = jest.fn();
    render(<NovaTarefa aoAdicionar={aoAdicionar} />);

    fireEvent.change(obterCampoTitulo(), { target: { value: '   ' } });
    fireEvent.click(obterBotaoAdicionar());

    expect(aoAdicionar).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('envia o titulo normalizado e limpa o input ao submeter', () => {
    const aoAdicionar = jest.fn();
    render(<NovaTarefa aoAdicionar={aoAdicionar} />);

    const input = obterCampoTitulo();
    fireEvent.change(input, { target: { value: '  Comprar cafe  ' } });
    fireEvent.click(obterBotaoAdicionar());

    expect(aoAdicionar).toHaveBeenCalledTimes(1);
    expect(aoAdicionar).toHaveBeenCalledWith('Comprar cafe');
    expect(input.value).toBe('');
  });

  it('remove a mensagem de erro apos uma submissao valida', () => {
    render(<NovaTarefa aoAdicionar={jest.fn()} />);

    fireEvent.click(obterBotaoAdicionar());
    expect(screen.getByRole('alert')).toBeInTheDocument();

    fireEvent.change(obterCampoTitulo(), { target: { value: 'Tarefa valida' } });
    fireEvent.click(obterBotaoAdicionar());

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
