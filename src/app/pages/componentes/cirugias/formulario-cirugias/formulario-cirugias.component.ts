import { Component, Input, Output,EventEmitter} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Cirugias } from "app/model/cirugias";
import { Citas } from "app/model/citas";
import { Estados } from "app/model/estados";
import { Servicios } from "app/model/servicios";
import { ServiciosService } from "app/services/servicios.service";
import Swal from "sweetalert2";

@Component({
    selector:'app-formulario-cirugias',
    templateUrl:'formulario-cirugias.component.html'
})

export class FormularioCirugiaComponent{
    formCirugia:FormGroup;
    cirugia:Cirugias= new Cirugias();
    @Input() cirugiare: Cirugias;   
    @Output() propagar= new EventEmitter<Object>();
    estados:Estados[];
    servicios:Servicios[];
    tamano:number=8;
    total:number=0;
    p:number=1;
    idPacienteUrl:any;
    


    constructor(public serviceservicio:ServiciosService,public router:Router,public route:ActivatedRoute,public fb:FormBuilder){
        this.idPacienteUrl=this.route.snapshot.paramMap.get('id')
        this.formCirugia=this.fb.group({
            id:'',
            fecha:['', [Validators
                .required,
                // validates date format yyyy-mm-dd with regular expression
                Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
            ]],
            estado:'',
            servicio:''
        })

    }

    ngOnInit(){
       this.listarEstados();
        this.listServiciosp();
    }

    resetCx(){
        return this.cirugia=null;
    }
    
    agregarcirugia(cirugia:any){
        cirugia.value.paciente={'id':this.idPacienteUrl};
         this.serviceservicio.guardarCirugia(cirugia.value).subscribe((dato)=>{
            console.log(dato);
            Swal.fire('mensaje',`la cirugia se asigno en la fecha ${cirugia.value.fecha} correctamente`,'success');
            this.formCirugia.reset();
            this.cirugia=null;
           this.propagarCirugia();

        })
    }
    

   OnSubmit():void{
        this.agregarcirugia(this.formCirugia);
    }
    propagarCirugia(){
      this.propagar.emit(this.cirugia);}
        
  ngOnChanges():void{
        if(this.cirugiare){
            this.formCirugia.patchValue(this.cirugiare);
        }
        else
            this.cirugia= new Cirugias();{}
        

    }
   
    listServiciosp(){
        this.serviceservicio.listserviciosp().subscribe(dato=>
          {
            console.log('servi123',this.servicios=dato)
          })
      }   
    seleccionServicios(s1:Servicios,s2:Servicios){
        return  s1==undefined || s2== undefined ?false: s1.eid === s2.eid ;
       }
   
    
    seleccionEstados(e1:Estados,e2:Estados){
        return  e1== undefined || e2== undefined  ?false: e1.id===e2.id
     
        }
     
    listarEstados(){
        this.serviceservicio.listarEstados(this.p,this.tamano).subscribe((dato:any)=> {
            console.log(dato);
            setTimeout(()=>{
                this.estados=dato.content;
                this.total=dato.totalElements;
            })
        })
    }



}