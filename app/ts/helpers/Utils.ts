import { Imprimivel } from "../models/index";

export function  imprime(...objeto: Imprimivel[]) {
    
    objeto.forEach(obj => obj.paraTexto() );

}