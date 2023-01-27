class simulador{
    constructor(nombre, edad, monto, plazo,mensualidad){
        this.nombre = nombre,
        this.edad = edad,
        this.monto = monto,
        this.plazo = plazo,
        this.mensualidad= mensualidad
    }
    mostrartexto(){
        console.alert(`${this.nombre}, tu edad es ${this.edad}, el monto que deseas solicitar es por valor de ${this.monto} 
        y el plazo es de ${this.plazo} meses. Pagarias un valor 
        de ${this.mensualidad} mensuales.Tenga en cuenta que este cálculo se 
        realizó con una tasa de interes de 2.33% efectiva mensual y que en esta cuota no se incluyen seguros`)
    }
}

const prestamos = []

function agregarSimulacion(array){
    let nombreIngresado = prompt("Bienvenido/a al simulador de creditos, por favor ingrese su nombre")
    let edad = parseInt(prompt("Ingrese su edad actual"))
        if (edad >= 18){
        console.log("Edad válida para solicitar un prestamo")
        }
        else{
        console.log("Usted no puede solicitar un prestamo, edad no válida")
        }
    let monto = parseInt(prompt(`Ingrese el valor del prestamo que desea solicitar,recuerde que el valor mínimo es de 100 usd y el valor máximo son 1000000 usd`))
        if ( monto >= 100 && monto < 1000000){
            console.log(`El valor ingresado : ${monto} es válido`)
        }
        else{
            sistema = false
            console.log(`El monto ingresado ${monto} no es válido, recuerde que el valor 
            mínimo es de 100 usd y el valor máximo son 1000000 usd`) 
        }
    let plazo = parseInt(prompt(`Ingrese el plazo al cual desea solicitar su credito,tenga en cuenta que el plazo minimo es de 12 meses y el máximo es de 84 meses`))
        if (plazo <= 84  && plazo >= 12 ){
            console.log(`El plazo ingresado : ${plazo} es válido`)        
        }
        else{
            console.log(`El plazo ingresado ${plazo} no es válido, recuerde que el plazo minimo es de 12 meses y el máximo es de 84 meses`)
            sistema = false
        }
    
    let numerador = Math.pow((1 + 0.0233),plazo) *(0.0233)
    let denominador = Math.pow((1 + 0.0233), plazo) - 1
    let mensualidad = monto*(numerador/denominador)
    console.log(`Por un crédito de ${monto} a un plazo de ${plazo} meses, pagarias un valor de ${mensualidad} mensuales.Tenga en cuenta que este calculo se realiza con una tasa de interes de 2.33% efectiva mensual y que en esta cuota no se incluyen seguros`)    
    const nuevosPrestamo = new simulador(nombreIngresado, edad, monto,plazo,mensualidad)

    console.log(nuevosPrestamo)
    
    array.push(nuevosPrestamo)
    console.log(array)

}
agregarSimulacion(prestamos)

