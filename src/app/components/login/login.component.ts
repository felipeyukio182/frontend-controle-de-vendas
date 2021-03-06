import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessaoService } from '../../services/sessao.service';
import { environment } from '../../../environments/environment'
import { CarregandoService } from 'src/app/services/carregando.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private baseUrl: string = environment.baseUrl

  public loginForm = this.formBuilder.group({
    id: [null],
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  })


  constructor(private http: HttpClient,
              private router: Router,
              private sessaoService: SessaoService,
              private formBuilder: FormBuilder,
              public carregandoService: CarregandoService,
              private toast: ToastService) { }

  ngOnInit(): void {
    let estaLogado = this.sessaoService.validarSessao()
    if(estaLogado) {
      this.router.navigate(["/inicio"])
    }
  }

  login() {
    let body = {
      usuario: this.loginForm.value.usuario,
      senha: this.loginForm.value.senha
    }

    this.carregandoService.carregando = true
    this.http.post(this.baseUrl + "/usuarios", body).subscribe(
    (retorno: any) => {
        this.carregandoService.carregando = false

        if(retorno.status == "ok") {
          console.log("Deu certo")
          console.log(retorno)
          this.sessaoService.salvarSessao("usuario", JSON.stringify(retorno.usuario))
          this.loginForm.controls["id"].setValue(retorno.usuario.id)
          this.router.navigate(["/inicio"])

        } else if(retorno.status == "erro") {
          console.log(retorno)
          this.toast.erro("Usuario ou senha incorretos...")
        }

      },
      (err: any) => {
        this.carregandoService.carregando = false
        this.toast.erroAoRequisitarServidor()
        console.log(err)
      }
    )
  }

}