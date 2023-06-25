import { Observable, of } from "rxjs";

/**
 * Fonction pour cacher les erreurs
 */
export function handleError<T>(operation = 'operation') {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);

    return of(error as T);
  };
}
