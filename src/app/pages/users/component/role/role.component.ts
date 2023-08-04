import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role.model';
import { RoleResponse } from '../../response/role.response';
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRoleDto, UpdateRoleDto } from '../../dto/role.dto';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roleArray: Role[] = []
  roleSelected: Role[] = []
  title: string = ''
  formRole: FormGroup
  save: boolean= true

  constructor(
    private _roleService: RoleService,
    private modalService: NgbModal,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.formRole = this._fb.group({
      id_role: [""],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      state: [""]
  })
  }

  public getAll(){
    this._roleService.getAllRole()
    .subscribe((x: RoleResponse) => {
      this.roleArray = x.data
    }, (error) => {
      this.roleAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public getById(id: string){
    this._roleService.getById(id)
    .subscribe((x: RoleResponse) => {
      this.formRole.get('id_role').setValue(x.data[0].id_role)
      this.formRole.get('name').setValue(x.data[0].name)
      this.formRole.get('description').setValue(x.data[0].description)
      this.formRole.get('state').setValue(x.data[0].state)
    }, (error) => {
      this.roleAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
    })
  }

  public saveRole(){
    if(this.save){
      const roleCreate: CreateRoleDto = {
        name: this.formRole.controls['name'].value,
        description: this.formRole.controls['description'].value
      }
      this._roleService.create(roleCreate)
      .subscribe((x: RoleResponse) => {
        if(x.metadata.status == "201"){
          this.roleAlert('Matenimiento Rol', x.metadata.message, 'success')
          this.modalService.dismissAll()
          this.ngOnInit()
          return
        }else{
          this.roleAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
          this.roleAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
    }else{      
      const id: string= this.formRole.controls['id_role'].value
      const roleUpdate: UpdateRoleDto = {
        name: this.formRole.controls['name'].value,
        description: this.formRole.controls['description'].value,
        state: Boolean(this.formRole.controls['state'].value)
      }
      
      this._roleService.update(roleUpdate, id)
      .subscribe((x: RoleResponse) => {
        if(x.metadata.status == "200"){
          this.roleAlert('Matenimiento Rol', x.metadata.message, 'success')
          this.modalService.dismissAll()
          this.ngOnInit()
          return
        }else{
          this.roleAlert('Ups, hubo un problema', x.metadata.message, 'warning')
        }
      }, (error) => {
          this.roleAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
      })
    }
  }

  public delete(id: string){
    this._roleService.delete(id)
    .subscribe((x: RoleResponse) => {
      if(x.metadata.status == '203'){
        this.roleAlert('Deleted!','Your file has been deleted.','success')
        this.ngOnInit()
      }else{
        this.roleAlert('Ups, hubo un problema', x.metadata.message, 'warning')
      }
    }, (error) => {
      this.roleAlert('Ups, hubo un problema', "Hubo un error, consulte al adminitrador", 'error')
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

  public roleAlert(title: string, description: string, value: SweetAlertIcon){
    Swal.fire(title, description, value)
  }

  onChangeSelected( event: any ){
    this.formRole.get('state').setValue(Boolean(event.target.value))
  }


  openModal(content: any, data: string = ''){
    if(data.length <= 0){
      this.save= true;
      this.title = "Crear Rol";
      this.formRole.get('name').setValue('');
      this.formRole.get('description').setValue('');
    }else{
      this.save= false;
      this.title = "Editar Rol";
      this.getById(data);
    }
    this.modalService.open(content, { size: 'md', centered: true });
  }
}