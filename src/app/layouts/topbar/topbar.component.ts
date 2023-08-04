import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { BookingSocketService } from 'src/app/pages/booking/service/booking-socket.service';
import { Subject, interval } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { BookingDetailService } from 'src/app/pages/booking/service/booking-detail.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/pages/booking/service/booking.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  public cart$  = this.bookingSocket._obj

  name: string = ''
  subject: Subject<any> = new Subject()

  data: any;
  minutes:number = 0;
  seconds: number = new Date().getSeconds(); //7
  constructor(
    @Inject(DOCUMENT) private document: any, 
    private router: Router, 
    private bookingSocket: BookingSocketService,
    private modalService: NgbModal,
    private readonly _bookingDetailService: BookingDetailService,
    private readonly _bookingService: BookingService,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService) {
  }



  openMobileMenu: boolean;



  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  subtotal: number = 0.0
  aditional: number = 0.0
  total: number = 0.0

  ngOnInit() {
    this.cart$
    .subscribe(value => {
      this.data= value   
      this.updateCost()   
    })

    this.subject
    .subscribe(() => {
      this.bookingSocket.sendData(localStorage.getItem('id'))
    })
    interval(2000).subscribe(() => {
      this.subject.next();
    });

    interval(1000).pipe(
      map(() => {
        const seconds = new Date().getSeconds()
        if(seconds >= 0 && seconds < 30){
          return 30 - seconds
        } else {
          return 90 - seconds
        }
      })
    ).subscribe((seconds) => {
        this.seconds = seconds
    })

  }


  deleteItemCart(idBooking: string){
    this._bookingDetailService.delete(idBooking).subscribe(x => console.log(x))
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    //this.bookingSocket.sendData('Hola')
    localStorage.clear()
    this.router.navigate(['/account/auth/login']);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  updateCost(){
    this.subtotal = 0.0
    this.aditional = 0.0
    this.total = 0.0
    this.data.map(x => {
      this.subtotal += x.idItinerary.cost;
      this.aditional += x.idTypeSeatDetail.idTypeSeat.costAdditional
    })
    this.total += this.subtotal + this.aditional;    
  }


  payModal(content: any){
    this.updateCost()
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  payBooking(){
    const data = {
      user: {
        id_user: localStorage.getItem('id')
    },
      dateBooking: new Date(),
      costTotal: this.total
    }
    this._bookingService.create(data).subscribe(x => {
      if(x.metadata.status == '201'){
        this.itineraryAlert(':)', 'Compra realizada con exito', 'success')
        this.modalService.dismissAll()
        this.ngOnInit()
      }else {
        this.itineraryAlert('Ups, hubo un problema', x.metadata.message, 'warning')
      }
    }, (error) => {
      this.itineraryAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
    
  }


  public itineraryAlert(title: string, description: string, value: SweetAlertIcon) {
    Swal.fire(title, description, value)
  }

}



