class simulador{
    constructor(nombre = "", edad = 0, monto = 0, plazo = 0,mensualidad = 0){
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

let prestamos = []


function agregarSimulacion(array){
    let nombre = document.getElementById("nombreIngresado").value;
    let edad = parseInt(document.getElementById("edadIngresada").value);
    let monto = parseInt(document.getElementById("montoIngresado").value);
    let plazo = parseInt(document.getElementById("plazoIngresado").value);
    // validarFormulario(array)
    let mensualidad = calculoCuota(monto,plazo);

    const nuevosPrestamo = new simulador(nombre, edad, monto,plazo, mensualidad);

    localStorage.setItem("prestamos", JSON.stringify(array))
    
    
    array.push(nuevosPrestamo)  
    
    console.log(nuevosPrestamo)
  

}

let calcular = document.getElementById("calcularbtn")


calcular.onclick = function(){
    agregarSimulacion(prestamos)
    verSimulaciones(prestamos)
    let agregarSmlcin = document.getElementById("agregarSmlcin");


    agregarSmlcin.reset();

}



function calculoCuota(m,p){
    
    let numerador = Math.pow((1 + 0.0233),p) *(0.0233)
    let denominador = Math.pow((1 + 0.0233), p) - 1
    let mensualidad = m*(numerador/denominador)
    return mensualidad;
}




let pagosDiv = document.getElementById("pagomensual")

function verSimulaciones(array){
    pagosDiv.innerHTML = "" 

    for(let pago of array){
        
        
        let nuevoCalculo = document.createElement("div")
        nuevoCalculo.className = "col-9"
        nuevoCalculo.innerHTML = ` <div class="alert alert-primary" role="alert">
        ${pago.nombre} por un crédito de ${pago.monto} a un plazo de ${pago.plazo} meses, pagarias un valor de ${pago.mensualidad} mensuales.Tenga en cuenta que este calculo se realiza con una tasa de interes de 2.33% efectiva mensual y que en esta cuota no se incluyen seguros.
        </div>` 
        pagosDiv.appendChild(nuevoCalculo)
    }

}


// function validarFormulario(){
//     let edad = parseInt(document.getElementById("edadIngresada").value);
//     let mensajeError = document.getElementById("mensajeError");
//     if (edad < 18){
//         mensajeError.innerHTML = "Usted no puede solicitar un prestamo, edad no válida";
//         return;
//     }
//     let monto = parseInt(document.getElementById("montoIngresado").value);
//     if(monto <  100 && monto > 1000000){
//         mensajeError.innerHTML = `El monto ingresado ${monto} no es válido, recuerde que el valor mínimo es de 100 usd y el valor máximo son 1000000 usd`;
//         return;
//     }
//     let plazo = parseInt(document.getElementById("plazoIngresado").value);
//     if (plazo  >= 84  && plazo < 12 ){
//         mensajeError.innerHTML = `El plazo ingresado ${plazo} no es válido, recuerde que el plazo minimo es de 12 meses y el máximo es de 84 meses`;
//         return;
//     }
//     if (edad === "" || monto === "" || plazo === "") {
//         mensajeError.innerHTML = "Todos los campos son obligatorios";
//         return;
//       }
// }


  