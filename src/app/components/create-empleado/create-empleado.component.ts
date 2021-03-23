import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder, 
              private _empleadoService: EmpleadoService, 
              private _router: Router, 
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createEmpleado = this.fb.group({
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      documento: ['',Validators.required],
      salario: ['',Validators.required]
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }

  guardarEditarEmpleado(){
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }
    if(this.id === null){
      this.guardarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }
  }

  guardarEmpleado(){
    const empleado: any = {
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      // console.log('Empleado registrado con éxito');
      this.toastr.success('El Empleado fué Registrado con Éxito!!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this._router.navigate(['/list-empleados']);
    }).catch(error => {
      // console.log(error);
      this.toastr.warning(error, 'Empleado No Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
    })
    // console.log(this.createEmpleado);
    // console.log(empleado);
  }

  editarEmpleado(id: string) {
    const empleado: any = {
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El Empleado fue actualizado con éxito', 'Empleado Actualizado', {
        positionClass: 'toast-bottom-right'
      })
      this._router.navigate(['/list-empleados']);
    })
  }

  esEditar() {
    this.titulo = 'Editar Empleado';
    if(this.id !== null){
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        // console.log(data);
        // console.log(data.payload.data()['nombres']);
        this.loading = false;
        this.createEmpleado.setValue({
          nombres: data.payload.data()['nombres'],
          apellidos: data.payload.data()['apellidos'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']
        })
      })
    }
  }

}
