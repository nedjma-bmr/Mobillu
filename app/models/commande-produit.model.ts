export class CommandProduits {
    //l'identifiant du produit commandé 
    id_prod : number ; 
    id_produit : number ; 
    // numéro de la commande
    Num_cmd : number ;
    // la designtaion du produit commandé
    design_prod : string ;
    //la quantité du produit dans la commande
    qte : number ; 
 // prix unitaire hors taxe selon la quantité
    puht : number ; 
    // remise pour un produit 
    remise : number ; 
     // TVA d'un produit  
    TVA : number ; 
    // prix du vente ht du produit 
    pvht: number; 
    // image du produit
    image: string ; 
    // prix TTC d'un produit 
    prixttc : number ; 
    //le code du produit
    code_prod :string
    // montant total d'un seul produit  
    total : number ; 
    // pour voir si la quantité est modifié 
    estModifie : boolean = false;
}