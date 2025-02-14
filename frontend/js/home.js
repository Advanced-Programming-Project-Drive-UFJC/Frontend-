var user = localStorage.getItem("username"); 
const response_inutil = await fetch(`http://localhost:5000/${user}`);
const response = await fetch(`http://localhost:5000/show_elements/`);
const data = await response.json();
var spaceTitle = document.getElementById("titulo_espacio");
spaceTitle.textContent = data.name + " >"   
console.log(Array.isArray(data));
spaceTitle.addEventListener("click", function(){
    location.reload();
});
function ordenar(data){
    const contenedor = document.getElementById("contiene");
    const espacio = document.createElement("div");
    espacio.setAttribute("class", "espacio");
    espacio.setAttribute("id", "espacioso");
    if(Array.isArray(data.folders)){
        data.folders.forEach(element => {   
            const div = document.createElement("div");
            div.setAttribute("class", "folder");
            div.setAttribute("id", element.name);
            div.setAttribute("value", element.modification_date)
            const img = document.createElement("img");
            img.setAttribute("class", "img_org org");
            img.setAttribute("src", "../images/folder.png");
            img.setAttribute("alt", "folder");
            div.appendChild(img);
            const check = document.createElement("input");
            check.setAttribute("class", "org check_org");
            check.setAttribute("type", "radio");
            check.setAttribute("value", `folder,${element.name}`);
            check.setAttribute("name", "selector");
            div.appendChild(check);
            const text = document.createElement("h4");
            text.setAttribute("class","org text_org");
            text.addEventListener("click", async function() {
                const response = await fetch(`http://localhost:5000/show_folder_elements/${element.name}`);
                const data1 = await response.json();
                console.log(data1)
                console.log(data1.name)
                ordenar(data1)
            })
            text.textContent = element.name;
            div.appendChild(text);
            const date = document.createElement("h4");
            date.setAttribute("class", "org date_org");
            date.textContent = element.modification_date;
            div.appendChild(date);
            espacio.appendChild(div);
        });
    }
    if (Array.isArray(data.files)){
        data.files.forEach(element => {
            const div = document.createElement("div");
            div.setAttribute("class", "file");
            div.setAttribute("id", element.name);
            div.setAttribute("value", element.modification_date)
            const img = document.createElement("img");
            img.setAttribute("class", "img_org org");
            img.setAttribute("src", "../images/file.png");
            img.setAttribute("alt", "file");
            div.appendChild(img);
            const check = document.createElement("input");
            check.setAttribute("class", "org check_org");
            check.setAttribute("type", "radio");
            check.setAttribute("value", `file,${element.name}`);
            check.setAttribute("name", "selector");
            div.appendChild(check);
            const text = document.createElement("h4");
            text.setAttribute("class","org text_org");
            text.textContent = element.name;
            div.appendChild(text);
            const date = document.createElement("h4");
            date.setAttribute("class", "org date_org");
            date.textContent = element.modification_date;
            div.appendChild(date);
            const size = document.createElement("h4");
            size.setAttribute("class", "org size_org");
            size.textContent = element.size;

            div.appendChild(size);
            espacio.appendChild(div)
        });
    }
    if(Array.isArray(data)){
        data.forEach(element => {
            const div = document.createElement("div");            
            div.setAttribute("id", element.name);
            div.setAttribute("value", element.modification_date)
            const img = document.createElement("img");
            img.setAttribute("class", "img_org org");
            div.appendChild(img);
            const check = document.createElement("input");
            check.setAttribute("class", "org check_org");
            check.setAttribute("type", "radio");
            check.setAttribute("name", "selector");
            div.appendChild(check);
            const text = document.createElement("h4");
            text.setAttribute("class","org text_org");
            text.textContent = element.name;
            if (element.size === undefined){
                div.setAttribute("class", "folder");
                img.setAttribute("alt", "folder");
                img.setAttribute("src", "../images/folder.png");
                check.setAttribute("value", `folder,${element.name}`);
                text.addEventListener("click", async function() {
                    const response = await fetch(`http://localhost:5000/show_folder_elements/${element.name}`);
                    const data1 = await response.json();
                    console.log(data1)
                    console.log(data1.name)
                    ordenar(data1)
                })
            }else{
                check.setAttribute("value", `file,${element.name}`);
                img.setAttribute("src", "../images/file.png");
                div.setAttribute("class", "file");
                img.setAttribute("alt", "file");
            }
            div.appendChild(text);
            const date = document.createElement("h4");
            date.setAttribute("class", "org date_org");
            date.textContent = element.modification_date;
            div.appendChild(date);
            const size = document.createElement("h4");
            size.setAttribute("class", "org size_org");
            console.log(element.size === undefined)
            size.textContent = element.size;
            div.appendChild(size);
            espacio.appendChild(div)
        });
    }
    contenedor.appendChild(espacio);
}   
ordenar(data)
const add_file = document.getElementById("add_file");
add_file.addEventListener("click", async function(){
    const fileinput = document.getElementById("archivo");
    const file = fileinput.files[0];
    const form_data = new FormData();

    form_data.append("archivo", file);

    console.log([...form_data]);

    const respones = await fetch("http://localhost:5000/copy_file/", {
        method: "POST",

        body: form_data
    })
})


