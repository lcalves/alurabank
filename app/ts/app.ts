const controller = new NegociacaoController();

//Utilizando JQquery para compatibilidade com aplicativos android antigos
$('.form').submit(controller.adiciona.bind(controller));
