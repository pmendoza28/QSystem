import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, retry, timeout } from "rxjs/operators";
import { CredentialsService } from "../shared/services/credentials.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private credentialsService: CredentialsService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let { token } = this.credentialsService.userInformation()
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(error)
                })
            )
        }
    }

}