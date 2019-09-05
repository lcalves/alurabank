export function logarTempoExecucao(emSegundos: boolean = false){

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        //Recuperando o metodo que esta sendo chamado
        const metodoOriginal = descriptor.value

        descriptor.value = function (...args: any[]) {

            let divisor = 1;
            let unidade = 'milisegundos';

            if(emSegundos){
                divisor = 1000;
                unidade = 'Segundos'

            }

            console.log('-------------------------------------')
            console.log(`Parâmetros do método ${propertyKey} : ${JSON.stringify(args)}`)
            const t1 = performance.now()
            
            const retorno = metodoOriginal.apply(this, args)
            const t2 = performance.now()
            console.log(`${propertyKey} demorou ${(t2-t1)/divisor} ${unidade}`)
            console.log('-------------------------------------')
            
            return retorno
                
        }

        return descriptor
    }
}