import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4JlofLQnhL2CoY7zahH9My-pCh6ckm_0",
  authDomain: "angularexamen-e029c.firebaseapp.com",
  projectId: "angularexamen-e029c",
  storageBucket: "angularexamen-e029c.firebasestorage.app",
  messagingSenderId: "658102166464",
  appId: "1:658102166464:web:2e86625847895360ff5e25",
  measurementId: "G-ZW17VV3EER"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
