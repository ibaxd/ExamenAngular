import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item1 } from '../models/item1.model';

@Injectable({ providedIn: 'root' })
export class Item1Service {
  private col;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'item1s');
  }

  getAll(): Observable<Item1[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Item1[]>;
  }

  add(item: Item1) { return addDoc(this.col, item); }
  update(id: string, item: Partial<Item1>) { return updateDoc(doc(this.firestore, 'item1s', id), item); }
  delete(id: string) { return deleteDoc(doc(this.firestore, 'item1s', id)); }
}