function ordenenClase(contenedorId, clasePrioritaria) {
    const contenedor = document.getElementById(contenedorId); 
    const divs = Array.from(contenedor.children); 

    divs.sort((a, b) => {
        const esAPrioritario = a.classList.contains(clasePrioritaria) ? 0 : 1;
        const esBPrioritario = b.classList.contains(clasePrioritaria) ? 0 : 1;
        return esAPrioritario - esBPrioritario;
    });

    contenedor.innerHTML = "";
    divs.forEach(div => contenedor.appendChild(div));
}

function ordenenId(contenedorId, orden = "asc") {
    const contenedor = document.getElementById(contenedorId); 
    const divs = Array.from(contenedor.children); 

    divs.sort((a, b) => {
        const comparacion = a.id.localeCompare(b.id);
        return orden === "asc" ? comparacion : -comparacion; 
    });

    contenedor.innerHTML = "";
    divs.forEach(div => contenedor.appendChild(div));
}

function ordenanFecha(contenedorId, orden = "desc") {
    const contenedor = document.getElementById(contenedorId); 
    const divs = Array.from(contenedor.children); 

    divs.sort((a, b) => {
        const fechaA = new Date(a.getAttribute("value"));
        const fechaB = new Date(b.getAttribute("value"));
        return orden === "desc" ? fechaB - fechaA : fechaA - fechaB; 
    });

    contenedor.innerHTML = "";
    divs.forEach(div => contenedor.appendChild(div));
}

const sort = document.getElementById("sort");
sort.addEventListener("click", function(){
    const sorteo = document.getElementById("sorteo").value;
    console.log(sorteo)
    switch(sorteo){
        case "File":
            ordenenClase("espacioso","file");
            break;
        case "Folder":
            ordenenClase("espacioso", "folder");
            break;
        case "Ascending":
            ordenenId("espacioso", "asc");
            break;
        case "Descending":
            ordenenId("espacioso", "no asc");
            break;
        case "Newer":
            ordenanFecha("espacioso", "no desc");
            break;
        case "Older":
            ordenanFecha("espacioso", "desc")
            break;
    }
})

async function save() {
    var save = await fetch("http://localhost:5000/save/", {
        method: "POST"
    })
    
    location.reload();
}

