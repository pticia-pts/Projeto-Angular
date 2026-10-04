import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { BreadcrumbModule } from '@openng/optimus-ui/breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    BreadcrumbModule
  ]
})
export class App {

  items = [
    {
      label: 'Livros',
      routerLink: '/livros'
    }
  ];

  home = {
    icon: 'pi pi-home',
    routerLink: '/'
  };
}