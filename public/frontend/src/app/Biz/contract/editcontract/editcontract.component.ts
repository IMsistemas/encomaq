import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../../service/bcontract/contract.service';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { ItemService } from '../../../service/bitem/item.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editcontract',
  templateUrl: './editcontract.component.html',
  styleUrls: ['./editcontract.component.css']
})
export class EditcontractComponent implements OnInit {
  lis_client = [];
  lis_item = [];
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  @Input() id_client: any; //
  @Input() item_select: any;
  constructor(private contract: ContractService, private client: ClienteService, private item: ItemService) { }

  ngOnInit() {
    this.id_client = { idclient: '' };
    this.item_select = { iditem: '' };
    this.list_clients();
    this.list_items();
  }
  list_clients() {
    this.lis_client.push({ idclient: '', businessname: '--Seleccione--' });
    this.client.get_client().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idclient: cat.idclient,
            businessname: cat.businessname,
            identify: cat.identify,
            phone: cat.phone,
            address: cat.address
          };
          this.lis_client.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  list_items() {
    this.lis_item.push({ iditem: '', itemname: '--Seleccione--' });
    this.item.get_item().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            iditem: cat.iditem,
            itemname: cat.itemname
          };
          this.lis_item.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  search_client() {
    $('.listclient').modal('show');
  }
  addrwo() {
    const o = {
      iditem: '',
      quantity: 0,
      observation: ''
    };
    this.tem_edit.biz_contractitem.push(o);
  }
  removerow(data) {
    const posicion = this.tem_edit.biz_contractitem.indexOf(data);
    this.tem_edit.biz_contractitem.splice(posicion, 1);
  }
  edit_contract(data, frm) {
    data.idclient = this.id_client.idclient;
    this.contract.edit_contract(data.idcontract , data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#editcontract').modal('hide');
          this.id_client = data.biz_client;
          frm.reset();
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#editcontract').modal('hide');
          frm.reset();
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#editcontract').modal('hide');
        frm.reset();
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
