import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Partidos } from '../../../modelos/partidos.model';
import { PartidosService } from '../../../servicios/partidos.service';
@Component({
  selector: 'crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_partido: string = "";
  intentoEnvio: boolean = false;
  elPartido: Partidos ={
    nombre: "",
    lema: ""
    
  }
  constructor(private miServicioPartidos: PartidosService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.id_partido){
      this.modoCreacion = false;
      this.id_partido = this.rutaActiva.snapshot.params.id_mesa;
      this.getPartidos(this.id_partido)
    }else{
      this.modoCreacion = true;
    }
  }
  getPartidos(id:string){
    this.miServicioPartidos.getPartidos(id).
    subscribe(data => {this.elPartido = data;
    });
  }
  agregar():void{
    if(this.validarDatosCompletos()){
      this.miServicioPartidos.crear(this.elPartido).
      subscribe(data => {
        Swal.fire(
          'creado',
          'El partido  ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/partidos/listar"])
      });
    }
  }

  editar():void{
    if(this.validarDatosCompletos()){
      this.miServicioPartidos.editar(this.elPartido._id, this.elPartido).
      subscribe(data => {
        Swal.fire(
          'Actualizado',
          'La mesa ha sido actualizado Correctamente',
          'success'
        )
        this.router.navigate(["pages/mesas/listar"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio = true;
    if(this.elPartido.nombre || this.elPartido.lema ){
        return true;
      }else{
        return false;
      }
  }

}