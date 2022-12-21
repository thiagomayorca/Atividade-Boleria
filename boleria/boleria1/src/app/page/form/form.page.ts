import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DatabaseService } from 'src/app/servicos/database.service';
import { UtilityService } from 'src/app/servicos/utility.service';

import { Receita } from '../modelo/receita.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  image = "https://static.vasco.com.br/wp-content/uploads/2022/12/Pedro-Raul-2-1196x650.jpeg";
  routeId = null;
  receita: any = {};
  
  constructor(
    private activatedRoute: ActivatedRoute,
  private banco: DatabaseService,
  private router: Router,
  private util: UtilityService

  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id']
    if(this.routeId){
      //Tras o item do banco de dados
      this.banco.getOneReceita(this.routeId).subscribe(caixa => {this.receita = caixa });
    }

  }
     //Método que chama o serviço de atualização
  update (form: any){
    this.banco.updateReceita(form.value, this.routeId);
    this.router.navigate(['']);
    this.util.toastando("Receita Atualizada com sucesso", 'middle',2000,"medium");
  }
  

}
 


