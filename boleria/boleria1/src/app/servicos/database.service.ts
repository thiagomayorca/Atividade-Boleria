import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Receita } from '../page/modelo/receita.model';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  HttpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

  readonly API = 'http://localhost:3000/receitas/';

  constructor(private http: HttpClient) { }


  getReceita(){
    return this.http.get<Receita[]>(this.API)
  }

  getOneReceita(id: number){
    return this.http.get<Receita>(this.API +id);
  }

  postReceita(receita:any){

    return this.http.post (this.API, JSON.stringify(receita),this.HttpOptions).subscribe();

  }

  delReceita(id: number){
    return this.http.delete(this.API + id).subscribe();
  }

  updateReceita(bolo: Receita, id: any){
    return this.http.put(this.API + id, JSON.stringify(bolo),this.HttpOptions).subscribe();
  }

  statusReceita(update: Receita){  //boolean por ser um ou outro, verdadeiro ou falso
    return this.http.put(this.API + update.id, JSON.stringify(update),this.HttpOptions).subscribe(); //subscribe para ter autoriazacao com o banco
  } 
}
