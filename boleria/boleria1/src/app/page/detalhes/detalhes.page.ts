import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/servicos/database.service';
import { UtilityService } from 'src/app/servicos/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Receita } from '../modelo/receita.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  routeId = null;
  receita: any = {};

  constructor(
    //Essa ferramnete server para captura a rota (caminho) que estiver ativo
    private activatedRoute: ActivatedRoute,
    private banco: DatabaseService,
    private router: Router,
    private util: UtilityService
  ) { }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.params['id'];
   
    if(this.routeId){
      //Tras a receita do banco de dados
      this.banco.getOneReceita(this.routeId).subscribe(results => {this.receita = results});
    }
  }

}
