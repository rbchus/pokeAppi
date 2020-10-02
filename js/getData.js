// Obtenemos la API por medio de promesas
/**
 * fecth() esto es nuevo en JS
 * permite controlar errores mas facilmente
 * trabaja por medio de http o https y se basa en promesas
 * sistema de peticiones y respuestas 
 */

//URL de la API
const API = "https://pokeapi.co/api/v2/pokemon/?offset=00&limit=10";
//Obtener el retorno de la API
const getData = (api,opc) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            if (opc == 1)
                llenarDatos(json);
                 else
                 listarUrl(json),paginacion(json);

        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

// llenar datos en nuestra pagina

let html;
let matachos = [];
const listarUrl = (data) => {
    matachos = data.results;
    data.results.forEach(objecto => {
        html = ""
        getData(objecto.url,1);
        
    });

}



const llenarDatos = (data) => {
    //console.log(data.results);
    //data.results.forEach(objecto => console.log(objecto.name));
    
    html += '<div class="col mt-1">';
    html += '<div class="card" style="width: 10rem;">';
    html += `<img src="${data.sprites.back_default}" class="card-img-top" alt="...">`;
    html += '<div class="card-body">';
    html += `<h5 class="card-title">${data.name}</h5>`;
    html += `<h5 class="card-title">Habilidades</h5>`;
    data.abilities.forEach((item) => {
        html += `<li class="card-text">${item.ability.name} </li>`;
        });
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.getElementById("datosPersonajes").innerHTML = html

}



//paginacion 

const paginacion = (data) =>{

  let prevDisable = "";
  let nextDisable = "";

  if (data.previous == null)
      prevDisable = "disabled";
  if (data.next == null)
      nextDisable = "disabled"; 
     
  

    let html = "";

    html += `<li class="page-item ${prevDisable}"><a class="page-link" onclick="getData('${data.previous}')">Previous</a></li>`;
    html += `<li class="page-item"><a class="page-link" onclick="getData('${data.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html


}


//---- buscar

const btnBuscar = document.getElementById('btnBuscar');

btnBuscar.addEventListener('click', () => {

    encontrarPokemomObjeto = document.getElementById("txtBuscar");
    encontrarPokemom = encontrarPokemomObjeto.value

    console.log (matachos)

    matachos.forEach(objecto => {
        
        if (objecto.name == encontrarPokemom ) {
            html = ""
            getData(objecto.url,1);
            console.log ("--" + encontrarPokemom  +  "- ENCONTRADO -")
        } else 
          console.log ("--" + encontrarPokemom  +  "- NO ESTA  -")
       
        
    });

    encontrarPokemomObjeto.value = ""

});

// Activo o invoco la funcion
getData(API,0);


