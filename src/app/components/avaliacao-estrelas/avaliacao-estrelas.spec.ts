import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoEstrelas } from './avaliacao-estrelas';

describe('AvaliacaoEstrelas', () => {
  let component: AvaliacaoEstrelas;
  let fixture: ComponentFixture<AvaliacaoEstrelas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoEstrelas],
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliacaoEstrelas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
