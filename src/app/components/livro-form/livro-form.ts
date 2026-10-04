import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro';
import { AvaliacaoEstrelas } from '../avaliacao-estrelas/avaliacao-estrelas';
import { CardModule } from '@openng/optimus-ui/card';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TagModule } from '@openng/optimus-ui/tag';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  selector: 'app-livro-form',
  imports: [ReactiveFormsModule, RouterLink, AvaliacaoEstrelas,CardModule,ButtonModule,TagModule, InputTextModule, FormsModule],
  templateUrl: './livro-form.html',
})
export class LivroForm {
  private fb = inject(FormBuilder);
  private service = inject(LivroService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly anoAtual = new Date().getFullYear();

  // null = modo adicionar | Livro = modo editar
  livroAtual = signal<Livro | null>(null);

  lido = signal(false);
  avaliacao = signal(0);
  confirmando = signal(false);

  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    anoPublicacao: [
      this.anoAtual,
      [Validators.required, Validators.min(1), Validators.max(this.anoAtual)],
    ],
    genero: ['', Validators.required],
    comentario: [''],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');

    // Se a rota tem :id, estamos editando: carrega o livro e preenche o formulário
    if (idParam) {
      const livro = this.service.buscarPorId(Number(idParam));
      if (!livro) {
        this.router.navigate(['/']);
        return;
      }
      this.livroAtual.set(livro);
      this.form.patchValue(livro);
      this.lido.set(livro.lido);
      this.avaliacao.set(livro.avaliacao);
    }
  }

  get editando(): boolean {
    return this.livroAtual() !== null;
  }

  invalido(campo: 'titulo' | 'autor' | 'anoPublicacao' | 'genero'): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  // ADICIONAR ou ALTERAR
  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dados = {
      ...this.form.getRawValue(),
      lido: this.lido(),
      avaliacao: this.avaliacao(), // mantida mesmo se "Não lido"
    };

    const livro = this.livroAtual();
    if (livro) {
      this.service.editar({ id: livro.id, ...dados });
    } else {
      this.service.adicionar(dados);
    }

    this.router.navigate(['/']);
  }

  // EXCLUIR (só disponível no modo edição)
  excluir(): void {
    const livro = this.livroAtual();
    if (livro) {
      this.service.excluir(livro.id);
    }
    this.confirmando.set(false);
    this.router.navigate(['/']);
  }
}