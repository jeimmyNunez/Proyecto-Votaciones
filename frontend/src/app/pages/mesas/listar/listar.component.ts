import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Mesas } from '../../../modelos/mesas.model';
import { MesasService } from '../../../servicios/mesas.service';
@Component({
  selector: 'listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  mesas: Mesas[];
  nombresColumnas: string[] = ['_id', 'Número Mesa', 'Cantidad inscritos'];
  constructor(private miServicioMesas: MesasService,private router: Router) { } 
  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioMesas.listar().
      subscribe(data => {
        this.mesas = data;
      });
 
  }
  agregar(): void {
    this.router.navigate(["pages/mesas/crear"])
  }
  editar(id: string): void {
    this.router.navigate(["pages/mesas/actualizar/"+id])

  }
  eliminar(id: string): void {
    console.log("Eliminando");
    Swal.fire({
      title: 'Eliminar Mesa',
      text: "Está seguro que quiere eliminar el Mesa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioMesas.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'La mesa ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
 }
 