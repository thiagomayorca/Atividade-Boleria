import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/servicos/database.service';
import { UtilityService } from 'src/app/servicos/utility.service';
import { runInThisContext } from 'vm';

import { Receita } from '../modelo/receita.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    receitas: Receita[] = [];
    router: any;


  constructor(
    private banco: DatabaseService,

    private alertCtrl: AlertController,

    private util: UtilityService,

    private actionSheet: ActionSheetController
  ) {}


  ngOnInit(): void{
    this.util.carregando("Carregando",2000);
    this.banco.getReceita().subscribe(caixa => this.receitas = caixa);
  }

  deletar(id:number){
    try{
      this.banco.delReceita(id);
    }catch(err){
      console.log(err);
    }finally{
      //Chama a mensagem
      this.util.toastando("Receita Excluida", "bottom",2000,"danger");

      //Atualiza a pagina
      
    
    }
  }


  async alertando (){

    const alert = await this.alertCtrl.create({
      header: 'Por favor digite as informações',
      mode: 'ios',

      //  Inputs do formulario
      inputs: [
        {
          name: 'receita',
          placeholder: 'Receita',
          type: 'text',
        },
        {
          name: 'quantidade',
          placeholder: 'Quantidade',
          type: 'text',
          attributes: {
            maxlength: 8,
          },
        },
        {
          name: 'ingredientes',
          placeholder: 'Ingredientes',
          type: 'text',
        },
        {
          name: 'imagem',
          placeholder: 'Imagem',
          type: 'text',
        },
      
      ],

      //  Botões do formulario
      buttons: [ // array de objetos
    {
      text : 'Cancelar',
      role: 'cancel',  // role é  so pra expeficiar o que faz, não tem importancia
      handler: () => {
        console.log(' CANCELADO!');
      } // handler é um metodo, um comando para executar uma função, nesse caso do botão 
      
    },
      //criando o botão de cadastrar
    {
      text: 'Cadastrar',
      handler : (form) => {
        let receita = {          
          receita: form.receita,
          ingredientes: form.ingredientes ,
          quantidade: form.quantidade,
          imagem: form.imagem,

          // status vai ser a variavel de controle do ngIf
          status: false 
        }; 
        try{
          this.banco.postReceita(receita);
        } catch(err){
          console.log(err)
        }finally{
          this.util.toastando("Receita cadastrada", "top", 2000,"success");
          //atualiza a pagina
          
        }
        
       
       
      }
    }

    
    
    ],
      
    });



  (await alert).present();  
  
  

}
// async actionMetod(update : Receita) {
//   const action = this.actionSheet.create({
//     mode: 'ios',
//     header : 'Selecione uma opção',
//     buttons: [
//       {
//         text: update.status ? 'Desmarcar' : 'Marcar' ,
//         icon: update.status ? 'radio-button-off': 'checkmark-circle',
        
//         handler: () => {
//           update.status = !update.status
//           this.banco.statusItem(update);

          

//           this.util.toastando('Marcamos o encontro',"middle",2000,"primary") //middle para colocar no meio
//         }
//       },

//       {
//         text: "Cancelar",
//         handler: () => {
          
//           this.util.toastando('Cancelamos o encontro',"middle",2000,"secondary")
//         }
//       }
//     ]
//   }); (await action).present();

  
// }

}
