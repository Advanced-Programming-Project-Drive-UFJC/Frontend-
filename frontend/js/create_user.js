var boton_user = document.getElementById("crear_usuario");
var new_user;
var aviso2 = document.getElementById("aviso");


boton_user.addEventListener("click", async function(){
    new_user = document.getElementById("usuario_nuevo").value;
    const response = await fetch(`http://localhost:9090/api/v1/users/get_user/${new_user}`);
    const data = await response.json();
    if (data != null && data.username === new_user){
        aviso2.style.display = "block"; 
        console.log(data);
    }else{
        localStorage.setItem("new_user", new_user)
        window.location.href = "/pages/create_pass.html";
    }
});
