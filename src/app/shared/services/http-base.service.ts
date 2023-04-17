import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Model } from '../entidades/model';

@Injectable({
  providedIn: 'root',
})
export class HttpBaseService<M extends Model> {
  // protected API_ADDRESS ;

  constructor(
    @Inject(HttpClient) public http: HttpClient,
    @Inject('endpoint') private endpoint: string,
    @Optional()
    @Inject('API_ADDRESS')
    private API_ADDRESS = environment.API_ADDRESS
  ) {}

  public get(): Observable<M[]> {
    return this.http
      .get(`${this.API_ADDRESS}/${this.endpoint}`)
      .pipe(map((value) => value as M[]));
  }

  public getById(id: number | string): Observable<M> {
    return this.http
      .get(`${this.API_ADDRESS}/${this.endpoint}/${id}`)
      .pipe(map((value) => value as M));
  }

  public create(value: M) {
    return this.http
      .post(`${this.API_ADDRESS}/${this.endpoint}/`, value)
      .pipe(map((value) => value as M));
  }

  public update(value: M) {
    return this.http
      .put(`${this.API_ADDRESS}/${this.endpoint}/${value.id}`, value)
      .pipe(map((value) => value as M));
  }

  public delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.API_ADDRESS}/${this.endpoint}/${id.toString()}`)
      .pipe(map(() => {}));
  }
}
