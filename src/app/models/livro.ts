import { Data } from "@angular/router";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  genero: string;
  lido: boolean;
  avaliacao: number; // 0 a 5
  comentario: string;
}

export type NovoLivro = Omit<Livro, 'id'>;