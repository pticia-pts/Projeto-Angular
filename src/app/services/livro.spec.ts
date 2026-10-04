import { TestBed } from '@angular/core/testing';
import { LivroService } from './livro';

describe('LivroService', () => {
  let service: LivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivroService],
    });
    service = TestBed.inject(LivroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list initial books', () => {
    expect(service.listar().length).toBeGreaterThan(0);
  });
});
