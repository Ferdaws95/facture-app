import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Facture } from '../models/facture.model';
import { FactureService } from '../services/facture.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-facture-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,              // ✅ nécessaire pour ngModel
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './facture-list.html',
  styleUrl: './facture-list.css',
})


export class FactureList implements OnInit {
  dataSource: Facture[] = [];
  factureForm!: FormGroup;
  displayedColumns = ['position', 'Designation', 'Quantite', 'PrixUnitaire', 'TVA', 'PrixTotalArticle'];
destinataire: string = '';
dateFacture: Date | null = null;

  constructor(private fb: FormBuilder, private factureService: FactureService) {}

  ngOnInit(): void {
    this.factureForm = this.fb.group({
      Designation: ['', Validators.required],
      Quantite: [1, [Validators.required, Validators.min(1)]],
      PrixUnitaire: [0, [Validators.required, Validators.min(0.01)]],
      tva: [20, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.getFactures();
  }

  getFactures(): void {
    this.factureService.getFactures().subscribe(list => {
      this.dataSource = list.map(f => ({
        ...f,
        PrixTotalArticle: f.Quantite * f.PrixUnitaire
      }));
    });
  }

  ajouterFacture(): void {
    if (!this.factureForm.valid) return;
    const raw = this.factureForm.value;
    const nouvel: Facture = {
      position: this.dataSource.length + 1,
      Designation: raw.Designation,
      Quantite: raw.Quantite,
      PrixUnitaire: raw.PrixUnitaire,
      tva: raw.tva
    };
    this.factureService.addFacture(nouvel).subscribe(fa => {
      fa.PrixTotalArticle = fa.Quantite * fa.PrixUnitaire;
      fa.position = this.dataSource.length + 1;
      this.dataSource = [...this.dataSource, fa];
      this.factureForm.reset({ Designation: '', Quantite: 1, PrixUnitaire: 0, tva: 20 });
    });
  }

  get totalHT(): number {
    return this.dataSource.reduce((sum, a) => sum + (a.Quantite * a.PrixUnitaire), 0);
  }
  get totalRemise(): number {
    return this.totalHT * 0.1;
  }
  get totalRemiseHT(): number {
    return this.totalHT - this.totalRemise;
  }
  get TVA(): number {
    return this.totalRemiseHT * 0.2;
  }
  get totalGeneral(): number {
    return this.totalRemiseHT + this.TVA;
  }
}
