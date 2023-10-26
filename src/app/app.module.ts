import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from "ngx-pagination";
import { FiltercitasPipe } from './pages/pipe/pipe/filtercitas.pipe';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FiltercitasPipe,
    
    
    




  ],
  imports: [
    BrowserAnimationsModule,
    SidebarModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
   
    

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
  
    
   
 
    
   
  ],

  providers: [],
  bootstrap: [AppComponent],
  

})
export class AppModule { }

