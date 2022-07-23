import { Component, OnInit } from '@angular/core';
import { ModelCliente } from 'src/app/model/model.cliente';
import { ClientesService } from 'src/app/service/clientes.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: ModelCliente[] = [];
  clientefromGroup!: FormGroup;
  id_cliente: any


  informacionCliente = {
    per_nombres: '',
    per_telefono: '',
    per_correo: '',
    per_estadocivil: '',
    per_ciudad: ''

  }
  constructor(private _clienteService: ClientesService,
    private formbuilder: FormBuilder) {
    this.clientefromGroup = this.formbuilder.group({
      per_id: [''],
      per_nombres: [''],
      per_telefono: [''],
      per_correo: [''],
      per_estadocivil: [''],
      per_ciudad: ['']
    });
  }




  ngOnInit(): void {
    this.getAllClientes();
  }

  filterClientes = '';
  page = 0;
  totalClientes: number = 0;
  public nextPage() {
    this.page += 5;
  }

  public previousPage() {
    if (this.page > 0)
      this.page -= 5;
  }

  public getAllClientes() {
    this._clienteService.getAllClientes().subscribe(
      (data: ModelCliente[]) => {
        this.clientes = data;
        console.log(data);
      });
  }
  public eliminarCliente(per_id: any, cliente: any) {

    Swal.fire({
      title: 'Está seguro de eliminar de dar de baja al cliente?',
      text: "El cliente ya no podrá acceder el sistema!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._clienteService.deleteCliente(per_id, cliente).subscribe(
          res => {
            this.getAllClientes();
          });
        Swal.fire(
          'Desahibilitado!',
          'El cliente ha sido dado de baja del sistema.',
          'success'
        )
      }
    })



  }




  EditarCliente(cliente: any) {
    this.clientefromGroup.controls['per_id'].disable();
    this.id_cliente = cliente.per_id;
    this.clientefromGroup.controls['per_id'].setValue(cliente.per_id)
    this.clientefromGroup.controls['per_nombres'].setValue(cliente.per_nombres)
    this.clientefromGroup.controls['per_telefono'].setValue(cliente.per_telefono)
    this.clientefromGroup.controls['per_correo'].setValue(cliente.per_correo)
    this.clientefromGroup.controls['per_estadocivil'].setValue(cliente.per_estadocivil)
    this.clientefromGroup.controls['per_ciudad'].setValue(cliente.per_ciudad)
  }


  actualizarCliente() {
    console.log(this.id_cliente)
    this.informacionCliente.per_nombres = this.clientefromGroup.value.per_nombres;
    this.informacionCliente.per_telefono = this.clientefromGroup.value.per_telefono;
    this.informacionCliente.per_correo = this.clientefromGroup.value.per_correo;
    this.informacionCliente.per_estadocivil = this.clientefromGroup.value.per_estadocivil;
    this.informacionCliente.per_ciudad = this.clientefromGroup.value.per_ciudad;
    console.log(this.informacionCliente)
    this._clienteService.updateCliente(this.id_cliente, this.informacionCliente).subscribe(
      res => {
        this.getAllClientes();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      
      });

    


  }





}
