import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FormSearchComponent} from './form-search/form-search.component';
import {UserSearchService} from './service/user-search.service';

@NgModule({
    declarations: [
        AppComponent,
        FormSearchComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        UserSearchService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
