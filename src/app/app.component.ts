import {Component} from '@angular/core';
import {Disciplina} from './disciplina.model';
import {TipoDeOcorrencia} from "./tipo-de-ocorrencia.model";
import {Ocorrencia} from "./ocorrencia.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //ocorrencias = [];
  aluno_matricula = null;
  aluno_nome = null;
  data = null;
  pai_ou_responsavel_compareceu = false;
  pai_ou_responsavel_nome = null;
  tipo = null;
  observacao = null;
  salvar_ok = false;

  contadores = [0, 0, 0, 0];
  porcentagens = [0, 0, 0, 0];
  cont_abril = 0;
  cont_marco = 0;
  relacao_ocorrencias = 0;
  relacao_eh_maior_igual_a_zero = null;

  datainicial = null;
  datafinal = null;
  resultado = null;

  pesquisa(){
    this.datainicial = Date.parse(this.datainicial);
    this.datafinal = Date.parse(this.datafinal);
    this.resultado = [];

    for(let o of this.ocorrencias){
      var result = o.data;
      if((result <= this.datafinal ) && (result >= this.datainicial)){
        this.resultado.push(o);
      }
    }
  }
  tipos = [
    new TipoDeOcorrencia(0, 'indisciplina em sala de aula'),
    new TipoDeOcorrencia(1, 'comportamento inadequado com colegas'),
    new TipoDeOcorrencia(2, 'baixo índice de rendimento'),
    new TipoDeOcorrencia(3, 'indicação de atenção por assunto familiar, psicológico ou social')
  ];
  // JOAO
  ocorrencias = [
      new Ocorrencia("0","Joao","2018-04-01",false, null, "OCORRENCIA 1 Esse Mes",0),
      new Ocorrencia("0","Joao","2018-04-10",false, null, "OCORRENCIA 2 Esse Mes",0),
      new Ocorrencia("0","Joao","2018-04-20",false, null, "OCORRENCIA 3 Esse Mes",1),

      new Ocorrencia("0","Joao","2018-03-01",false, null, "OCORRENCIA 1 Mes Passado",1),
      new Ocorrencia("0","Joao","2018-03-10",false, null, "OCORRENCIA 2 Mes Passado",2),
      new Ocorrencia("0","Joao","2018-03-15",false, null, "OCORRENCIA 3 Mes Passado",2),
      new Ocorrencia("0","Joao","2018-03-20",false, null, "OCORRENCIA 4 Mes Passado",3),
      new Ocorrencia("0","Joao","2018-03-25",false, null, "OCORRENCIA 5 Mes Passado",3)
  ];
  //
  salvar() {
    const ocorrencia = new Ocorrencia(this.aluno_matricula,
      this.aluno_nome,
      this.data,
      this.pai_ou_responsavel_compareceu,
      this.pai_ou_responsavel_nome,
      this.observacao,
      this.tipo);
    this.ocorrencias.push(ocorrencia);
    this.salvar_ok = true;
    this.atualizarEstatisticas();
    this.iniciar();
  }


  atualizarEstatisticas() {
    this.contadores = [0, 0, 0, 0];
    this.cont_abril = 0;
    this.cont_marco = 0;
    for (var i = 0; i < this.ocorrencias.length; i++) {
      this.contadores[this.ocorrencias[i].tipo]++;
      if (this.ocorrencias[i].data.indexOf("-04-") != -1) {
        this.cont_abril++;
      }
      if (this.ocorrencias[i].data.indexOf('-03-') != -1) {
        this.cont_marco++;
      }
    }
    if (this.cont_marco != 0) {
      this.relacao_ocorrencias = (this.cont_abril - this.cont_marco)/this.cont_marco * 100;
      if(this.relacao_ocorrencias >= 0){
        this.relacao_eh_maior_igual_a_zero = true;
      }
      else{
        this.relacao_eh_maior_igual_a_zero = false;
      }

    }
    for (var i = 0; i < 4; i++) {
      this.porcentagens[i] = this.contadores[i] / this.ocorrencias.length * 100;
    }
  }

  cancelar() {
    this.iniciar();
    this.salvar_ok = false;
  }

  iniciar() {
    this.aluno_matricula = null;
    this.aluno_nome = null;
    this.data = null;
    this.pai_ou_responsavel_compareceu = false;
    this.pai_ou_responsavel_nome = null;
    this.tipo = null;
    this.observacao = null;
  }
}
