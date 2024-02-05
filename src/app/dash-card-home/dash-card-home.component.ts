import { Component, OnInit } from '@angular/core';
import { DashCardHomeService } from '../services/dash-card-home/dash-card-home.service';

@Component({
  selector: 'app-dash-card-home',
  templateUrl: './dash-card-home.component.html',
  styleUrls: ['./dash-card-home.component.scss']
})
export class DashCardHomeComponent implements OnInit {
  cards = [
    { title: 'Haciendas Lecheras', count: 0, subtitle: 'Haciendas Lecheras' },
    { title: 'Lecheros Independientes', count: 0, subtitle: 'Lecheros Independientes' },
    { title: 'Recepcion de Leche', count: 0, subtitle: 'Recepcion de Leche' },
    { title: 'Proceso de Pasteurizacion', count: 0, subtitle: 'Proceso de Pasteurizacion' },
    { title: 'Lotes de Productos', count: 0, subtitle: 'Lotes de Productos' },
    { title: 'Proceso de Verificacion', count: 0, subtitle: 'Proceso de Verificacion' },
    { title: 'Clientes', count: 0, subtitle: 'Clientes' },
  ];

  constructor(private dashCardHomeService: DashCardHomeService) { }

  colors = ['#0760b4', '#047bd4', '#3b98e8', '#6bb8f0', '#8fd8f8', '#aefaff', '#ffc66e', '#ffc66e', '#ffe28d', '#ffffad'];

  ngOnInit(): void {

    this.dashCardHomeService.getClienteCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Clientes');
      if (card) {
        card.count = response.count;
      }
    });
   
    //los Java Spring Boot 
    this.dashCardHomeService.getHaciendaLecheraCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Haciendas Lecheras');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getLecheroIndependienteCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Lecheros Independientes');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getRecepcionLecheCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Recepcion de Leche');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getProcesoPasteurizacionCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Proceso de Pasteurizacion');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getLoteProductosCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Lotes de Productos');
      if (card) {
        card.count = response;
      }
    });
    
    this.dashCardHomeService.getProcesoVerificacionCount().subscribe(response => {
      let card = this.cards.find(card => card.title === 'Proceso de Verificacion');
      if (card) {
        card.count = response;
      }
    });

    //Si valen solo hay que mostrar en grafico de barras
    /*
    this.dashCardHomeService.getLoteProductosCountByYear(2022).subscribe(count => {
      let card = this.cards.find(card => card.title === 'Lotes de Productos');
      if (card) {
        card.count = count;
      }
    });*/

    /*
    this.dashCardHomeService.sumRecepcionLecheByYearMonth(2022, 5).subscribe(sum => {
      console.log('La suma de la leche recibida en el año 2022 y el mes 5 es:', sum);
    });*/

  }


}
