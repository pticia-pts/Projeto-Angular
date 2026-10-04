import { Component, input, output } from '@angular/core';
import { Livro } from '../../models/livro';
import { CardModule } from '@openng/optimus-ui/card';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  selector: 'app-confirmar-exclusao',
  templateUrl: './confirmar-exclusao.html',
  imports: [CardModule, ButtonModule],
})
export class ConfirmarExclusao {
  livro = input.required<Livro>();
  confirmar = output<void>();
  cancelar = output<void>();
}