import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item2 } from '../models/item2.model';

@Injectable({ providedIn: 'root' })
export class Item2Service {
  private col;

  constructor(private firestore: Firestore) {
    this.col = collection(this.firestore, 'item2s');
  }

  getAll(): Observable<Item2[]> {
    return collectionData(this.col, { idField: 'id' }) as Observable<Item2[]>;
  }

  add(item: Item2) { return addDoc(this.col, item); }
  update(id: string, item: Partial<Item2>) { return updateDoc(doc(this.firestore, 'item2s', id), item); }
  delete(id: string) { return deleteDoc(doc(this.firestore, 'item2s', id)); }
}
