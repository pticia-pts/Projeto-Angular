import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Livro } from '../../models/livro';
import { CardModule } from '@openng/optimus-ui/card';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TagModule } from '@openng/optimus-ui/tag';
import { LivroService } from '../../services/livro';
import { AvaliacaoEstrelas } from '../avaliacao-estrelas/avaliacao-estrelas';
import { ConfirmarExclusao } from '../confirmar-exclusao/confirmar-exclusao';


@Component({
  selector: 'app-livro-lista',
  imports: [RouterLink, DatePipe, AvaliacaoEstrelas, ConfirmarExclusao, CardModule, ButtonModule,TagModule],
  templateUrl: './livro-lista.html',
})
export class LivroLista {
  private service = inject(LivroService);

  livros = computed(() => this.service.listar());
  livroParaExcluir = signal<Livro | null>(null);

  excluir(): void {
    const livro = this.livroParaExcluir();
    if (livro) this.service.excluir(livro.id);
    this.livroParaExcluir.set(null);
  }
}