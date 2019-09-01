class NegociacaoController{

    private _inputData: JQuery ;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemVire = new MensagemView('#mensagemView');


    constructor(){
        this._inputData =$('#data');
        this._inputQuantidade =$('#quantidade');
        this._inputValor = $('#valor');
        this._negociacoesView.update(this._negociacoes);
    }
    
    adiciona(event: Event){
        event.preventDefault();
        const negociacao = new Negociacao(
            new Date(this._inputData.vall.replace(/-/g, ',')), 
            parseInt(this._inputQuantidade.vall),
            parseFloat(this._inputValor.vall)
            );
            this._negociacoes.adiciona(negociacao);
            this._negociacoesView.update(this._negociacoes);
            this._mensagemVire.update('Negociação adicionado com sucesso');
            
    }
}