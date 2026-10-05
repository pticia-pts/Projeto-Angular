import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro';
import { AvaliacaoEstrelas } from '../avaliacao-estrelas/avaliacao-estrelas';
import { CardModule } from '@openng/optimus-ui/card';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TagModule } from '@openng/optimus-ui/tag';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

function formatarData(data: Date): string {
  const ano = String(data.getFullYear()).padStart(4, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function converterParaData(valor: string): Date {
  const [ano, mes, dia] = valor.split('-').map(Number);
  const data = new Date(0);
  data.setFullYear(ano, mes - 1, dia);
  data.setHours(0, 0, 0, 0);
  return data;
}

const dataPublicacaoValida: ValidatorFn = ({ value }) => {
  if (typeof value !== 'string' || !value) {
    return null;
  }

  const [ano, mes, dia] = value.split('-').map(Number);
  const data = converterParaData(value);
  const dataInvalida =
    data.getFullYear() !== ano ||
    data.getMonth() !== mes - 1 ||
    data.getDate() !== dia;

  if (dataInvalida) {
    return { invalidDate: true };
  }

  return value > formatarData(new Date()) ? { futureDate: true } : null;
};

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

  readonly dataAtual = formatarData(new Date());

  // null = modo adicionar | Livro = modo editar
  livroAtual = signal<Livro | null>(null);

  lido = signal(false);
  avaliacao = signal(0);
  confirmando = signal(false);

  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    anoPublicacao: [this.dataAtual, [Validators.required, dataPublicacaoValida]],
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
      this.form.patchValue({
        ...livro,
        anoPublicacao: formatarData(livro.anoPublicacao),
      });
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

    const valores = this.form.getRawValue();
    const dados = {
      ...valores,
      anoPublicacao: converterParaData(valores.anoPublicacao),
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