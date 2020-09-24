import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',     
    redirectTo: 'login',
    pathMatch: 'full'
  },

  
  
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'commandes',
    loadChildren: () => import('./pages/commandes/commandes.module').then( m => m.CommandesPageModule)
  },
  {
    path: 'livraison',
    loadChildren: () => import('./pages/livraison/livraison.module').then( m => m.LivraisonPageModule)
  },
  {
    path: 'factures',
    loadChildren: () => import('./pages/factures/factures.module').then( m => m.FacturesPageModule)
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  
  {
    path: 'accueil',
    loadChildren: () => import('./pages/accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'devis',
    loadChildren: () => import('./pages/devis/devis.module').then( m => m.DevisPageModule)
  },
  {
    path: 'detail-client',
    loadChildren: () => import('./pages/detail-client/detail-client.module').then( m => m.DetailClientPageModule)
  },
  {
    path: 'produits',
    loadChildren: () => import('./pages/produit/produit.module').then( m => m.ProduitPageModule)
  },
  {
    path: 'produits-devis',
    loadChildren: () => import('./pages/produits-devis/produits-devis.module').then( m => m.ProduitsDevisPageModule)
  },
  {
    path: 'ajouter-devis',
    loadChildren: () => import('./pages/ajouter-devis/ajouter-devis.module').then( m => m.AjouterDevisPageModule)
  },
  {
    path: 'ajouter-devis-produit',
    loadChildren: () => import('./pages/ajouter-devis-produit/ajouter-devis-produit.module').then( m => m.AjouterDevisProduitPageModule)
  },
  {
    path: 'ajouter-modifier-client',
    loadChildren: () => import('./pages/ajouter-modifier-client/ajouter-modifier-client.module').then( m => m.AjouterModifierClientPageModule)
  },
  {
    path: 'detail-devis',
    loadChildren: () => import('./pages/detail-devis/detail-devis.module').then( m => m.DetailDevisPageModule)
  },
  {
    path: 'ajouter-bon-livraison',
    loadChildren: () => import('./pages/ajouter-bon-livraison/ajouter-bon-livraison.module').then( m => m.AjouterBonLivraisonPageModule)
  },
  {
    path: 'nouveau-bon-livraison',
    loadChildren: () => import('./pages/nouveau-bon-livraison/nouveau-bon-livraison.module').then( m => m.NouveauBonLivraisonPageModule)
  },
  {
    path: 'importer-bon-commande',
    loadChildren: () => import('./pages/importer-bon-commande/importer-bon-commande.module').then( m => m.ImporterBonCommandePageModule)
  },
  {
    path: 'commande-produits-importer',
    loadChildren: () => import('./pages/commande-produits-importer/commande-produits-importer.module').then( m => m.CommandeProduitsImporterPageModule)
  },
  {
    path: 'detail-commande',
    loadChildren: () => import('./pages/detail-commande/detail-commande/detail-commande.module').then( m => m.DetailCommandePageModule)
  },
  
  {
    path: 'ajout-command',
    loadChildren: () => import('./pages/ajout-command/ajout-command/ajout-command.module').then( m => m.AjoutCommandPageModule)
  },
  {
    path: 'ajout-produit',
    loadChildren: () => import('./pages/ajout-produit/ajout-produit/ajout-produit.module').then( m => m.AjoutProduitPageModule)
  },
  {
    path: 'ajouter-livraison-produits',
    loadChildren: () => import('./pages/ajouter-livraison-produits/ajouter-livraison-produits.module').then( m => m.AjouterLivraisonProduitsPageModule)
  },
  {
    path: 'modifier-devis',
    loadChildren: () => import('./pages/modifier-devis/modifier-devis.module').then( m => m.ModifierDevisPageModule)
  },
  {
    path: 'detail-bon-livraison',
    loadChildren: () => import('./pages/detail-bon-livraison/detail-bon-livraison.module').then( m => m.DetailBonLivraisonPageModule)
  },
  {
    path: 'produits-livraison',
    loadChildren: () => import('./pages/produits-livraison/produits-livraison.module').then( m => m.ProduitsLivraisonPageModule)
  },
  
  {
    path: 'ajouter-facture',
    loadChildren: () => import('./pages/ajouter-facture/ajouter-facture.module').then( m => m.AjouterFacturePageModule)
  },
  {
    path: 'importer-bon-livraison',
    loadChildren: () => import('./pages/importer-bon-livraison/importer-bon-livraison.module').then( m => m.ImporterBonLivraisonPageModule)
  },
  {
    path: 'valider-facture',
    loadChildren: () => import('./pages/valider-facture/valider-facture.module').then( m => m.ValiderFacturePageModule)
  },
  {
    path: 'modifiercommande',
    loadChildren: () => import('./pages/modifiercommande/modifiercommande.module').then( m => m.ModifiercommandePageModule)
  },
  {
    path: 'produits-cmd',
    loadChildren: () => import('./pages/produits-cmd/produits-cmd.module').then( m => m.ProduitsCmdPageModule)
  },
  {
    path: 'importer-devis',
    loadChildren: () => import('./pages/importer-devis/importer-devis.module').then( m => m.ImporterDevisPageModule)
  },
  {
    path: 'produits-importer',
    loadChildren: () => import('./pages/produits-importer/produits-importer.module').then( m => m.ProduitsImporterPageModule)
  },
  {
    path: 'produits-command',
    loadChildren: () => import('./pages/produits-command/produits-command.module').then( m => m.ProduitsCommandPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./pages/stock/stock.module').then( m => m.StockPageModule)
  },
  {
    path: 'server-config',
    loadChildren: () => import('./pages/server-config/server-config.module').then( m => m.ServerConfigPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
