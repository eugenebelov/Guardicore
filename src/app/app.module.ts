import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PolygonsListComponent } from './polygons-list/polygons-list.component';
import { PolygonItemComponent } from './polygons-list/polygon-item/polygon-item.component';
import { PolygonMakerComponent } from './polygon-maker/polygon-maker.component';
import { VertexEditComponent, NumberDirective } from './polygons-list/vertex-edit/vertex-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PolygonsListComponent,
    PolygonItemComponent,
    PolygonMakerComponent,
    VertexEditComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
