//class

class simulador{
    constructor(nombre = "", edad = 0, monto = 0, plazo = 0,mensualidad = 0, moneda = "COP"){
        this.nombre = nombre,
        this.edad = edad,
        this.monto = monto,
        this.plazo = plazo,
        this.mensualidad= mensualidad,
        this.moneda = moneda
    }
        mostrartexto(){
            console.alert(`${this.nombre}, tu edad es ${this.edad}, el monto que deseas solicitar es por valor de ${this.monto} 
            y el plazo es de ${this.plazo} meses. Pagarias un valor 
            de ${this.mensualidad} mensuales.Tenga en cuenta que este cálculo se 
            realizó con una tasa de interes de 2.33% efectiva mensual y que en esta cuota no se incluyen seguros`)
        }
    }


//array
let prestamos = []
if(localStorage.getItem("prestamos")){
    prestamos = JSON.parse(localStorage.getItem("prestamos"))
}else{
    localStorage.setItem("prestamos", JSON.stringify(prestamos))}



    //DOM

const apiURL = "https://openexchangerates.org/api/latest.json"
const apiKey = "6af4da415b18429c870a167e66e2d5fd"
let colombianpeso = "COP" 
let calcular = document.getElementById("calcularbtn")
let pagosDiv = document.getElementById("pagomensual")
// let conversion = document.getElementById("convertirbtn")
let eliminart = document.getElementById("eliminar")
let verSimulac = document.getElementById("botonCarrito")



//funciones


function agregarSimulacion(array){
    let nombre = document.getElementById("nombreIngresado").value;
    let edad = parseInt(document.getElementById("edadIngresada").value);
    let monto = parseFloat(document.getElementById("montoIngresado").value);
    let plazo = parseInt(document.getElementById("plazoIngresado").value);

    if (edad < 18){
        mensajeError.innerHTML = "Usted no puede solicitar un prestamo, edad no válida";
        return;
    }
    if(monto <  100 && monto > 1000000){
        mensajeError.innerHTML = `El monto ingresado ${monto} no es válido, recuerde que el valor mínimo es de 100 usd y el valor máximo son 1000000 usd`;
        return;
    }
    if (plazo  >= 84  && plazo < 12 ){
        mensajeError.innerHTML = `El plazo ingresado ${plazo} no es válido, recuerde que el plazo minimo es de 12 meses y el máximo es de 84 meses`;
        return;
    }
    if (edad === "" || monto === "" || plazo === "") {
        mensajeError.innerHTML = "Todos los campos son obligatorios";
        return;
    }
    let mensualidad = calculoCuota(monto,plazo);

    const nuevosPrestamo = new simulador(nombre, edad, monto,plazo, mensualidad);

    localStorage.setItem("prestamos", JSON.stringify(array))
    
    
    array.push(nuevosPrestamo)  
   
    // console.log(nuevosPrestamo)
  

}


function calculoCuota(m,p){
    let numerador = Math.pow((1 + 0.0233),p) *(0.0233)
    let denominador = Math.pow((1 + 0.0233), p) - 1
    let mensualidad = m*(numerador/denominador)
    return mensualidad;
}






function verSimulaciones(array){
    pagosDiv.innerHTML = "" 

    for(let pago of array){
        
        
        let nuevoCalculo = document.createElement("div")
        nuevoCalculo.className = "col-9"
        nuevoCalculo.innerHTML = ` <div class="alert alert-primary" role="alert">
        ${pago.nombre} por un crédito de ${pago.monto} a un plazo de ${pago.plazo} meses, pagarias un valor de ${pago.mensualidad.toFixed(2)} mensuales.Tenga en cuenta que este calculo se realiza con una tasa de interes de 2.33% efectiva mensual y que en esta cuota no se incluyen seguros.
        </div>` 
        pagosDiv.appendChild(nuevoCalculo)
    }

    
    
}

function agregarConversion(){
    let monto = parseInt(document.getElementById("montoIngresado").value);
    let plazo = parseInt(document.getElementById("plazoIngresado").value);
    let mensualidad = calculoCuota(monto,plazo);
    let mensajeCambio = document.getElementById("mensajeCambio") 
    let cambio = 0;
    let moneda = "COP"
    fetch(`${apiURL}?app_id=${apiKey}&base=USD`)
        .then(response => response.json())
        .then(data => {
            cambio = data.rates[moneda];
            let dolares = mensualidad / cambio;
            mensajeCambio.className = "col-9"
            mensajeCambio.innerHTML = ` <div class="alert alert-success" role="alert">${mensualidad.toFixed(2)} ${moneda} son ${dolares.toFixed(2)} USD.</div>`
        })
        // .catch(error => console.error(error))

}
    
function eliminar(){
    let pagos = document.getElementById("pagomensual");
    pagos.remove()
    let mensajs= document.getElementById("mensajeCambio");
    mensajs.remove()
    Swal.fire({
        title: "Eliminado",
        text: `Se ha eliminado la consulta`,
        icon: "info",
        confirmButtonText: "OK!",
        //milisegundo por medida
        timer: 3000,
        imageHeight : 200


    })
}

//Eventos

calcular.addEventListener("click",()=>{
    agregarSimulacion(prestamos);
    agregarConversion(prestamos);
    let agregarSmlcin = document.getElementById("agregarSmlcin");
    agregarSmlcin.reset();
    // verSimulaciones(prestamos)



})

verSimulac.addEventListener("click", ()=>{
    verSimulaciones(prestamos);
    // agregarConversion(prestamos);
})


// conversion.addEventListener("click",()=>{
//     agregarConversion(prestamos);
//     // let agregarSmlcin = document.getElementById("agregarSmlcin");


//     // agregarSmlcin.reset();

 

// })

eliminart.addEventListener("click",()=>{
    eliminar(prestamos)
})




