export class Facture{
    id_Fact : string ; 
    num_Fact : number ; 
    date_Fact : string ; 
    id_client : string ; 
    design_client : string ; 
   
    num_bonCmd : number ;  

    // pr voir si le bon est facturé ou pas 

    valider : string ; 

    totalHT : number ; 
    // total TTC des produits dans un bon livraison
    totalTTC : number;
    // total des TVA des produits dans un bon livraison 
    totalTVA : number ;
    // Total des produits dans un bon livraison (si y a pas de remise Total = TotalTTc)
    total : number;
    
    // remise des produits dans un bon livraison 
    Remise : number ; 
    // montant de la remise 
    montantRemise : number ; 
    // montant payer restant 

    reste_du : number ; 
    totalPayer : number ;  
    
}