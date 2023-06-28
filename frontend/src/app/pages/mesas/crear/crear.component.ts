import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesas } from '../../../modelos/mesas.model';
import { MesasService } from '../../../servicios/mesas.service';
@Component({
  selector: 'crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_mesa: string = "";
  intentoEnvio: boolean = false;
  laMesa: Mesas ={
    numero: "",
    cantidad_inscritos: ""
    
  }
  constructor(private miServicioMesas: MesasService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.id_mesa){
      this.modoCreacion = false;
      this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
      this.getMesas(this.id_mesa)
    }else{
      this.modoCreacion = true;
    }
  }
  getMesas(id:string){
    this.miServicioMesas.getMesas(id).
    subscribe(data => {this.laMesa = data;
    });
  }
  agregar():void{
    if(this.validarDatosCompletos()){
      this.miServicioMesas.crear(this.laMesa).
      subscribe(data => {
        Swal.fire(
          'creado',
          'La mesa ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/mesas/listar"])
      });
    }
  }

  editar():void{
    if(this.validarDatosCompletos()){
      this.miServicioMesas.editar(this.laMesa._id, this.laMesa).
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
    if(this.laMesa.numero || this.laMesa.cantidad_inscritos ){
        return true;
      }else{
        return false;
      }
  }

}