import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { PacientesComponent }       from 'app/pages/componentes/pacientes/pacientes.component';
import { ServiciosComponent }       from 'app/pages/componentes/servicios/servicios.component';
import { CitasComponent } from 'app/pages/componentes/citas/citas.component';
import { CirugiasComponent } from 'app/pages/componentes/cirugias/cirugias.component';
import { CitasDetaComponent } from 'app/pages/componentes/citasdeta/citasdeta.component';
import { EstadosComponent } from 'app/pages/componentes/estados/estados.component';
import { FormularioServiciosComponent } from 'app/pages/componentes/servicios/formulario-servicios/formulario-servicios.component';
import { FormularioPacientesComponent } from  'app/pages/componentes/pacientes/formulario-pacientes/formulario-pacientes.component';
import { FormularioCitasComponent}      from 'app/pages/componentes/citas/formulario-citas/formulario-citas.component';
import { FormularioCirugiaComponent } from 'app/pages/componentes/cirugias/formulario-cirugias/formulario-cirugias.component';

import { FormularioCitasDetaComponent}      from 'app/pages/componentes/citasdeta/formulario-citasdeta/formulario-citasdeta.component';
import { FormularioEstadosComponent } from 'app/pages/componentes/estados/formulario-estados/formulario-estados.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from 'app/pages/componentes/usuarios/login.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,

    NgbModule,NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    PacientesComponent,
    ServiciosComponent,
    CitasComponent,
    CirugiasComponent,
    CitasDetaComponent,
    
    EstadosComponent,
    LoginComponent,
    FormularioServiciosComponent,
    FormularioPacientesComponent,
    FormularioCitasComponent,
    FormularioCirugiaComponent,
    FormularioCitasDetaComponent,
   FormularioEstadosComponent
    
    ]
})

export class AdminLayoutModule {}
