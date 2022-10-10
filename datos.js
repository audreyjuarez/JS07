console.log("datos");
//Función para que la información se muestre en la tabla en las celdas que queremos.
const verData= (data) =>{ 
    let table = document.getElementById("data")
    table.innerHTML = ""
    for (let i =0; i < data.length; i++) {
        table.innerHTML += `<tr><td>${data[i].id}</td> <td>${data[i].email}</td> <td>${data[i].first_name}</td> <td>${data[i].last_name}</td> <td><img src="${data[i].avatar}" class="rounded-circle w-50" alt="avatar"></td></tr>`;
    }
}

const verSpinner= () =>{
    let table = document.getElementById("data")
    table.innerHTML = 
    `<tr>
<td colspan="100%" class="text-center">
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span></div> </tr></td>`;
}


//Función para que se ejecute el llamado de información a partir de mi botón:
function clickMe() { 
    verSpinner(); 

    const usuarios = JSON.parse(localStorage.getItem("user")) //La información se trae, y se convierte a objeto.

    // Si la condición del tiempo se cumple la información se mantiene, si no vuelve a traerla.
    if(usuarios && usuarios.time > Date.now()){
        verData(usuarios.data)
    } 
    else {
        let url ='https://reqres.in/api/users?delay=3'
        
        fetch(url)
            .then(response => response.json())//Json lo vuelve objeto
            .then(data =>{
                verData(data.data)
                let usuariosInformacion = { 
                    data: data.data, 
                    time: Date.now() + 60000 //Aquí le damos el valor a nuestras llaves sobre la info. y el tiempo.
                };
                localStorage.setItem("user", JSON.stringify(usuariosInformacion));
            })
            .catch(error => console.log(error))
    }
}
    