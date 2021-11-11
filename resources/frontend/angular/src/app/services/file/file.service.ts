import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { FileModel } from 'src/app/models/File.model';

const API = 'http://localhost/api/v1/files';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<FileModel[]>(API);
  }

  get(id: string) {
    return this.httpClient.get<FileModel>(`${API}/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete<FileModel>(`${API}/${id}`);
  }

  create(data: FileModel) {
    return this.httpClient.post<FileModel>(API, data);
  }

  update(id: string, data: FileModel) {
    return this.httpClient.put<FileModel>(`${API}/${id}`, data);
  }
}
