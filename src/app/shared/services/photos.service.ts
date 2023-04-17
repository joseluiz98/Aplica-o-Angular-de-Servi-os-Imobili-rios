import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, map, Observable } from 'rxjs';
import { createClient, Photo, PhotosWithTotalResults } from 'pexels';

import { environment } from '../../../environments/environment';

const client = createClient(environment.PEXELS_API_KEY);
const query = 'Nature';

@Injectable({
  providedIn: 'root',
})

// Classe que integra com a API de imagens da Pexels: https://www.pexels.com/pt-br/api/documentation/
export class PhotosService {
  constructor() {}

  public getImages(page: number): Observable<Photo[]> {
    return from(
      client.photos.search({
        query: 'apartamento',
        locale: 'pt-BR',
        per_page: 5,
        page: page,
      })
    ).pipe(map((response) => (response as PhotosWithTotalResults).photos));
  }
}