var delete_button = document.getElementById("delete_button");
delete_button.addEventListener("click", async function(){
    var selector = document.querySelector('input[name="selector"]:checked');
    var valores = selector.value.split(",");
    console.log(valores[0])
    const response = await fetch(`http://localhost:5000/delete_${valores[0]}/${valores[1]}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "content-Type": "application/json"
        }
    });
    save();
    
})

var move_options = document.getElementById("move_options");
var move_button = document.getElementById("move_button");
move_button.addEventListener("click", async function(){
    move_options.classList.toggle("oculto");
})
var move_file = document.getElementById("move_file");
move_file.addEventListener("click", async function(){
    var folder_name = document.getElementById("folder_name");
    var selector = document.querySelector('input[name="selector"]:checked');
    var valores = selector.value.split(",");
    var cosa_movida = valores[1];
    console.log(folder_name.value);
    if(valores[0]==="folder" && folder_name.value != cosa_movida){
        console.log("por aca no")
        const response = await fetch(`https://localhost:/5000/move_folder/${cosa_movida}`, {
            method: "POST",
            body: new URLSearchParams({
                folder_to_move_name: cosa_movida, 
                folder_to_reach_name: folder_name.value
            })
        });
    }else {
        console.log("Por aca")
        const response = await fetch(`https://localhost:/5000/move_file/${cosa_movida}`,{
            method: "POST",
            body: new URLSearchParams({
                file_name: cosa_movida,
                folder_name: folder_name
            })
        });
        const data = await response.json();
    }
    save();
})

var rename_options = document.getElementById("rename_options");
var rename_button = document.getElementById("rename_button");
rename_button.addEventListener("click", async function(){
    rename_options.classList.toggle("oculto");
})

var new_name_button = document.getElementById("new_name_button");
new_name_button.addEventListener("click", async function() {
    var new_name = document.getElementById("new_name");
    var selector = document.querySelector('input[name="selector"]:checked');
    var valores = selector.value.split(",");
    console.log(String(valores[1]))
    const response = await fetch("http://localhost:5000/rename_folder/dos", {
        method: "POST",
        body: new URLSearchParams({
            folder_name: "folder2",
            new_folder_name: "dos"
        })
    })
    // fetch("http://localhost:5000/rename_folder/dos",{
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         "new_folder_name": "dos",
    //         "folder_name": "cositas"
    //     })
    // })
    // .then(response =>{
    //     if (!response.ok){
    //         throw new Error(`ERROR ${response.status}: ${response.statusText}`)
    //     }
    // })
    // if (valores[0]==="folder"){
    //     const response = await fetch(`http://localhost:5000/rename_folder/${new_name.value}`, {
    //         method: "POST",
    //         body: new URLSearchParams({"folder_name": valores[1], "new_folder_name": new_name.value})
    //     });
    //     // save();
    // }else{     
    //     const response = await fetch(`http://localhost:5000/rename_file/${new_name.value}`, {
    //         method: "POST",
    //         body: new URLSearchParams({"file_name": valores[1], "new_file_name": new_name.value})
    //     });
    //     // save();
    // }
})

var add_options = document.getElementById("add_options");

var button_add = document.getElementById("add_button");

button_add.addEventListener("click", function(){
    console.log(add_options.style.display)
    var style_add = window.getComputedStyle(add_options);
    add_options.classList.toggle("oculto");
})

var folder_options = document.getElementById("folder_options");

var add_folder = document.getElementById("add_folder")
add_folder.addEventListener("click", function() {
    folder_options.classList.toggle("oculto");
})

var folder_button = document.getElementById("new_folder_button");
folder_button.addEventListener("click", async function () {
    var new_folder = document.getElementById("new_folder");
    const response = await fetch(`http://localhost:5000/create_folder/${new_folder.value}`, {
        method: "POST",
        headers: {
            "content-Type": "text/plain"
        },
        body: new_folder.value
    });
    save();    
})

var button_search = document.getElementById("buscador_boton");
button_search.addEventListener("click", async function(){
    const buscado = document.getElementById("buscador");
    if (!buscado.value){}else{
        const response = await fetch(`http://localhost:5000/search_folder/${buscado.value}`);
        const data = await response.json();
        if(data.length != 0){
            console.log(data)
            ordenar( data)
        }else{
            const response = await fetch(`http://localhost:5000/search_file/${buscado.value}`);
            const data = await response.json();
            console.log(data)
            ordenar(data); 
        }
    }
})



