export class DevisProduits {
    // id d'un devis 
    id_devis : string ;
    // id d'un produit dns un devis  
    id_prod : number ; 
    // quantité de produits dans un devis
    qte : number ; 
    // prix unitaire hors taxe selon la quantité
    puht : number ; 
    // remise pour un produit 
    remise : number ; 
    // nom du produit
    design_prod : string ;
    // TVA d'un produit  
    TVA : number ; 
    // prix unitaire hors taxe d'un produit 
    pvht: number; 
    // image d'un produit 
    image: string ; 
    // prix TTC d'un produit 
    prixttc : number ; 
    // pour voir si la quantité est modifié 
    estModifie : boolean = false;
    // code d'un produit 
    code_prod: string
    // montant total d'un seul produit  
    total : number ; 
    
   

}