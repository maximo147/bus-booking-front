import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itinerary } from '../../model/itinerary.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeSeatDetail } from 'src/app/pages/buses/model/type-seat-detail.model';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItineraryService } from '../../service/itinerary.service';
import { BookingDetailService } from '../../service/booking-detail.service';
import { TypeSeatDetailService } from 'src/app/pages/buses/service/type-seat-detail.service';
import { BusService } from 'src/app/pages/buses/service/bus.service';
import { BookingSocketService } from '../../service/booking-socket.service';
import { BusResponse } from 'src/app/pages/buses/response/bus.response';
import { ItineraryResponse } from '../../response/itinerary.response';
import { TypeSeatDetailResponse } from 'src/app/pages/buses/response/type-seat-detail.response';
import { BookingDetailResponse } from '../../response/booking-detail.reponse';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Bus } from 'src/app/pages/buses/model/bus.model';
import { BookingDetail } from '../../model/booking-detail.model';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {
  itineraryArray: Itinerary[] = []
  bookingDetailArray: BookingDetail[] = []
  itinerarySelected: Itinerary[] = []
  title: string = ''
  formItinerary: FormGroup
  save: boolean = true

  buses: Bus[]
  seatTypeDetails: TypeSeatDetail[]


  ciudades: string[] = ['LIMA','HUANCAYO', 'HUACHO','BARRANCA']
  statusArray: string[] = ['EN RUTA','DISPONIBLE', 'EN REPARACIÓN']
  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  
  hidden: boolean;
  fechaTotal: string

  constructor(
    private _itineraryService: ItineraryService,
    private _bookingDetailService: BookingDetailService,
    private _busService: BusService,
    private _typeSeatDetail: TypeSeatDetailService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private bookingSocket: BookingSocketService,
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getAllBus()

    this.formItinerary = this._fb.group({
      id_itinerary: [""],
      cityOrigin: [{value: "", disabled: true}, [Validators.required]],
      cityDestination: [{value: "", disabled: true}, [Validators.required]],
      hourExit: [{value: "", disabled: true}, [Validators.required]],
      hourArrival: [{value: "", disabled: true}, [Validators.required]],
      dateExit: [{value: "", disabled: true}, [Validators.required]],
      dateArrival: [{value: "", disabled: true}, [Validators.required]],
      cost: [{value: "", disabled: true}, [Validators.required]],
      idBus: [{value: "", disabled: true}, [Validators.required]],
      status: ["", [Validators.required]],
      state: [""]
    })

    this.hidden = true;
    this.fechaTotal = ''  
  }

  getAllBus() {
    this._busService.getAllBus()
    .subscribe((x: BusResponse) => {
      this.buses = x.data
    }, (error) => {
      this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public getAll() {
    this._bookingDetailService.getAllUser(localStorage.getItem('id'))
      .subscribe((x: any) => {
        this.bookingDetailArray = x.data
        console.log("dddd",x.data);
        
      }, (error) => {
        this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  public getById(id: string) {
    this._itineraryService.getById(id)
      .subscribe((x: ItineraryResponse) => {
        this.formItinerary.get('id_itinerary').setValue(x.data[0].id_itinerary)
        this.formItinerary.get('cityOrigin').setValue(x.data[0].cityOrigin)
        this.formItinerary.get('cityDestination').setValue(x.data[0].cityDestination)
        this.formItinerary.get('hourExit').setValue(x.data[0].hourExit)
        this.formItinerary.get('hourArrival').setValue(x.data[0].hourArrival)
        this.formItinerary.get('dateExit').setValue(x.data[0].dateExit)
        this.formItinerary.get('dateArrival').setValue(x.data[0].dateArrival)
        this.formItinerary.get('cost').setValue(x.data[0].cost)
        this.formItinerary.get('idBus').setValue(x.data[0].idBus.id_bus)
        this.formItinerary.get('status').setValue(x.data[0].status)
        this.formItinerary.get('state').setValue(x.data[0].state)


        
        this._typeSeatDetail.getAllByPlate(x.data[0].id_itinerary)
        .subscribe((x: TypeSeatDetailResponse) => {
          this.seatTypeDetails = x.data
        })
      
      }, (error) => {
        this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  public addCart(){
    this.bookingDetail.map(x => {
      this._bookingDetailService.create(x)
      .subscribe((x: BookingDetailResponse) => {
        this.bookingSocket.sendData(localStorage.getItem('id'))
        this.bookingDetail = []
        this.modalService.dismissAll()
      })
    })
  }

  bookingDetail: any[] = []
  bookingItem: any

  public changeStateSeat(event: any, value: any){
    this.bookingItem = {
      idTypeSeatDetail: value,
      idItinerary: this.formItinerary.get('id_itinerary').value,
      idBooking: null,
      user: {
        id_user: localStorage.getItem('id')
      }
    }
    if(event.target.checked){
      this.bookingDetail.push(this.bookingItem)
    }else{
      this.bookingDetail = this.bookingDetail.filter(x => x.idTypeSeatDetail !== value)
    }
  }


  public delete(id: string) {
    this._itineraryService.delete(id)
      .subscribe((x: ItineraryResponse) => {
        if (x.metadata.status == '203') {
          this.itineraryAlert('Deleted!', 'Your file has been deleted.', 'success')
          this.ngOnInit()
        } else {
          this.itineraryAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
        this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  public deleteAlert(id: string) {
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

  public itineraryAlert(title: string, description: string, value: SweetAlertIcon) {
    Swal.fire(title, description, value)
  }

  onChangeSelected(event: any) {
    this.formItinerary.get('state').setValue(Boolean(event.target.value))
  }

  openModal(content: any, data: string = '') {
    if (data.length <= 0) {
      this.save = true;
      this.title = "Crear Usuario";
      this.formItinerary.get('cityOrigin').setValue('');
      this.formItinerary.get('cityDestination').setValue('');
      this.formItinerary.get('hourExit').setValue('');
      this.formItinerary.get('hourArrival').setValue('');
      this.formItinerary.get('dateExit').setValue('');
      this.formItinerary.get('dateArrival').setValue('');
      this.formItinerary.get('cost').setValue('');
      this.formItinerary.get('idBus').setValue('');
      this.formItinerary.get('status').setValue('');
    } else {
      this.save = false;
      this.title = "Editar Usuario";
      this.getById(data);
    }
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  hourExit(event: any){
    this.formItinerary.get('hourExit').setValue(event.target.value)
  }

  hourArrival(event: any){
    this.formItinerary.get('hourArrival').setValue(event.target.value)
  }

  isHovered(date: NgbDate) {
    return this.fromNGDate && !this.toNGDate && this.hoveredDate && date.after(this.fromNGDate) && date.before(this.hoveredDate);
  }
  isRange(date: NgbDate) {
    return date.equals(this.fromNGDate) || date.equals(this.toNGDate) ||
      this.isInside(date) || this.isHovered(date);
  }
  
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }

  onDateSelection(date: NgbDate) {  
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.formItinerary.get('dateExit').setValue('');
      this.fechaTotal = ''
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.formItinerary.get('dateExit').setValue(this.fromDate)
      this.formItinerary.get('dateArrival').setValue(this.toDate)
      this.fechaTotal= `${this.fromDate.toLocaleDateString()} - ${this.toDate.toLocaleDateString()}`
      
      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });
   
      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.formItinerary.get('dateExit').setValue('');
      this.fechaTotal= ''
    }
  }

}
