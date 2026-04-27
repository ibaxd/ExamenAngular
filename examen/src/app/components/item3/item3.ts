import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item1Service } from '../../services/item1.service';
import { Item2Service } from '../../services/item2.service';
import { Item3Service } from '../../services/item3.service';
import { Item1 } from '../../models/item1.model';
import { Item2 } from '../../models/item2.model';
import { Item3 } from '../../models/item3.model';

@Component({
  selector: 'app-item3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item3.html',
  styleUrl: './item3.css'
})
export class Item3ListComponent implements OnInit {
  item1s: Item1[] = [];
  item2s: Item2[] = [];
  items: Item3[] = [];
  form!: FormGroup;
  editingId: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private svc1: Item1Service,
    private svc2: Item2Service,
    private svc3: Item3Service,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();

    this.svc1.getAll().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => { this.item1s = data; this.cdr.detectChanges(); });

    this.svc2.getAll().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => { this.item2s = data; this.cdr.detectChanges(); });

    this.svc3.getAll().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => { this.items = data; this.cdr.detectChanges(); });
  }

  private buildForm() {
    this.form = this.fb.group({
      item1Id:      ['', Validators.required],
      item2Id:      ['', Validators.required],
      calificacion: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  getItem1Nombre(id: string) {
    return this.item1s.find(i => i.id === id)?.nombre || '';
  }

  getItem2Nombre(id: string) {
    return this.item2s.find(i => i.id === id)?.nombre || '';
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const value: Item3 = this.form.getRawValue();

    if (this.editingId) {
      this.svc3.update(this.editingId, value).then(() => this.reset());
    } else {
      this.svc3.add(value).then(() => this.reset());
    }
  }

  edit(item: Item3) {
    this.editingId = item.id!;
    this.form.setValue({
      item1Id: item.item1Id,
      item2Id: item.item2Id,
      calificacion: item.calificacion
    });
  }

  delete(id: string) {
    if (confirm('¿Eliminar?'))
      this.svc3.delete(id).catch(err => console.error('Error al eliminar:', err));
  }

  reset() {
    this.form.reset({ item1Id: '', item2Id: '', calificacion: null });
    this.editingId = null;
  }
}
