import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
export interface Facture {
  Designation: string;
  position: number;
  Quantite: number;
  PrixUnitaire: number;
  tva:number ;
  PrixTotalArticle: number;

}

const ELEMENT_DATA: Facture[] = [
  {
    position: 1, Designation: 'Boutons', Quantite: 300, PrixUnitaire: 0.9, tva: 20,
    PrixTotalArticle: 0
  },
  {
    position: 2, Designation: 'Bobine', Quantite: 20, PrixUnitaire: 2, tva: 20,
    PrixTotalArticle: 0
  },
  {
    position: 3, Designation: 'Toile-collant', Quantite: 100, PrixUnitaire: 4, tva: 20,
    PrixTotalArticle: 0
  },
  {
    position: 4, Designation: 'fermeture-eclair', Quantite: 4, PrixUnitaire: 40, tva: 20,
    PrixTotalArticle: 0
  },

];

@Component({
  selector: 'app-facture-list',
  standalone: true,
  imports: [MatTableModule , CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './facture-list.html',
  styleUrl: './facture-list.css',
})
export class FactureList {
    displayedColumns: string[] = ['position', 'Designation', 'Quantite', 'PrixUnitaire','TVA', 'PrixTotalArticle'];
    dataSource = ELEMENT_DATA;

    factureForm = new FormGroup({
    Designation: new FormControl('', Validators.required),
    Quantite: new FormControl(1, [Validators.required, Validators.min(1)]),
    PrixUnitaire: new FormControl(0, [Validators.required, Validators.min(0)]),
    tva: new FormControl(20, [Validators.required, Validators.min(0), Validators.max(100)]),
  });
/*
PrixTotalArticle(article: Facture): number {
  return article.Quantite * article.PrixUnitaire;
}
*/
  constructor() {
    this.calculerPrixTotal();
  }

  calculerPrixTotal(): void {
    for (let i = 0; i < this.dataSource.length; i++) {
      const article = this.dataSource[i];
      article.PrixTotalArticle = article.Quantite * article.PrixUnitaire;
    }
  }
   get totalHT(): number {
    let total = 0;
    for (let article of this.dataSource) {
      total += article.PrixTotalArticle ;
    }
    return total;
  }

  get totalRemise(): number {
    return   this.totalHT * 0.1;
    }
 get totalRemiseHT():number {
    return this.totalHT - this.totalRemise;
   }
  get TVA():number {
   return this.totalRemiseHT * 0.2;
   }
  get totalGeneral():number {
  return this.totalRemiseHT + this.TVA;
   }

/*      /////////// methode 1
ajouterFacture() {
  if (this.factureForm.valid) {
    const newItem = this.factureForm.value;

    // Ajout dans le tableau des factures
    this.dataSource.push({
      position: this.dataSource.length + 1,
      Designation: newItem.Designation!,
      Quantite: newItem.Quantite!,
      PrixUnitaire: newItem.PrixUnitaire!,
      tva: newItem.tva!,
      PrixTotalArticle: (newItem.Quantite! * newItem.PrixUnitaire!)
    });

    // Mettre à jour les totaux (optionnel, tu peux appeler ta méthode)
    this.calculerPrixTotal();

    // Réinitialiser le formulaire avec valeurs par défaut
    this.factureForm.reset({
      Designation: '',
      Quantite: 1,
      PrixUnitaire: 0,
      tva: 20,
    });
  }
} */

// methode 2  avec réaffectation de dataSource sans utiliser push
ajouterFacture() {
  if (this.factureForm.valid) {
    const newItem = this.factureForm.value;

    const nouvelArticle = {
      position: this.dataSource.length + 1,
      Designation: newItem.Designation!,
      Quantite: newItem.Quantite!,
      PrixUnitaire: newItem.PrixUnitaire!,
      tva: newItem.tva!,
      PrixTotalArticle: newItem.Quantite! * newItem.PrixUnitaire!
    };

    // Réaffectation de dataSource sans utiliser push
    this.dataSource = [...this.dataSource, nouvelArticle];

    this.calculerPrixTotal();

    // Réinitialisation du formulaire avec des valeurs par défaut
    this.factureForm.setValue({
      Designation: '',
      Quantite: 1,
      PrixUnitaire: 0,
      tva: 20,
    });
  }
}


}
