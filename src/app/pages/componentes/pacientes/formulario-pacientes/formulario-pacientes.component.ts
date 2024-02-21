import  {Component,OnInit,Output,EventEmitter,Input} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import  {Router} from '@angular/router';
import { Empresas } from 'app/model/empresas';
import  {Pacientes} from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-formulario-pacientes',
  templateUrl: 'formulario-pacientes.component.html'
})

export class FormularioPacientesComponent{
   formCamilo:FormGroup= this.fb.group({
    id:'',
    cedula:'',
    nombre:'',
    apellidos: '',
    direccion: '',
    telefono: '',
    empresa:''
  
  });
   @Output() propagar = new EventEmitter<Object>();
   pacientes :Pacientes= new Pacientes();
   empresa:Empresas;
   filterEmpresa:any;
   filterValue:any;
  // @Output() mostrar= new EventEmitter<Object>()
  @Input() pacirecibo:Pacientes;
  constructor(public servicioservice:ServiciosService,public router:Router,public fb:FormBuilder){
   this.filterEmpresa= this.formCamilo.get('empresa').valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((val:any)=>{
      let v= this._filterEmpresa(val);
      return v;
    })
   )
 
  }

  ngOnInit(){
   
  }

  private _filterEmpresa(val:any):Observable<Empresas[]>{
  this.filterValue= val?.nombre == undefined ? val:val.nombre;
  return this.servicioservice.filtroEmpresa(this.filterValue);
  }

  displayFn(s): any {
    return s?.nombre;
  }

  

  

 public guardarPaciente(paciente:any){
 
  this.servicioservice.guardarPacientes(paciente.value).subscribe(dato =>{

    console.log(dato);
    Swal.fire("mensaje",`Paciente ${paciente.value.nombre} ${paciente.value.apellidos} guardado con exito `, 'success')
    this.formCamilo.reset();
    this.pacientes= null;
    this.irPaciente();
  })

 }
 nuevoPaciente(){
  this.formCamilo.reset();
}


  irPaciente() {
    this.propagar.emit(this.pacientes);
  }


  onSubmit():void{
    this.guardarPaciente(this.formCamilo);

  }


ngOnChanges(): void {

if(this.formCamilo){
  this.formCamilo.patchValue(this.pacirecibo)
}else
this.pacirecibo= new Pacientes;

 }



  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.

}

