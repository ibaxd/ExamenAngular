import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item2Service } from '../../services/item2.service';
import { Item2 } from '../../models/item2.model';

@Component({
  selector: 'app-item2-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item2-list.html',
  styleUrl: './item2-list.css'
})
export class Item2ListComponent implements OnInit {
  items: Item2[] = [];
  form: Item2 = { nombre: '', descripcion: '' };
  editingId: string | null = null;
  submitted = false;

  constructor(private svc: Item2Service, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.svc.getAll().subscribe(data => {
      this.items = data;
      this.cdr.detectChanges();
    });
  }

  save() {
    this.submitted = true;
    if (!this.form.nombre || !this.form.descripcion) return;
    if (this.editingId) {
      this.svc.update(this.editingId, this.form).then(() => this.reset());
    } else {
      this.svc.add(this.form).then(() => this.reset());
    }
  }

  edit(item: Item2) {
    this.editingId = item.id!;
    this.form = { nombre: item.nombre, descripcion: item.descripcion };
  }

  delete(id: string) {
    if (confirm('¿Eliminar?')) this.svc.delete(id);
  }

  reset() {
    this.form = { nombre: '', descripcion: '' };
    this.editingId = null;
    this.submitted = false;
  }
}
