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

  obtenerDetallePedido(idPedido: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlPedido}/detallePedido/${idPedido}`);
  }

  createPedido(dataPedido: any): Observable<any> {
    return this.http.post(`${this.baseUrlPedido}`, dataPedido);
  }

  abastecerPedido(dataForm: any): Observable<any> {
    return this.http.post(`${this.baseUrlPedido}/abastecerPedido`, dataForm);
  }
  
  estadoEntregado(data:any): Observable<any> {
    return this.http.post(`${this.baseUrlPedido}/entregar/`, data);
  }

  

}
