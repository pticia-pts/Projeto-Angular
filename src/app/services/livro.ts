import { Injectable, signal } from '@angular/core';
import { Livro, NovoLivro } from '../models/livro';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private readonly livros = signal<Livro[]>([
    {
      id: 1,
      titulo: 'Harry Potter e a Pedra Filosofal',
      autor: 'J. K. Rowling',
      anoPublicacao: 1997,
      genero: 'Fantasia',
      lido: true,
      avaliacao: 5,
      comentario: 'Uma leitura incrível, com personagens marcantes e um mundo cativante.',
    },
    {
      id: 2,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      anoPublicacao: 1899,
      genero: 'Romance',
      lido: true,
      avaliacao: 4,
      comentario: '',
    },
    {
      id: 3,
      titulo: 'O Hobbit',
      autor: 'J. R. R. Tolkien',
      anoPublicacao: 1937,
      genero: 'Fantasia',
      lido: false,
      avaliacao: 0,
      comentario: '',
    },
  ]);

  private proximoId = 4;

  listar(): Livro[] {
    return this.livros();
  }

  buscarPorId(id: number): Livro | undefined {
    return this.livros().find((l) => l.id === id);
  }

  adicionar(dados: NovoLivro): Livro {
    const novo: Livro = { ...dados, id: this.proximoId++ };
    this.livros.update((lista) => [...lista, novo]);
    return novo;
  }

  editar(livro: Livro): void {
    this.livros.update((lista) => lista.map((l) => (l.id === livro.id ? { ...livro } : l)));
  }

  excluir(id: number): void {
    this.livros.update((lista) => lista.filter((l) => l.id !== id));
  }
}
