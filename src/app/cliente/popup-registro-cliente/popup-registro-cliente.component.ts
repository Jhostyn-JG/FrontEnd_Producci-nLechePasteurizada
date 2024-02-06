import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-popup-registro-cliente',
  templateUrl: './popup-registro-cliente.component.html',
  styleUrls: ['./popup-registro-cliente.component.scss']
})
export class PopupRegistroClienteComponent implements OnInit {

  form_Cliente: FormGroup;
  dataSource: any[] = [];
  displayedColumns: string[] = ['cedula_cliente', 'nombres', 'apellidos', 'celular', 'correo', 'direccion', 'acciones'];
  @ViewChild(MatTable) table!: MatTable<any>;

  inputdata: any;
  private clienteServiceSubscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataCliente: any,
    private ref: MatDialogRef<PopupRegistroClienteComponent>,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.form_Cliente = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchData();

    this.inputdata = this.dataCliente;
    if (this.inputdata.formData) {
      this.edit(this.inputdata.formData);
    }
  }

  private buildForm() {
    this.form_Cliente = this.formBuilder.group({
      cedula_cliente: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  fetchData() {
    this.clienteService.getAllClientes().subscribe((response: any) => {
      this.dataSource = response;
      if (this.table) {
        this.table.renderRows();
      }
    }, (error: any) => {
      console.error(error);
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form_Cliente.valid) {
      const value = this.form_Cliente.value;
      this.buildForm();
      this.closepopup();
    } else {
      this.form_Cliente.markAllAsTouched();
    }
  }

  editingId: string | null = null; // Change this line

  submitForm() {
    if (this.form_Cliente.valid) {
      const value = this.form_Cliente.value;
      if (this.editingId) { // And this line
        this.clienteServiceSubscription = this.clienteService.updateCliente(this.editingId, value).subscribe( // And this line
          response => {
            console.log(response);
            this.fetchData();
            this.editingId = null; // And this line
            this.form_Cliente.reset();
          },
          error => {
            console.error(error);
          }
        );
      } else {
        this.clienteServiceSubscription = this.clienteService.createCliente(value).subscribe(
          response => {
            console.log(response);
            this.fetchData();
            this.form_Cliente.reset();
          },
          error => {
            console.error(error);
          }
        );
      }
    } else {
      this.form_Cliente.markAllAsTouched();
    }
  }

  
  delete(id: string) { // Change this line
    this.clienteService.deleteCliente(id).subscribe(response => { // And this line
      console.log(response);
      this.fetchData();
    }, (error) => {
      console.error(error);
    });
  }

  edit(dataCliente: any) {
    this.editingId = dataCliente._id; // And this line
    if (!this.form_Cliente) {
      this.buildForm();
    }
    this.form_Cliente.setValue(
      {
        cedula_cliente: dataCliente.cedula_cliente || '',
        nombres: dataCliente.nombres || '',
        apellidos: dataCliente.apellidos || '',
        celular: dataCliente.celular || '',
        correo: dataCliente.correo || '',
        direccion: dataCliente.direccion || ''
      });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

}
