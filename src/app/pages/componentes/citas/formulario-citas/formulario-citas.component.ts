import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Citas } from 'app/model/citas';
import { Pacientes } from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';
import { Estados } from 'app/model/estados';
import { Observable, Subject, throwError } from 'rxjs'
import { startWith, map, debounceTime, distinctUntilChanged, switchMap, filter, catchError } from 'rxjs/operators';
import { Servicios } from 'app/model/servicios';
import { error } from 'console';
import { errorMonitor } from 'events';





@Component({
  selector: 'app-formulario-citas',

  templateUrl: 'formulario-citas.component.html'
})


export class FormularioCitasComponent implements OnInit {
  formCitas: FormGroup = this.fb.group({
    id: '',
    servicio: '',
    estado: '',

    fecha: ['', [
      Validators
        .required,
      Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
    ]]
  });

  idPaciente;

  servicio: Servicios;
  p: number = 1;
  tamano: number = 8;
  total: number = 0;
  cita: Citas = new Citas;
  paciente: Pacientes;
  //dateControl: '';
  selectItem: string;
  estados: Estados[];
  // filtroServicios: Observable<Servicios[]>;
  filtroServicios: any;

  options: Servicios[] = [];
  //options: User[] = [{ nombre: 'Oftalmologia'},{nombre: 'retina'}];
  estado: Estados;
  query: string = '';
  //clickSubjet = new Subject<string>();
  servi: Servicios;
  filterValue: any



  @Input() citarecibo: Citas;


  @Output() propagarCita = new EventEmitter<Object>();
  idPacienteUrl: any;
  constructor(public servicioservice: ServiciosService, public router: Router, public route: ActivatedRoute, public fb: FormBuilder) {

    this.filtroServicios = this.formCitas.get('servicio').valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val: any) => {
        let filtro = this._filterServices(val);
        return filtro;
      })
    );


    this.idPacienteUrl = this.route.snapshot.paramMap.get('id');


  }

  onOptionSelected(event: any) {
    const selectedOption: any = event.option.value;
    console.log('Selected option: ' + selectedOption);
  }

  private _filterServices(val: any): Observable<Servicios[]> {
    this.filterValue = val?.nombre == undefined ? val : val.nombre;
    return this.servicioservice.filtrarNombreServicio(this.filterValue);
  }






  ngOnInit(): void {

    this.listarEstados();

  }

  displayFn(s): any {
    return s?.nombre;
  }


  guardarCitas(cita: any) {
    console.log('guardarCitas', cita.value);
    cita.value.paciente = { 'id': this.idPacienteUrl };
    
   
   
 this.servicioservice.guardarCita(cita.value).subscribe(dato => {
      console.log(dato);
      Swal.fire(`Cita asignada con fechab ${cita.value.fecha} correctamente `,'success')
      
      this.formCitas.reset();
      this.cita = null;
      this.irCitas();


    })

  }

  nuevoReset() {
    this.formCitas.reset();
  }
  irCitas() {
    this.propagarCita.emit(this.cita);
  }

  listServiciosp() {
    this.servicioservice.listserviciosp().subscribe(dato => {
      console.log('servi123', this.options = dato)
    })
  }


  listarEstados() {
    this.servicioservice.listarEstados(this.p, this.tamano).subscribe((dato: any) => {
      console.log(dato);
      setTimeout(() => {
        this.estados = dato.content
        this.total = dato.totalElements
      })
    })
  }



  onSubmit(): void {
    this.guardarCitas(this.formCitas);
  }
  comparaServicio(s1: Servicios, s2: Servicios) {
    return s1 == undefined || s2 == undefined ? false : s1.eid === s2.eid;
  }



  seleccionEstado(e1: Estados, e2: Estados) {
    return e1 == undefined || e2 == undefined ? false : e1.id === e2.id

  }



  ngOnChanges(): void {
    if (this.citarecibo) {
      this.formCitas.patchValue(this.citarecibo);
    }
    else this.cita = new Citas(); {

    }

  }

}
