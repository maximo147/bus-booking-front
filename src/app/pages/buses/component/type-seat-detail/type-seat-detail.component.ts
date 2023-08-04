import { Component, OnInit } from '@angular/core';
import { Bus } from '../../model/bus.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TypeSeatDetail } from '../../model/type-seat-detail.model';
import { TypeSeatDetailService } from '../../service/type-seat-detail.service';
import { TypeSeatDetailResponse } from '../../response/type-seat-detail.response';
import { CreateTypeSeatDetailDto, UpdateTypeSeatDetailDto } from '../../dto/type-seat-detail.dto';
import { TypeSeat } from '../../model/type-seat.model';
import { TypeSeatService } from '../../service/type-seat.service';
import { Itinerary } from 'src/app/pages/booking/model/itinerary.model';
import { ItineraryService } from 'src/app/pages/booking/service/itinerary.service';
import { ItineraryResponse } from 'src/app/pages/booking/response/itinerary.response';

@Component({
  selector: 'app-type-seat-detail',
  templateUrl: './type-seat-detail.component.html',
  styleUrls: ['./type-seat-detail.component.scss']
})
export class TypeSeatDetailComponent implements OnInit {
  typeSeatDetailArray: TypeSeatDetail[] = []
  typeSeatDetailSelected: TypeSeatDetail[] = []
  title: string = ''
  formTypeSeatDetail: FormGroup
  save: boolean= true

  typeSeats: TypeSeat[]
  itinerarys: Itinerary[]

  typeSeatSelected: string
  busSelected: string


  constructor(
    private _typeSeatDetailService: TypeSeatDetailService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _typeSeatService: TypeSeatService,
    private _itineraryService: ItineraryService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getAllTypeSeat()
    this.getAllBus()
    this.formTypeSeatDetail = this._fb.group({
      id_type_seat_detail: [""],
      idTypeSeat: ["", [Validators.required]],
      idItinerary: ["", [Validators.required]],
      busy: ["", [Validators.required]],
      state: [""]
  })
  }

  getAllBus() {
    this._itineraryService.getAllItinerary()
    .subscribe((x: ItineraryResponse) => {
      this.itinerarys = x.data
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  getAllTypeSeat() {
    this._typeSeatService.getAllTypeSeat()
    .subscribe(x => {
      this.typeSeats = x.data
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public getAll(){
    this._typeSeatDetailService.getAllTypeSeatDetail()
    .subscribe((x: TypeSeatDetailResponse) => {
      this.typeSeatDetailArray = x.data
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }


  public getById(id: string){
    this._typeSeatDetailService.getById(id)
    .subscribe((x: TypeSeatDetailResponse) => {
      this.formTypeSeatDetail.get('id_type_seat_detail').setValue(x.data[0].id_type_seat_detail)
      this.formTypeSeatDetail.get('idTypeSeat').setValue(x.data[0].idTypeSeat.id_type_seat)
      this.formTypeSeatDetail.get('idItinerary').setValue(x.data[0].idItinerary.id_itinerary)
      this.formTypeSeatDetail.get('busy').setValue(x.data[0].busy)
      this.formTypeSeatDetail.get('state').setValue(x.data[0].state)
    }, (error) => {
      this.typeSeatAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public saveTypeSeatDetail(){
    if(this.save){
      const typeSeatDetailCreate: CreateTypeSeatDetailDto = {
        idTypeSeat: this.formTypeSeatDetail.controls['idTypeSeat'].value,
        idItinerary: this.formTypeSeatDetail.controls['idItinerary'].value,
        busy: this.formTypeSeatDetail.controls['busy'].value,
      }
      this._typeSeatDetailService.create(typeSeatDetailCreate)
      .subscribe((x: TypeSeatDetailResponse) => {
        if(x.metadata.status == "201"){
          this.typeSeatAlert('Matenimiento Tipo de Asiento Detalle', x.metadata.message, 'success')
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
      const id: string= this.formTypeSeatDetail.controls['id_type_seat_detail'].value
      
      const typeSeatUpdate: UpdateTypeSeatDetailDto = {
        idTypeSeat: this.formTypeSeatDetail.controls['idTypeSeat'].value,
        idItinerary: this.formTypeSeatDetail.controls['idItinerary'].value,
        busy: this.formTypeSeatDetail.controls['busy'].value,
        state: this.formTypeSeatDetail.controls['state'].value
      }
      
      this._typeSeatDetailService.update(typeSeatUpdate, id)
      .subscribe((x: TypeSeatDetailResponse) => {
        if(x.metadata.status == "200"){
          this.typeSeatAlert('Matenimiento Tipo de Asiento Detalle', x.metadata.message, 'success')
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
    this._typeSeatDetailService.delete(id)
    .subscribe((x: TypeSeatDetailResponse) => {
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

  onTypeSeatSelected(event: any){

    
  }

  onChangeSelected( event: any ){
    this.formTypeSeatDetail.get('state').setValue(Boolean(event.target.value))
  }

  openModal(content: any, data: string = ''){
    if(data.length <= 0){
      this.save= true;
      this.title = "Crear Tipo de Asiento Detalle";
      this.formTypeSeatDetail.get('idTypeSeat').setValue('');
      this.formTypeSeatDetail.get('idItinerary').setValue('');
      this.formTypeSeatDetail.get('busy').setValue('');
    }else{
      this.save= false;
      this.title = "Editar Tipo de Asiento Detalle";
      this.getById(data);
    }
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
