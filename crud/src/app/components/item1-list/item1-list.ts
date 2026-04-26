import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item1Service } from '../../services/item1.service';
import { Item1 } from '../../models/item1.model';

@Component({
  selector: 'app-item1-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item1-list.html',
  styleUrl: './item1-list.css'
})
export class Item1ListComponent implements OnInit {
  items: Item1[] = [];
  form: Item1 = { nombre: '', correo: '' };
  editingId: string | null = null;
  submitted = false;

  constructor(private svc: Item1Service, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.svc.getAll().subscribe(data => {
      this.items = data;
      this.cdr.detectChanges();
    });
  }

  save() {
    this.submitted = true;
    if (!this.form.nombre || !this.form.correo) return;
    if (this.editingId) {
      this.svc.update(this.editingId, this.form).then(() => this.reset());
    } else {
      this.svc.add(this.form).then(() => this.reset());
    }
  }

  edit(item: Item1) {
    this.editingId = item.id!;
    this.form = { nombre: item.nombre, correo: item.correo };
  }

  delete(id: string) {
    if (confirm('¿Eliminar?')) this.svc.delete(id);
  }

  reset() {
    this.form = { nombre: '', correo: '' };
    this.editingId = null;
    this.submitted = false;
  }
}
