import { Routes } from '@angular/router';
import { LivroLista } from './components/livro-lista/livro-lista';
import { LivroForm } from './components/livro-form/livro-form';
import { LivroDetalhes } from './components/livro-detalhes/livro-detalhes';

export const routes: Routes = [
  { path: '', component: LivroLista },
  { path: 'livros/novo', component: LivroForm },
  { path: 'livros/:id', component: LivroDetalhes },
  { path: 'livros/:id/editar', component: LivroForm },
  { path: '**', redirectTo: '' },
];