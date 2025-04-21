import { APP_INITIALIZER, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './ui/products/products.component';
import { CustomersComponent } from './ui/customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService,KeycloakAngularModule } from 'keycloak-angular';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'test-1',
        clientId: 'angular-client'
      },
      initOptions: {
        onLoad: 'login-required',  // Changed from check-sso
        pkceMethod: 'S256',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets'],      
    }).then(() => {
      console.log('✅ Keycloak initialized');
    });
}


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {provide : APP_INITIALIZER, useFactory : initializeKeycloak, multi :true, deps : [KeycloakService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
