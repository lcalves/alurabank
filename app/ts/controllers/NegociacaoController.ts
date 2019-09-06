import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { logarTempoExecucao, domInject, throttle } from '../helpers/decorators/index';


export class NegociacaoController{

    @domInject('#data')
    private _inputData: JQuery ;
    
    
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    
    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView');


    constructor(){
        this._negociacoesView.update(this._negociacoes);
    }
    
    @logarTempoExecucao(true)
    adiciona(event: Event){
        
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','))
    
        if(this.isNotUtilDay(data)){
            this._mensagemView.update('Data não pode ser Sabado ou Domingo')
            return
        }

        const negociacao = new Negociacao(
            data, 
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
            );
            this._negociacoes.adiciona(negociacao);
            this._negociacoesView.update(this._negociacoes);
            this._mensagemView.update('Negociação adicionado com sucesso');
            
    }
    @throttle()
    importaDados(){
        
        function isOk(res: Response){
            if(res.ok){
                return res
            }else{
                throw new Error(res.statusText)
            }
        }
        fetch('http://localhost:8080/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao))
                this._negociacoesView.update(this._negociacoes)
            })
            .catch(err => console.log(err.message))
    }

    private isNotUtilDay(data: Date): boolean{
        return (data.getDay() === DiaDaSemana.Sabado || data.getDay() === DiaDaSemana.Domingo)
    }
}

enum DiaDaSemana{
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}