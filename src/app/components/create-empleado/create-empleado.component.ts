import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private _empleadoService: EmpleadoService, private _router: Router) { 
    this.createEmpleado = this.fb.group({
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      documento: ['',Validators.required],
      salario: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardarEmpleado(){
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }
    const empleado: any = {
      nombres: this.createEmpleado.value.nombres,
      apellidos: this.createEmpleado.value.apellidos,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      console.log('Empleado registrado con éxito');
      this._router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
    })
    // console.log(this.createEmpleado);
    // console.log(empleado);
  }

}
