import { NegociacaoService } from './../service/NegociacaoService';
import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { logarTempoExecucao, domInject, throttle } from '../helpers/decorators/index';
import {imprime} from '../helpers/Utils'


export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;


    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView('#mensagemView');

    private _negociacaoService = new NegociacaoService;

    

    constructor() {
        this._negociacoesView.update(this._negociacoes);

    }



    @logarTempoExecucao(true)
    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','))

        if (this.isNotUtilDay(data)) {
            this._mensagemView.update('Data não pode ser Sabado ou Domingo')
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        this._negociacoes.adiciona(negociacao);
        
        imprime(this._negociacoes, negociacao)

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionado com sucesso');

    }
    @throttle()
    importaDados() {

        this._negociacaoService
            .obterNegociacoes(res => {
                if (res.ok) {
                    return res
                } else {
                    throw new Error(res.statusText)
                }
            })
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
                this._negociacoesView.update(this._negociacoes)
            })


    }

    private isNotUtilDay(data: Date): boolean {
        return (data.getDay() === DiaDaSemana.Sabado || data.getDay() === DiaDaSemana.Domingo)
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}