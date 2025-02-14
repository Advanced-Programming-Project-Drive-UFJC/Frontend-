var boton = document.getElementById("siguiente");
var boton2 = document.getElementById("crear_cuenta");
var aviso = document.getElementById("aviso");
boton.addEventListener("click", async function(){
    var user = document.getElementById("usuario").value;
    console.log(user.toLowerCase());
    var contraseña = document.getElementById("contraseña").value;
    try{
        const response = await fetch("http://localhost:9090/api/v1/users/auth", {
            method: "POST",
            body: new URLSearchParams({username: user.toLowerCase(), password: contraseña})
        });
        const data = await response.json();
        console.log(data.username)
        localStorage.setItem("username", data.username)
        window.location.href = "/pages/home_page.html"
    }
    catch(error){
        console.error(error)
        aviso.style.display = "block";
    }
    

});
boton2.addEventListener("click", function(){
    window.location.href = "/pages/create_user.html";
});