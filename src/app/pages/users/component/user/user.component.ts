import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../model/user.model';
import { UserResponse } from '../../response/user.response';
import { Role } from '../../model/role.model';
import { RoleService } from '../../service/role.service';
import { RoleResponse } from '../../response/role.response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userArray: User[] = []
  userSelected: User[] = []
  title: string = ''
  formUser: FormGroup
  save: boolean= true

  roles: Role[]

  constructor(
    private _userService: UserService,
    private _roleService: RoleService,
    private modalService: NgbModal,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.getAllRole()
    this.formUser = this._fb.group({
      id_user: [""],
      dni: ["", [Validators.required]],
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      dateBirthday: ["", [Validators.required]],
      role: ["", [Validators.required]],
      state: [""]
  })
  }

  public getAll(){
    this._userService.getAllUser()
    .subscribe((x: UserResponse) => {
      this.userArray = x.data
    }, (error) => {
      this.userAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public getAllRole(){
    this._roleService.getAllRole()
    .subscribe((x: RoleResponse) => {
      this.roles = x.data
    }, (error) => {
      this.userAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public getById(id: string){
    this._userService.getById(id)
    .subscribe((x: UserResponse) => {
      this.formUser.get('id_user').setValue(x.data[0].id_user)
      this.formUser.get('dni').setValue(x.data[0].dni)
      this.formUser.get('name').setValue(x.data[0].name)
      this.formUser.get('lastName').setValue(x.data[0].lastName)
      this.formUser.get('username').setValue(x.data[0].username)
      this.formUser.get('password').setValue(x.data[0].password)
      this.formUser.get('dateBirthday').setValue(x.data[0].dateBirthday)
      this.formUser.get('role').setValue(x.data[0].role.id_role)
      this.formUser.get('state').setValue(x.data[0].state)
    }, (error) => {
      this.userAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public saveUser(){
    if(this.save){
      const userCreate: CreateUserDto = {
        dni: this.formUser.controls['dni'].value,
        name: this.formUser.controls['name'].value,
        lastName: this.formUser.controls['lastName'].value,
        username: this.formUser.controls['username'].value,
        password: this.formUser.controls['password'].value,
        dateBirthday: this.formUser.controls['dateBirthday'].value,
        role: this.formUser.controls['role'].value
      }
      this._userService.create(userCreate)
      .subscribe((x: UserResponse) => {
        if(x.metadata.status == "201"){
          this.userAlert('Matenimiento Usuario', x.metadata.message, 'success')
          this.modalService.dismissAll()
          this.ngOnInit()
          return
        }else{
          this.userAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
          this.userAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
    }else{      
      const id: string= this.formUser.controls['id_user'].value
      const userUpdate: UpdateUserDto = {
        dni: this.formUser.controls['dni'].value,
        name: this.formUser.controls['name'].value,
        lastName: this.formUser.controls['lastName'].value,
        username: this.formUser.controls['username'].value,
        password: this.formUser.controls['password'].value,
        dateBirthday: this.formUser.controls['dateBirthday'].value,
        role: this.formUser.controls['role'].value,
        state: this.formUser.controls['state'].value
      }
      
      this._userService.update(userUpdate, id)
      .subscribe((x: UserResponse) => {
        if(x.metadata.status == "200"){
          this.userAlert('Matenimiento Usuario', x.metadata.message, 'success')
          this.modalService.dismissAll()
          this.ngOnInit()
          return
        }else{
          this.userAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
          this.userAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
    }
  }

  public delete(id: string){
    this._userService.delete(id)
    .subscribe((x: UserResponse) => {
      if(x.metadata.status == '203'){
        this.userAlert('Deleted!','Your file has been deleted.','success')
        this.ngOnInit()
      }else{
        this.userAlert('Ups, hubo un problema', x.metadata.message, 'warning')
      }
    }, (error) => {
      this.userAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
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

  public userAlert(title: string, description: string, value: SweetAlertIcon){
    Swal.fire(title, description, value)
  }

  onChangeSelected( event: any ){
    this.formUser.get('state').setValue(Boolean(event.target.value))
  }


  openModal(content: any, data: string = ''){
    if(data.length <= 0){
      this.save= true;
      this.title = "Crear Usuario";
      this.formUser.get('dni').setValue('');
      this.formUser.get('name').setValue('');
      this.formUser.get('lastName').setValue('');
      this.formUser.get('username').setValue('');
      this.formUser.get('password').setValue('');
      this.formUser.get('dateBirthday').setValue('');
      this.formUser.get('role').setValue('');
    }else{
      this.save= false;
      this.title = "Editar Usuario";
      this.getById(data);
    }
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
