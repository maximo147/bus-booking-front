import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Itinerary } from '../../model/itinerary.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/pages/users/model/role.model';
import { RoleService } from 'src/app/pages/users/service/role.service';
import { NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleResponse } from 'src/app/pages/users/response/role.response';
import { CreateItineraryDto, UpdateItineraryDto } from '../../dto/itinerary.dto';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ItineraryService } from '../../service/itinerary.service';
import { ItineraryResponse } from '../../response/itinerary.response';
import { BusService } from 'src/app/pages/buses/service/bus.service';
import { BusResponse } from 'src/app/pages/buses/response/bus.response';
import { Bus } from 'src/app/pages/buses/model/bus.model';
import { TypeSeatResponse } from 'src/app/pages/buses/response/type-seat.response';
import { TypeSeat } from 'src/app/pages/buses/model/type-seat.model';
import { TypeSeatService } from 'src/app/pages/buses/service/type-seat.service';
import { TypeSeatDetail } from 'src/app/pages/buses/model/type-seat-detail.model';
import { TypeSeatDetailService } from 'src/app/pages/buses/service/type-seat-detail.service';
import { TypeSeatDetailResponse } from 'src/app/pages/buses/response/type-seat-detail.response';
import { UpdateBusDto } from 'src/app/pages/buses/dto/bus.dto';
import { CreateTypeSeatDetailDto } from 'src/app/pages/buses/dto/type-seat-detail.dto';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  itineraryArray: Itinerary[] = []
  itinerarySelected: Itinerary[] = []
  title: string = ''
  formItinerary: FormGroup
  save: boolean = true

  buses: Bus[]
  busSelected: Bus[]

  ciudades: string[] = ['LIMA', 'HUANCAYO', 'HUACHO', 'BARRANCA']
  statusArray: string[] = ['EN RUTA', 'DISPONIBLE', 'EN REPARACIÓN']
  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  hidden: boolean;
  fechaTotal: string

  tourist: TypeSeat
  executive: TypeSeat
  premium: TypeSeat
  itemdetail: any[] = []

  cant_tourist: number
  cant_executive: number
  cant_premium: number
  cant_total: number

  constructor(
    private _itineraryService: ItineraryService,
    private _typeSeatService: TypeSeatService,
    private _typeSeatDetailService: TypeSeatDetailService,
    private _busService: BusService,
    private modalService: NgbModal,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getAllBus()
    this.saveItems()
    this.formItinerary = this._fb.group({
      id_itinerary: [""],
      cityOrigin: ["", [Validators.required]],
      cityDestination: ["", [Validators.required]],
      hourExit: ["", [Validators.required]],
      hourArrival: ["", [Validators.required]],
      dateExit: ["", [Validators.required]],
      dateArrival: ["", [Validators.required]],
      cost: ["", [Validators.required]],
      idBus: ["", [Validators.required]],
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

  getByIdBus(event: any) {
    this._busService.getById(event.target.value)
      .subscribe((x: BusResponse) => {
        this.busSelected = x.data
      }, (error) => {
        this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  public getAll() {
    this._itineraryService.getAllItinerary()
      .subscribe((x: ItineraryResponse) => {
        this.itineraryArray = x.data
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
        const val = {
          target: {
            value: x.data[0].idBus.id_bus
          }
        }
        this.getByIdBus(val)
      }, (error) => {
        this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  public saveItinerary() {
    if (this.save) {

      this.cant_tourist = this.busSelected[0].amountTourist
      this.cant_executive = this.busSelected[0].amountExecutive
      this.cant_premium = this.busSelected[0].amountPremium

      const seatTypes = [
        { count: this.cant_tourist, type: this.tourist },
        { count: this.cant_executive, type: this.executive },
        { count: this.cant_premium, type: this.premium }
      ];

      for (const seatType of seatTypes) {
        for (let index = 0; index < seatType.count; index++) {
          const typeSeatDetail: any = {
            busy: "LIBRE",
            idTypeSeat: {
              id_type_seat: seatType.type.id_type_seat
            }
          };

          this.itemdetail.push(typeSeatDetail)
        }
      }

      const itineraryCreate: CreateItineraryDto = {
        cityOrigin: this.formItinerary.controls['cityOrigin'].value,
        cityDestination: this.formItinerary.controls['cityDestination'].value,
        hourExit: this.formItinerary.controls['hourExit'].value,
        hourArrival: this.formItinerary.controls['hourArrival'].value,
        dateExit: this.formItinerary.controls['dateExit'].value,
        dateArrival: this.formItinerary.controls['dateArrival'].value,
        cost: this.formItinerary.controls['cost'].value,
        idBus: this.formItinerary.controls['idBus'].value,
        status: this.formItinerary.controls['status'].value,
        typeSeatDetail: this.itemdetail
      }


      this._itineraryService.create(itineraryCreate)
        .subscribe((x: ItineraryResponse) => {
          if (x.metadata.status == "201") {
            this.itineraryAlert('Matenimiento Itinerario', x.metadata.message, 'success')
            this.modalService.dismissAll()
            this.ngOnInit()
            return
          } else {
            this.itineraryAlert('Ups, hubo un problema', x.metadata.message, 'warning')
          }
        }, (error) => {
          this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
        })
    } else {
      const id: string = this.formItinerary.controls['id_itinerary'].value
      this.cant_tourist = this.busSelected[0].amountTourist
      this.cant_executive = this.busSelected[0].amountExecutive
      this.cant_premium = this.busSelected[0].amountPremium

      const seatTypes = [
        { count: this.cant_tourist, type: this.tourist },
        { count: this.cant_executive, type: this.executive },
        { count: this.cant_premium, type: this.premium }
      ];

      for (const seatType of seatTypes) {
        for (let index = 0; index < seatType.count; index++) {
          const typeSeatDetail: any = {
            busy: "LIBRE",
            idTypeSeat: {
              id_type_seat: seatType.type.id_type_seat
            }
          };

          this.itemdetail.push(typeSeatDetail)
        }
      }

      const itineraryUpdate: UpdateItineraryDto = {
        cityOrigin: this.formItinerary.controls['cityOrigin'].value,
        cityDestination: this.formItinerary.controls['cityDestination'].value,
        hourExit: this.formItinerary.controls['hourExit'].value,
        hourArrival: this.formItinerary.controls['hourArrival'].value,
        dateExit: this.formItinerary.controls['dateExit'].value,
        dateArrival: this.formItinerary.controls['dateArrival'].value,
        cost: this.formItinerary.controls['cost'].value,
        idBus: this.formItinerary.controls['idBus'].value,
        status: this.formItinerary.controls['status'].value,
        state: this.formItinerary.controls['state'].value,
        typeSeatDetail: this.itemdetail
      }

      this._itineraryService.update(itineraryUpdate, id)
        .subscribe((x: ItineraryResponse) => {
          if (x.metadata.status == "201") {
            this.itineraryAlert('Matenimiento Itinerario', x.metadata.message, 'success')
            this.modalService.dismissAll()
            this.ngOnInit()
            return
          } else {
            this.itineraryAlert('Ups, hubo un problema', x.metadata.message, 'warning')
          }
        }, (error) => {
          this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
        })
      /*
      this._typeSeatDetailService.deleteByIdBus(id)
        .subscribe((x: TypeSeatDetailResponse) => {
          if (x.metadata.status == '200') {
            console.log("BORRADO");
          }
        })
        */
    }
  }

  public saveItems() {
    this._typeSeatService.getAllTypeSeat()
      .subscribe((x: TypeSeatResponse) => {
        if (x.metadata.status === '200') {
          x.data.map(value => {
            if (value.name === 'Turista') {
              this.tourist = value
            }
            if (value.name === 'Ejecutivo') {
              this.executive = value
            }
            if (value.name === 'Premium') {
              this.premium = value
            }
          })
        }
      }, (error) => {
        this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
        return
      })
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
      this.title = "Crear Itinerario";
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
      this.title = "Editar Itinerario";

      this.getById(data);
    }
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  hourExit(event: any) {
    this.formItinerary.get('hourExit').setValue(event.target.value)
  }

  hourArrival(event: any) {
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
      this.fechaTotal = `${this.fromDate.toLocaleDateString()} - ${this.toDate.toLocaleDateString()}`

      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });

      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.formItinerary.get('dateExit').setValue('');
      this.fechaTotal = ''
    }
  }
}