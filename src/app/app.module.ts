import { UserService } from './shared/user.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserComponent } from './user/user/user.component';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserGridDataComponent } from './user/user-grid-data/user-grid-data.component';
import { UserFormFieldComponent } from './user/user-form-field/user-form-field.component';
import { UserReactiveFormsComponent } from './user/user-reactive-forms/user-reactive-forms.component';
import { EditService } from './shared/edit.service';



@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserComponent,
    UserGridDataComponent,
    UserFormFieldComponent,
    UserReactiveFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    GridModule,
  ],
  //providers: [UserService],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
