import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

//Utilizando JQquery para compatibilidade com aplicativos android antigos
$('.form').submit(controller.adiciona.bind(controller));
$('#botao-importa').click(controller.importaDados.bind(controller));
