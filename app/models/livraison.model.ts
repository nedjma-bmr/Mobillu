export class Livraison{
    id_bonLiv : string ; 
    num_bonLiv : number ; 
    date_bonLiv : string ; 
    id_client : string ; 
    design_client : string ; 
   
    num_bonCmd : number ;  
    num_Fact : string;

    // pr voir si le bon est facturé ou pas 

   estValider  ;

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
    
    valider : string ;
}