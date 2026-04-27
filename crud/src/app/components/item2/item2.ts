import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item2Service } from '../../services/item2.service';
import { Item2 } from '../../models/item2.model';
import {Item1} from '../../models/item1.model';

@Component({
  selector: 'app-item2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item2.html',
  styleUrl: './item2.css'
})
export class Item2ListComponent implements OnInit {
  items: Item2[] = [];
  form!: FormGroup;
  editingId: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private svc: Item2Service,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();

    this.svc.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.items = data;
        this.cdr.detectChanges();
      });
  }

  private buildForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const value: Item2 = this.form.getRawValue();

    if (this.editingId) {
      this.svc.update(this.editingId, value).then(() => this.reset());
    } else {
      this.svc.add(value).then(() => this.reset());
    }
  }

  edit(item: Item2) {
    this.editingId = item.id!;
    this.form.setValue({ nombre: item.nombre, descripcion: item.descripcion });
  }

  delete(id: string) {
    if (confirm('¿Eliminar?'))
      this.svc.delete(id).catch(err => console.error('Error al eliminar:', err));
  }

  reset() {
    this.form.reset({ nombre: '', descripcion: '' });
    this.editingId = null;
  }
}
