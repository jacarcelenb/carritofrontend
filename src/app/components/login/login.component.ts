import { Component, Input, OnInit } from '@angular/core';
import { ModelUsuario } from 'src/app/model/model.usuario';
import { ClientesService } from 'src/app/service/clientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataUser: ModelUsuario[] = [];
  @Input() UsuarioDatos ={ usr_usuario:'',usr_clave:''}

  constructor(private clientsService: ClientesService ,
    private router: Router) { }

  ngOnInit(): void {
   this.getUsers();
  }

  getUsers(){
    this.clientsService.Login().subscribe(
      (user:any) =>{
      this.dataUser = user
      console.log(user)
      },
      (error) => console.warn(error)
    )
  }
  LogIn(){
    let login = false
    let rol = 0
    for (let index = 0; index < this.dataUser.length; index++) {
       if (this.dataUser[index].per_cedula == this.UsuarioDatos.usr_usuario &&
        this.dataUser[index].per_clave== this.UsuarioDatos.usr_clave) {
        login = true
        rol = this.dataUser[index].per_rol
       } 
      
    }
    if (login) {
    
      if (rol == 1) {
        this.router.navigate(['/productos']);
      }
      if (rol == 2) {
        localStorage.setItem('per_cedula', this.UsuarioDatos.usr_usuario)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Credenciales correctas',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/view-producto']);
      }
    }
    if (!login) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Credenciales incorrectas',
        showConfirmButton: false,
        timer: 1500
      })
    }

   
  }

 


}
