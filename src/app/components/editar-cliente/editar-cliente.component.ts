import { Component, OnInit } from '@angular/core';
import { ModelCliente } from '../../model/model.cliente';
import { ClientesService } from '../../service/clientes.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente  : ModelCliente[] = [];
  constructor(private activeRouter:ActivatedRoute, private router:Router, private clienteApi:ClientesService) { }

  ngOnInit(): void {
    

    
    
  }

}
