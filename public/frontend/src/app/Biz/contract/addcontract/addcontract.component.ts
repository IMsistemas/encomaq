import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../../service/bcontract/contract.service';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { ItemService } from '../../../service/bitem/item.service';
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
  @Input() id_client: any;
  constructor(private contract: ContractService, private client: ClienteService, private item: ItemService) { }

  ngOnInit() {
    this.id_client = { idclient: '' };
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
            businessname: cat.businessname
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
    this.list_itemcont.push(o);
  }
  removerow(data) {
    const posicion = this.list_itemcont.indexOf(data);
    this.list_itemcont.splice(posicion, 1);
  }
}
