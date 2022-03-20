import { EventLogComponent } from './user-ui/event-log.component';
import { DepartmentService } from './shared/department.service';
import { UserService } from './shared/user.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { UserUIComponent } from './user-ui/user-ui.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@progress/kendo-angular-editor';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { UploadComponent } from './upload/upload.component';




@NgModule({
  declarations: [
    AppComponent,
    UserUIComponent,
    UploadComponent,
    EventLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    GridModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    ButtonsModule,
    DropDownsModule,
    TreeViewModule,
    NotificationModule,
    NgbModule,
    EditorModule,
    UploadsModule,
  ],
  providers: [UserService, DepartmentService],
  // providers: [
  //   {
  //     deps: [HttpClient],
  //     provide: EditService,
  //     useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
  //   },
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
