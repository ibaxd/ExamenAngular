import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMfDAu239pOj2dr3VxeTOhT3Vgjp3SCj4",
  authDomain: "examenangular-d9800.firebaseapp.com",
  projectId: "examenangular-d9800",
  storageBucket: "examenangular-d9800.firebasestorage.app",
  messagingSenderId: "677351659758",
  appId: "1:677351659758:web:66d8f1def2441611ab3bff"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
