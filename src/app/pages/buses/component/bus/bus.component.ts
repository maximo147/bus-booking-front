import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bus } from '../../model/bus.model';
import { BusService } from '../../service/bus.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusResponse } from '../../response/bus.response';
import { CreateBusDto, UpdateBusDto } from '../../dto/bus.dto';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TypeSeatService } from '../../service/type-seat.service';
import { TypeSeat } from '../../model/type-seat.model';
import { TypeSeatResponse } from '../../response/type-seat.response';
import { TypeSeatDetailService } from '../../service/type-seat-detail.service';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {
  busArray: Bus[] = []
  busSelected: Bus[] = []
  title: string = ''
  formBus: FormGroup
  save: boolean = true

  tourist: TypeSeat
  executive: TypeSeat
  premium: TypeSeat
  itemdetail: any[] = []

  cant_tourist: number
  cant_executive: number
  cant_premium: number
  cant_total: number

  constructor(
    private _busService: BusService,
    private _typeSeatService: TypeSeatService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _typeSeatDetailService: TypeSeatDetailService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.saveItems()
    this.formBus = this._fb.group({
      id_bus: [""],
      plate: ["", [Validators.required]],
      operatorName: ["", [Validators.required]],
      operatorDni: ["", [Validators.required]],
      brand: ["", [Validators.required]],
      minSeat: [20, [Validators.required, Validators.min(20), Validators.max(35)]],
      amountTourist: [0, [Validators.required]],
      amountExecutive: [0, [Validators.required]],
      amountPremium: [0, [Validators.required]],
      typeSeatDetail: [""],
      state: [""]
    })
  }

  public getAll() {
    this._busService.getAllBus()
      .subscribe((x: BusResponse) => {
        this.busArray = x.data
      }, (error) => {
        this.busAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  public getById(id: string) {
    this._busService.getById(id)
      .subscribe((x: BusResponse) => {
        this.formBus.get('id_bus').setValue(x.data[0].id_bus)
        this.formBus.get('plate').setValue(x.data[0].plate)
        this.formBus.get('operatorName').setValue(x.data[0].operatorName)
        this.formBus.get('operatorDni').setValue(x.data[0].operatorDni)
        this.formBus.get('brand').setValue(x.data[0].brand)
        this.formBus.get('minSeat').setValue(x.data[0].minSeat)
        this.formBus.get('amountTourist').setValue(x.data[0].amountTourist)
        this.formBus.get('amountExecutive').setValue(x.data[0].amountExecutive)
        this.formBus.get('amountPremium').setValue(x.data[0].amountPremium)
        //this.formBus.get('typeSeatDetail').setValue(x.data[0].)
        this.formBus.get('state').setValue(x.data[0].state)
      }, (error) => {
        this.busAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
  }

  validarAsientos(): boolean {
    let total = this.formBus.get('minSeat').value
    let tourist = this.formBus.get('amountTourist').value
    let executive = this.formBus.get('amountExecutive').value
    let premium = this.formBus.get('amountPremium').value
    if (!(total === tourist + executive + premium)) {
      this.busAlert('', 'La cantidad de asientos debe ser igual al total', 'info')
      return false
    }
    return true
  }

  public saveBus() {
    if (!this.validarAsientos()) return

    if (this.save) {


      const busCreate: CreateBusDto = {
        plate: this.formBus.controls['plate'].value,
        operatorName: this.formBus.controls['operatorName'].value,
        operatorDni: this.formBus.controls['operatorDni'].value,
        brand: this.formBus.controls['brand'].value,
        minSeat: Number(this.formBus.controls['minSeat'].value),
        amountTourist: this.formBus.controls['amountTourist'].value,
        amountExecutive: this.formBus.controls['amountExecutive'].value,
        amountPremium: this.formBus.controls['amountPremium'].value,
        typeSeatDetail: []
      }
      this._busService.create(busCreate)
        .subscribe((x: BusResponse) => {
          if (x.metadata.status == "201") {
            this.busAlert('Matenimiento Bus', x.metadata.message, 'success')
            this.modalService.dismissAll()
            this.ngOnInit()
            return
          } else {
            this.busAlert('Ups, hubo un problema', x.metadata.message, 'warning')
          }
        }, (error) => {
          this.busAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
        })

    } else {
      const id: string = this.formBus.controls['id_bus'].value
      const busUpdate: UpdateBusDto = {
        plate: this.formBus.controls['plate'].value,
        operatorName: this.formBus.controls['operatorName'].value,
        operatorDni: this.formBus.controls['operatorDni'].value,
        brand: this.formBus.controls['brand'].value,
        minSeat: Number(this.formBus.controls['minSeat'].value),
        amountTourist: this.formBus.controls['amountTourist'].value,
        amountExecutive: this.formBus.controls['amountExecutive'].value,
        amountPremium: this.formBus.controls['amountPremium'].value,
        typeSeatDetail: this.itemdetail,
        state: this.formBus.controls['state'].value
      }
      this._busService.update(busUpdate, id)
        .subscribe((x: BusResponse) => {
          if (x.metadata.status == "200") {
            this.busAlert('Matenimiento Bus', x.metadata.message, 'success')
            this.modalService.dismissAll()
            this.ngOnInit()
            return
          } else {
            this.busAlert('Ups, hubo un problema', x.metadata.message, 'warning')
          }
        }, (error) => {
          this.busAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
        })
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
        this.busAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
        return
      })
  }

  public delete(id: string) {
    this._busService.delete(id)
      .subscribe((x: BusResponse) => {
        if (x.metadata.status == '203') {
          this.busAlert('Deleted!', 'Your file has been deleted.', 'success')
          this.ngOnInit()
        } else {
          this.busAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
        this.busAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
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

  public busAlert(title: string, description: string, value: SweetAlertIcon) {
    Swal.fire(title, description, value)
  }

  onChangeSelected(event: any) {
    this.formBus.get('state').setValue(Boolean(event.target.value))
  }

  openModal(content: any, data: string = '') {
    this.itemdetail = []
    if (data.length <= 0) {
      this.save = true;
      this.title = "Crear Bus";
      this.formBus.get('plate').setValue('');
      this.formBus.get('operatorName').setValue('');
      this.formBus.get('operatorDni').setValue('');
      this.formBus.get('brand').setValue('');
      this.formBus.get('minSeat').setValue('');
      this.formBus.get('amountTourist').setValue('');
      this.formBus.get('amountExecutive').setValue('');
      this.formBus.get('amountPremium').setValue('');
      this.formBus.get('typeSeatDetail').setValue('');
    } else {
      this.save = false;
      this.title = "Editar Bus";
      this.getById(data);
    }
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
