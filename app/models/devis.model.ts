export class Devis {
    // id d'un devis 
    id_proforma: string;
    // le numéro du devis 
    num_proforma : number ;
    // date d'établission d'un devis 
    date_proforma : string ; 
    // id d'un client dans un devis 
    id_client :string ;
    // nom du client 
    design_client : string ; 
    // total HT des produits dans un Devis 
    totalHT : number ; 
    // total TTC des produits dans un devis
    totalTTC : number;
    // total des TVA des produits dans un devis 
    totalTVA : number ;
    // Total des produits dans un devis (si y a pas de remise Total = TotalTTc)
    total : number;
    
    // remise des produits dans un devis 
    Remise : number ; 
    // montant de la remise 
    montantRemise : number ; 

}

