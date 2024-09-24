import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor, MsalGuard } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AppComponent } from './app.component';
import { MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';

import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile.component';

const msalInstance = new PublicClientApplication({
    auth: {
        clientId: '99ea6322-d0e2-4ed4-adbb-76f445156b6a', // Reemplaza con tu ID de cliente
        authority: 'https://login.microsoftonline.com/ade2a7e2-b696-4ca4-94e6-fb6e8be85738', // Reemplaza con tu ID de inquilino
        redirectUri: 'http://localhost:4200/', // URI de redirección
    },
});

export function MSALGuardConfigFactory() {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: {
            scopes: ['user.read']
        }
    };
}

export function MSALInterceptorConfigFactory() {
    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
            ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
    };
}

@NgModule({
    declarations: [AppComponent,
    HomeComponent,
    ProfileComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        MsalModule.forRoot(
            msalInstance,
            {
                interactionType: InteractionType.Redirect,
                authRequest: {
                    scopes: ['user.read']
                }
            },
            {
                interactionType: InteractionType.Redirect,
                protectedResourceMap: new Map([
                    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
                ])
            }
        )
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        MsalGuard,
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}