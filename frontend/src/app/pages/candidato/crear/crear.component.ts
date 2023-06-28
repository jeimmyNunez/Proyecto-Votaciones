import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatoService } from '../../../servicios/candidato.service';
@Component({
  selector: 'crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_candidato: string = "";
  intentoEnvio: boolean = false;
  elCandidato: Candidato ={
    cedula: "",
    numero_resolucion: "",
    nombre: "",
    apellido: ""
  }
  constructor(private miServicioCandidato: CandidatoService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(this.rutaActiva.snapshot.params.id_candidato){
      this.modoCreacion = false;
      this.id_candidato = this.rutaActiva.snapshot.params.id_candidato;
      this.getCandidato(this.id_candidato)
    }else{
      this.modoCreacion = true;
    }
  }
  getCandidato(id:string){
    this.miServicioCandidato.getCandidato(id).
    subscribe(data => {this.elCandidato = data;
    });
  }
  agregar():void{
    if(this.validarDatosCompletos()){
      this.miServicioCandidato.crear(this.elCandidato).
      subscribe(data => {
        Swal.fire(
          'creado',
          'El candidato ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/candidato/listar"])
      });
    }
  }

  editar():void{
    if(this.validarDatosCompletos()){
      this.miServicioCandidato.editar(this.elCandidato._id, this.elCandidato).
      subscribe(data => {
        Swal.fire(
          'Actualizado',
          'El candidato ha sido actualizado Correctamente',
          'success'
        )
        this.router.navigate(["pages/candidato/listar"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio = true;
    if(this.elCandidato.cedula || this.elCandidato.numero_resolucion ||
      this.elCandidato.nombre || this.elCandidato.apellido){
        return true;
      }else{
        return false;
      }
  }

}