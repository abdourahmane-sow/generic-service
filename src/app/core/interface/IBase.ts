import { Observable } from "rxjs";

export interface IBase<T,ID> {
  save(t:T): Observable<T>
  getAll(): Observable<T[]>
  update(id:ID,t:T): Observable<T>
  delete(id:ID): Observable<T>
}
