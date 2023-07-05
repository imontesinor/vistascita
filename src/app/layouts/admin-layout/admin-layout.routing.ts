import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { PacientesComponent } from 'app/pages/componentes/pacientes/pacientes.component';
import { Servicios } from 'app/model/servicios';
import { ServiciosComponent } from 'app/pages/componentes/servicios/servicios.component';
import { CitasComponent } from 'app/pages/componentes/citas/citas.component';
import { CitasDetaComponent } from 'app/pages/componentes/citasdeta/citasdeta.component';
import { EstadosComponent } from 'app/pages/componentes/estados/estados.component';
import { LoginComponent } from 'app/pages/componentes/usuarios/login.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { RoleGuard } from 'app/guards/role.guard';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'citas/:id',      component: CitasComponent },
    { path: 'citasdeta',      component: CitasDetaComponent },
    { path: 'pacientes',      component: PacientesComponent },
    { path: 'servicios',      component: ServiciosComponent, canActivate:[AuthGuard,RoleGuard], data:{role:'ROLE_ADMIN'}},
    { path: 'estados',        component:EstadosComponent, canActivate:[AuthGuard,RoleGuard], data:{role:'ROLE_ADMIN'}},
    { path: 'login',          component:LoginComponent}
];
