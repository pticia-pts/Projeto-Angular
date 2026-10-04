
import { Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-avaliacao-estrelas',
  templateUrl: './avaliacao-estrelas.html',
  styleUrl: './avaliacao-estrelas.css',
})
export class AvaliacaoEstrelas {
  valor = model(0);                 // permite [(valor)]
  somenteLeitura = input(false);    // modo informativo
  desabilitado = input(false);      // bloqueia a edição

  readonly estrelas = [1, 2, 3, 4, 5];
  readonly hover = signal(0);

  preenchida(n: number): boolean {
    return n <= (this.hover() || this.valor());
  }

  selecionar(n: number): void {
    // clicar na estrela já selecionada zera a avaliação
    this.valor.set(this.valor() === n ? 0 : n);
  }
}
