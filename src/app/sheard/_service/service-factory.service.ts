import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root',
})
export class ServiceFactoryService {
  baseUrl = '';
  http = inject(HttpClient);
  constructor(private config: ConfigService, private load: LoaderService) {
    this.baseUrl = this.config.apiUrl;
  }
  appPatch<T>(url: string, parameters: any) {
    return this.http.patch(this.baseUrl + url, parameters);
  }
  appPost<T>(
    url: string,
    parameters: any,
    dispalyLoader: boolean,
    headers?: any
  ) {
    if (dispalyLoader) {
      this.load.showLoader();
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    return this.http
      .post<T>(this.baseUrl + url, parameters, requestOptions)
      .pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
  }

  appPostProgress<T>(url: string, parameters: any, dispalyLoader: boolean) {
    if (parameters) {
      if (dispalyLoader) {
        this.load.showLoader();
      }
      return this.http
        .post<T>(this.baseUrl + url, parameters, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(
          finalize(() => {
            if (dispalyLoader) {
              this.load.hideLoader();
            }
          })
        );
    }
    return null;
  }

  appPut<T>(
    url: string,
    parameters: any,
    dispalyLoader: boolean,
    headers?: any
  ) {
    if (dispalyLoader) {
      this.load.showLoader();
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    return this.http
      .put<T>(this.baseUrl + url, parameters, requestOptions)
      .pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
  }
  appGet<T>(url: string, params: any, dispalyLoader: boolean) {
    if (dispalyLoader) {
      this.load.showLoader();
    }
    if (params) {
      return this.http.get<T>(this.baseUrl + url + '?' + params).pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
    } else {
      return this.http.get<T>(this.baseUrl + url).pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
    }
  }

  appGetV2<T>(url: string, params: any, dispalyLoader: boolean, headers?: any) {
    if (dispalyLoader) {
      this.load.showLoader();
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };

    if (params) {
      return this.http
        .get<T>(this.baseUrl + url + '?' + params, requestOptions)
        .pipe(
          finalize(() => {
            if (dispalyLoader) {
              this.load.hideLoader();
            }
          })
        );
    } else {
      return this.http.get<T>(this.baseUrl + url, requestOptions).pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
    }
  }

  appDownload(url: string, params: any, dispalyLoader: boolean) {
    if (dispalyLoader) {
      this.load.showLoader();
    }
    return this.http
      .get(this.baseUrl + url, {
        responseType: 'blob',
      })
      .pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
  }
  appDownloadPost(url: string, params: any, dispalyLoader: boolean) {
    if (dispalyLoader) {
      this.load.showLoader();
    }
    return this.http
      .post(this.baseUrl + url, params, {
        responseType: 'blob',
      })
      .pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
  }
  appDelete<T>(
    url: string,
    parameter: any,
    dispalyLoader: boolean,
    headers?: any,
    parametersFromBody: boolean = false,
    parameters: boolean = false
  ) {
    if (dispalyLoader) {
      this.load.showLoader();
    }

    if (parameters) {
      return this.http.delete<T>(this.baseUrl + url + '?' + parameter).pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
    }
    if (parameter) {
      if (parametersFromBody) {
        return this.http
          .delete<T>(this.baseUrl + url, {
            body: parameter,
            headers: new HttpHeaders(headers),
          })
          .pipe(
            finalize(() => {
              if (dispalyLoader) {
                this.load.hideLoader();
              }
            })
          );
      }
      return this.http.delete<T>(this.baseUrl + url + `/${parameter}`).pipe(
        finalize(() => {
          if (dispalyLoader) {
            this.load.hideLoader();
          }
        })
      );
    }

    return this.http.delete<T>(this.baseUrl + url).pipe(
      finalize(() => {
        if (dispalyLoader) {
          this.load.hideLoader();
        }
      })
    );
  }
}
