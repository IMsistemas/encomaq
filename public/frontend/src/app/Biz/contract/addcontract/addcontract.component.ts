import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../../service/bcontract/contract.service';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { ItemService } from '../../../service/bitem/item.service';
import { BperiodService } from '../../../service/bperiod/bperiod.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrls: ['./addcontract.component.css']
})
export class AddcontractComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  lis_client = [];
  lis_item = [];
  list_itemcont = [];
  list_period = [];
  @Input() id_client: any; //
  @Input() item_select: any;
  constructor(private contract: ContractService, private client: ClienteService,
                private item: ItemService, private period: BperiodService) { }

  ngOnInit() {
    this.id_client = { idclient: '' };
    this.item_select = { iditem: ''};
    this.list_clients();
    this.list_periods();
    this.list_items();
    $('.auxcliente').prop('disabled' , true);
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
  list_periods() {
    this.list_period.push({ idperiod: '', periodname: '--Seleccione--' });
    this.period.get().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idperiod: cat.idperiod,
            periodname: cat.periodname,
          };
          this.list_period.push(o);
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
    this.list_itemcont.push(o);
  }
  removerow(data) {
    const posicion = this.list_itemcont.indexOf(data);
    this.list_itemcont.splice(posicion, 1);
  }
  search_item(fila) {
    $('.listitems').modal('show');
    fila.iditem = this.item_select.iditem;
  }
  add_contract(data, frm) {
    const aux = {
      Data: data,
      list: this.list_itemcont
    };
    this.contract.add_contract(aux).subscribe(
      (response) => {
        this.id_client = { idclient: '' };
        if (response.success !== undefined) {
          $('#addcontract').modal('hide');
          frm.reset();
          this.list_itemcont = [];
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#addclient').modal('hide');
          frm.reset();
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addcontract').modal('hide');
        frm.reset();
        this.update_component_father.emit(false);
      });
  }
}
