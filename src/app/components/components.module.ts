import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { LoginComponent } from './login/login.component';
import { TemplatesModule } from '../templates/templates.module';
import { RouterModule } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas/pessoas.component';



@NgModule({
  declarations: [
    LoginComponent,
    MenuPrincipalComponent,
    PessoasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
