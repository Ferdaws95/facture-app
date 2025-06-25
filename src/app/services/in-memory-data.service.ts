import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Facture } from '../models/facture.model';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const factures: Facture[] = [
      { id: 1, position: 1, Designation: 'Boutons', Quantite: 300, PrixUnitaire: 0.9, tva: 20 },
      { id: 2, position: 2, Designation: 'Bobine', Quantite: 20, PrixUnitaire: 2, tva: 20 },
      { id: 3, position: 3, Designation: 'Toile-collant', Quantite: 100, PrixUnitaire: 4, tva: 20 },
      { id: 4, position: 4, Designation: 'Fermeture-éclair', Quantite: 4, PrixUnitaire: 40, tva: 20 },
    ];
    return { factures };
  }
}
