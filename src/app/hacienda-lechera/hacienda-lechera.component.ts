import { ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { MatTable, MatTableDataSource } from "@angular/material/table";

//importaciones nuevas 
import { HaciendaLecheraService } from '../services/hacienda-lechera/hacienda-lechera.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupRegistroHlComponent } from './popup-registro-hl/popup-registro-hl.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-hacienda-lechera',
  templateUrl: './hacienda-lechera.component.html',
  styleUrls: ['./hacienda-lechera.component.scss']
})
export class HaciendaLecheraComponent implements OnInit {


  form_HaciendaLechera: FormGroup;
  //  dataSource: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombreHacienda', 'ruc', 'direccion', 'telefonoEmpresa', 'email', 'responsable', 'telefonoContacto', 'fechaCompra', 'detallesSuministro', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  disableSelect = new FormControl(false);
  private haciendaLecheraServiceSubscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog,
    private haciendalechera: HaciendaLecheraService) {
    this.form_HaciendaLechera = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  private buildForm() {
    this.form_HaciendaLechera = this.formBuilder.group({
      codHacienda:[''],
      nombreHacienda: [''],
      ruc: [''],
      direccion: [''],
      telefonoEmpresa: [''],
      email: [''],
      responsable: [''],
      telefonoContacto: [''],
      fechaCompra: [''],
      detallesSuministro: [{ value: '', disabled: this.disableSelect.value }]
    });
  }





  fetchData() {
    this.haciendalechera.getAllHaciendaLechera().subscribe((response: any) => {
      // this.dataSource = response;
      //this.table.renderRows();
      this.dataSource = new MatTableDataSource(response); // Usa MatTableDataSource aquí
      this.dataSource.paginator = this.paginator; // Asigna el paginador después de actualizar los datos
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }


  /*
    save(event: Event) {
        event.preventDefault();
      if (this.form_HaciendaLechera.valid) {
        const value = this.form_HaciendaLechera.value;
        this.buildForm();
      } else {
        this.form_HaciendaLechera.markAllAsTouched();
      }
    }*/


/*

  submitForm() {
    if (this.form_HaciendaLechera.valid) {
      const value = this.form_HaciendaLechera.value;
      if (this.editingRuc) {
        this.http.put(`http://localhost:8080/haciendaLechera/update/${this.editingRuc}`, value).subscribe(response => {
          console.log(response);
          this.fetchData();
          this.editingRuc = null;
          this.form_HaciendaLechera.reset();
        }, error => {
          console.error(error);
        });
      } else {
        this.http.post('http://localhost:8080/haciendaLechera/add', value).subscribe(response => {
          console.log(response);
          this.fetchData();
          this.form_HaciendaLechera.reset();
        }, error => {
          console.error(error);
        });
      }
    } else {
      this.form_HaciendaLechera.markAllAsTouched();
    }
  }*/


  editingcodHacienda: string | null = null;

  edit(dataHacLechera: any) {
    this.editingcodHacienda = dataHacLechera.codHacienda;
    this.form_HaciendaLechera.setValue(
      {
        codHacienda: dataHacLechera.codHacienda || '',
        nombreHacienda: dataHacLechera.nombreHacienda || '',
        ruc: dataHacLechera.ruc || '',
        direccion: dataHacLechera.direccion || '',
        telefonoEmpresa: dataHacLechera.telefonoEmpresa || '',
        email: dataHacLechera.email || '',
        responsable: dataHacLechera.responsable || '',
        telefonoContacto: dataHacLechera.telefonoContacto || '',
        fechaCompra: dataHacLechera.fechaCompra || '',
        detallesSuministro: dataHacLechera.detallesSuministro || ''
      });

        // Open the dialog with the form data
    this.Openpopup(this.form_HaciendaLechera.value, 'Editar Hacienda Lechera', PopupRegistroHlComponent);

  }

 


  delete(codHacienda: string) {
    this.haciendalechera.deleteHaciendaLechera(codHacienda).subscribe(response => {
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }



  getSuministroDisplayValue(suministro: string): string {
    switch (suministro) {
      case 'suministroCompleto':
        return 'Suministro Completo';
      case 'suministroIncompleto':
        return 'Suministro Incompleto';
      default:
        return suministro;
    }
  }

  addhaciendaleche() {
    this.Openpopup(0, 'Añadir Hacienda Lechera', PopupRegistroHlComponent);
  }

  Filterchange(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Ventana de dialogo dataHacLechera
  Openpopup(dataHacLechera: any, title: any, PopupRegistroHlComponent: any) {
    const dialogRef = this.dialog.open(PopupRegistroHlComponent, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        formData: dataHacLechera  // Pass the form data
      }
    });

    dialogRef.afterClosed().subscribe(item => {
      console.log(item);
      this.fetchData();
    });

  }
}
