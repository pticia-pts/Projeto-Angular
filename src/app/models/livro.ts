export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  anoPublicacao: Date;
  genero: string;
  lido: boolean;
  avaliacao: number; // 0 a 5
  comentario: string;
}

export type NovoLivro = Omit<Livro, 'id'>;