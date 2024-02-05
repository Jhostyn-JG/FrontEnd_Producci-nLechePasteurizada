import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrlCliente = 'http://localhost:3500/pedido';

  constructor(private http: HttpClient) { }

  obtenerListaConCliente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlCliente}/lista`);
  }

}
