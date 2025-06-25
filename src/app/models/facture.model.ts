export interface Facture {
  id?: number;
  position: number;
  Designation: string;
  Quantite: number;
  PrixUnitaire: number;
  tva: number;
  PrixTotalArticle?: number;
}
