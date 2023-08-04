import { Component, OnInit } from '@angular/core';
import { TypeSeat } from '../../model/type-seat.model';
import { TypeSeatService } from '../../service/type-seat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSeatResponse } from '../../response/type-seat.response';
import { CreateTypeSeatDto, UpdateTypeSeatDto } from '../../dto/type-seat.dto';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-type-seat',
  templateUrl: './type-seat.component.html',
  styleUrls: ['./type-seat.component.scss']
})
export class TypeSeatComponent implements OnInit {

  typeSeatArray: TypeSeat[] = []
  typeSeatSelected: TypeSeat[] = []
  title: string = ''
  formTypeSeat: FormGroup
  save: boolean= true


  constructor(
    private _typeSeatService: TypeSeatService,
    private modalService: NgbModal,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.formTypeSeat = this._fb.group({
      id_typeSeat: [""],
      name: ["", [Validators.required]],
      serviceAdditional: ["", [Validators.required]],
      costAdditional: ["", [Validators.required]],
      state: [""]
  })
  }

  public getAll(){
    this._typeSeatService.getAllTypeSeat()
    .subscribe((x: TypeSeatResponse) => {
      this.typeSeatArray = x.data
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }


  public getById(id: string){
    this._typeSeatService.getById(id)
    .subscribe((x: TypeSeatResponse) => {
      this.formTypeSeat.get('id_typeSeat').setValue(x.data[0].id_type_seat)
      this.formTypeSeat.get('name').setValue(x.data[0].name)
      this.formTypeSeat.get('serviceAdditional').setValue(x.data[0].serviceAdditional)
      this.formTypeSeat.get('costAdditional').setValue(x.data[0].costAdditional)
      this.formTypeSeat.get('state').setValue(x.data[0].state)
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public saveTypeSeat(){
    if(this.save){
      const typeSeatCreate: CreateTypeSeatDto = {
        name: this.formTypeSeat.controls['name'].value,
        serviceAdditional: this.formTypeSeat.controls['serviceAdditional'].value,
        costAdditional: this.formTypeSeat.controls['costAdditional'].value,
      }
      this._typeSeatService.create(typeSeatCreate)
      .subscribe((x: TypeSeatResponse) => {
        if(x.metadata.status == "201"){
          this.typeSeatAlert('Matenimiento Tipo de Asiento', x.metadata.message, 'success')
          this.modalService.dismissAll()
          this.ngOnInit()
          return
        }else{
          this.typeSeatAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
          this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
    }else{      
      const id: string= this.formTypeSeat.controls['id_typeSeat'].value
      const typeSeatUpdate: UpdateTypeSeatDto = {
        name: this.formTypeSeat.controls['name'].value,
        serviceAdditional: this.formTypeSeat.controls['serviceAdditional'].value,
        costAdditional: this.formTypeSeat.controls['costAdditional'].value,
        state: this.formTypeSeat.controls['state'].value
      }
      
      this._typeSeatService.update(typeSeatUpdate, id)
      .subscribe((x: TypeSeatResponse) => {
        if(x.metadata.status == "200"){
          this.typeSeatAlert('Matenimiento Tipo de Asiento', x.metadata.message, 'success')
          this.modalService.dismissAll()
          this.ngOnInit()
          return
        }else{
          this.typeSeatAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
          this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
    }
  }

  public delete(id: string){
    this._typeSeatService.delete(id)
    .subscribe((x: TypeSeatResponse) => {
      if(x.metadata.status == '203'){
        this.typeSeatAlert('Deleted!','Your file has been deleted.','success')
        this.ngOnInit()
      }else{
        this.typeSeatAlert('Ups, hubo un problema', x.metadata.message, 'warning')
      }
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public deleteAlert(id: string){
    Swal.fire({
      title: 'Está seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id)
      }
    })
  }

  public typeSeatAlert(title: string, description: string, value: SweetAlertIcon){
    Swal.fire(title, description, value)
  }

  onChangeSelected( event: any ){
    this.formTypeSeat.get('state').setValue(Boolean(event.target.value))
  }


  openModal(content: any, data: string = ''){
    if(data.length <= 0){
      this.save= true;
      this.title = "Crear Tipo de Asiento";
      this.formTypeSeat.get('name').setValue('');
      this.formTypeSeat.get('serviceAdditional').setValue('');
      this.formTypeSeat.get('costAdditional').setValue('');
    }else{
      this.save= false;
      this.title = "Editar Tipo de Asiento";
      this.getById(data);
    }
    this.modalService.open(content, { size: 'lg', centered: true });
  }

}
