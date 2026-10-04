import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivroService } from '../../services/livro';
import { AvaliacaoEstrelas } from '../avaliacao-estrelas/avaliacao-estrelas';
import { ConfirmarExclusao } from '../confirmar-exclusao/confirmar-exclusao';
import { CardModule } from '@openng/optimus-ui/card';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TagModule } from '@openng/optimus-ui/tag';


@Component({
  selector: 'app-livro-detalhes',
  imports: [RouterLink, AvaliacaoEstrelas, ConfirmarExclusao, CardModule,ButtonModule,TagModule],
  templateUrl: './livro-detalhes.html',
})
export class LivroDetalhes {
  private service = inject(LivroService);
  private router = inject(Router);
  private id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  livro = computed(() => this.service.buscarPorId(this.id));
  confirmando = signal(false);

  excluir(): void {
    this.router.navigate(['/']);
    this.service.excluir(this.id);
  }
}