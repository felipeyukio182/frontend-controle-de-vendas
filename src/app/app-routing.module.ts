import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { PessoasComponent } from './components/pessoas/pessoas/pessoas.component';
import { ProdutosComponent } from './components/produtos/produtos/produtos.component';
import { VendasComponent } from './components/vendas/vendas/vendas.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'menuprincipal',
    component: MenuPrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'pessoas',
        component: PessoasComponent,
        canActivate: [AuthGuard],
        children: []
      },
      {
        path: 'produtos',
        component: ProdutosComponent,
        canActivate: [AuthGuard],
        children: []
      },
      {
        path: 'vendas',
        component: VendasComponent,
        canActivate: [AuthGuard],
        children: []
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/menuprincipal',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
