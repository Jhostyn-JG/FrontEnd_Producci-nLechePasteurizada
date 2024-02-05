import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PedidosService } from '../services/pedidos/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit{

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombre_cliente', 'cantidad_solicitada', 'fecha_entrega', 'estado', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private pedidosServiceSubscription: Subscription | undefined;
  constructor(private http: HttpClient, private dialog: MatDialog,
    private pedidosService: PedidosService){}


  ngOnInit(): void {
     this.fetchData();
  }

  fetchData() {
    this.pedidosService.obtenerListaConCliente().subscribe((response: any) => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  addPedido(){}
  delete(id: string){}

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
