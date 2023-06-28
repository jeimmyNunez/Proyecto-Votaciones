import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Partidos } from '../../../modelos/partidos.model';
import { PartidosService } from '../../../servicios/partidos.service';
@Component({
  selector: 'listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  partidos: Partidos[];
  nombresColumnas: string[] = ['_id', 'Nombre', 'Lema'];
  constructor(private miServicioPartidos: PartidosService,private router: Router) { } 
  ngOnInit(): void {
    this.listar();
  }
  listar(): void {
    this.miServicioPartidos.listar().
      subscribe(data => {
        this.partidos = data;
      });
 
  }
  agregar(): void {
    this.router.navigate(["pages/partidos/crear"])
  }
  editar(id: string): void {
    this.router.navigate(["pages/partidos/actualizar/"+id])

  }
  eliminar(id: string): void {
    console.log("Eliminando");
    Swal.fire({
      title: 'Eliminar Partido',
      text: "Está seguro que quiere eliminar el Partido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPartidos.eliminar(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El partido  ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
 }
 