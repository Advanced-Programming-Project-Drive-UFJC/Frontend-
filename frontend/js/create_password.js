var boton = document.getElementById("crear_contraseña");
var new_pass;
var new_user = localStorage.getItem("new_user");
var cosa = "caos"
console.log(new_user)
boton.addEventListener("click", async function(){
    var contra = document.getElementById("contra_nueva").value;
    if (contra.length >= 8){
        try{
            const response = await fetch("http://localhost:9090/api/v1/users/add_user", {
                method: "POST",
                body: new URLSearchParams({
                    username: new_user,
                    password: contra
                })
            })
            location.href = "../index_login.html"
        }catch(error){
            console.log(error)

        }
    }
});

