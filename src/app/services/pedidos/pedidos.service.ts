import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrlPedido = 'http://localhost:3500/pedido';

  constructor(private http: HttpClient) { }

  obtenerListaConCliente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlPedido}/lista`);
  }

  createPedido(dataPedido: any): Observable<any> {
    return this.http.post(`${this.baseUrlPedido}`, dataPedido);
  }

  
/*
  obtenerListaConCliente(): Observable<any[]> {
    // Reemplaza la URL con la correcta que tu servidor backend espera para obtener todos los pedidos
    return this.http.get<any[]>(this.baseUrlCliente);
  }*/

}
