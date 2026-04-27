import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item1Service } from '../../services/item1.service';
import { Item1 } from '../../models/item1.model';

@Component({
  selector: 'app-item1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item1.html',
  styleUrl: './item1.css'
})
export class Item1ListComponent implements OnInit {
  items: Item1[] = [];
  form!: FormGroup;
  editingId: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private svc: Item1Service,
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
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const value: Item1 = this.form.getRawValue();

    if (this.editingId) {
      this.svc.update(this.editingId, value).then(() => this.reset());
    } else {
      this.svc.add(value).then(() => this.reset());
    }
  }

  edit(item: Item1) {
    this.editingId = item.id!;
    this.form.setValue({ nombre: item.nombre, correo: item.correo });
  }

  delete(id: string) {
    if (confirm('¿Eliminar?'))
      this.svc.delete(id).catch(err => console.error('Error al eliminar:', err));
  }

  reset() {
    this.form.reset({ nombre: '', correo: '' });
    this.editingId = null;
  }
}
