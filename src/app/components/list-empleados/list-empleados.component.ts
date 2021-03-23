import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      // console.log(data);
      this.empleados = [];
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.empleados.push({
          // Creando una copia con la data aplicandole el ID de cada registro
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.empleados);
    });
  }

  deleteEmpleado(id: string){
    this._empleadoService.deleteEmpleado(id).then(() => {
      console.log('Empleado eliminado con éxito!!');
      this.toastr.error('Empleado fue eliminado con éxito!!', 'Registro Eliminado', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
