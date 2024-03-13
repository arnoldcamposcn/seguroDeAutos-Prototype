// Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function (){

    /*
    1 = Americano 1.15
    2 = Asiatioc 1.05
    3 = Europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
                break;
    }

    // leer el año 
    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) *cantidad) / 100;

    /*
    Si el seguro es basico se multiplica por un 30% mas 
    Si el seguro es completo se multiplicoa por un 50% mas
    */
    
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
}


function UI() {}

// Llenar las opciones de los años
UI.prototype.llenarOpciones = function() {
    const max = new Date().getFullYear(),
        min = max - 20;
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}
// Muestra alertas en la pantalla 
UI.prototype.mostrarMensaje = (mensaje, tipo)=>{
    const div = document.createElement('div');
    
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    // Insertar en el html 
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
       div.remove(); 
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) =>{

    const {marca, year, tipo} = seguro;

    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    // Crear el resultado 
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class= "font-bold">Marca: <span class="Font-normal"> ${textoMarca}</span></p>
        <p class= "font-bold">Año: <span class="Font-normal"> ${year}</span></p>
        <p class= "font-bold">Tipo: <span class="Font-normal capitalize"> ${tipo}</span></p>
        <p class= "font-bold">Total: <span class="Font-normal"> $ ${total}</span></p>
        `;
    const resultadoDiv = document.querySelector('#resultado');

    // Mostrar el spinner 
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);
}


//INSTANCIAR UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
});

document.addEventListener('DOMContentLoaded', addEventListener);

function addEventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    const  marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligarios','error');
        return;
    } 
    ui.mostrarMensaje('Cotizando...','Exito');

    //Ocultar las cotizaciones previsas
    const resultados = document.querySelector('#resultado div')
    if(resultados != null){
        resultados.remove();
    }

    //Instanciar el seguro 
    const seguro = new Seguro(marca,year,tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype que va cotizar.
    ui.mostrarResultado(total, seguro);
}
