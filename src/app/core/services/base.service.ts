import { Observable, of } from "rxjs";
import {catchError} from 'rxjs/operators'
import { IBase } from "../interface/IBase";
import {HttpClient} from "@angular/common/http"
import { handleError } from "../utils/handleError";

export abstract class BaseService<T,ID> implements IBase<T,ID> {

constructor(protected http: HttpClient, protected path: string) { }
  save(t: T): Observable<T> {
    return this.http.post<T>(this.path, t)
    .pipe(catchError(handleError<T>('createOperation')));
  }
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.path)
    .pipe(catchError(handleError<T []>('getAllOperation')));
  }
  update(id: ID, t: T): Observable<T> {
    return this.http.put<T>(`${this.path}/${id}`, t)
    .pipe(catchError(handleError<T>('updateOperation')));
  }
  delete(id: ID): Observable<T> {
    return this.http.delete<T>(`${this.path}/${id}`)
    .pipe(catchError(handleError<T>('deleteOperation')));
  }

}
