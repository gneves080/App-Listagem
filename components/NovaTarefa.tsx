'use client';

import { useState, type FormEvent } from 'react';

type NovaTarefaProps = {
  /** Recebe o titulo ja validado e normalizado de uma nova tarefa. */
  aoAdicionar: (titulo: string) => void;
};

export default function NovaTarefa({ aoAdicionar }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState('');
  const [erro, setErro] = useState('');

  function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const tituloNormalizado = titulo.trim();
    if (tituloNormalizado === '') {
      setErro('Informe o titulo da tarefa.');
      return;
    }

    aoAdicionar(tituloNormalizado);
    setTitulo('');
    setErro('');
  }

  return (
    <form className="nova-tarefa" onSubmit={enviarFormulario} aria-label="Formulario de nova tarefa">
      <label className="nova-tarefa__label" htmlFor="titulo-tarefa">
        Nova tarefa
      </label>

      <div className="nova-tarefa__campo">
        <input
          id="titulo-tarefa"
          className="nova-tarefa__input"
          type="text"
          value={titulo}
          placeholder="Digite o titulo da tarefa"
          onChange={(evento) => setTitulo(evento.target.value)}
        />
        <button className="nova-tarefa__botao" type="submit">
          Adicionar
        </button>
      </div>

      {erro !== '' && (
        <p className="nova-tarefa__erro" role="alert">
          {erro}
        </p>
      )}
    </form>
  );
}
