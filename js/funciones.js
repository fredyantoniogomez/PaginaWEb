var url_cliente="https://g7e669d762cadfd-usac3g8s4.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client";
var url_mensaje="https://g7e669d762cadfd-usac3g8s4.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message";
var url_games="https://g7e669d762cadfd-usac3g8s4.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games";

function agregarCliente(){
    var id=Number(document.getElementById("cedula").value);
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var age=Number(document.getElementById("age").value);

    $.ajax({
        method:"POST",
        url:url_cliente,
        data:JSON.stringify({"id":id,"name":name, "email":email, "age":age}),
        dataType:'json',
        contentType:"application/json",
        success:function(respuesta){
            if(respuesta.status=201){
                alert("cliente agregado")
            }
        },
        error:function(error){
            //alert("hubo un problema")
        }
        
    });
    alert("cliente agregado");
}


function agregarJuego(){
    var id=document.getElementById("id").value;
    var developer=document.getElementById("developer").value;
    var minage=document.getElementById("minage").value;
    var category_id=document.getElementById("category_id").value;
    var name=document.getElementById("name").value;

    $.ajax({
        method:"POST",
        url:url_games,
        data:JSON.stringify({"id":id,"developer":developer, "minage":minage, "category_id":category_id, "name":name}),
        dataType:'json',
        contentType:"application/json",
        complete:function(respuesta){
        //    if(respuesta.status=201){
        //        alert("cliente agregado")
        //    }
        },
        error:function(error){
            //alert("hubo un problema")
        }
    });
    alert("cliente agregado");
}

function enviar_mensaje(){
    var id=document.getElementById("idT").value;
    var messagetext=document.getElementById("mensaje").value;

    $.ajax({
        method:"POST",
        url:url_mensaje,
        data:JSON.stringify({"id":id, "messagetext":messagetext}),
        dataType:'json',
        contentType:"application/json",
        complete:function(respuesta){
        //    if(respuesta.status=201){
        //        alert("mensaj agregado")
        //    }
        },
        error:function(error){
            //alert("hubo un problema")
        }
    });
    alert("mensaje creado");
}

function llenar_tabla_games(){
    document.getElementById("actualiza1").style.display='none';
    var tabla_html="";
    $.ajax({
        method:"GET",
        url:url_games,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html=tabla_html+"<tr><td>"+registro.id+"</td><td>"+registro.developer+"</td><td>"+registro.minage+"</td><td>"+registro.category_id+"</td><td>"+registro.name+"</td><td><button onclick=\"precargue_juego("+registro.id+")\">actualizar</button></td></tr>";
            });
            $('#tabla1').html(tabla_html);
        }
    });
}

function llenar_tabla_clientes(){
    var tabla_html1="";
    $.ajax({
        method:"GET",
        url:url_cliente,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html1=tabla_html1+"<tr><td>"+registro.id+"</td><td>"+registro.name+"</td><td>"+registro.email+"</td><td>"+registro.age+"</td></tr>";
            });
            $('#tabla1').html(tabla_html1);
        }
    });
}

function llenar_tabla_mensajes(){
    var tabla_html2="";
    $.ajax({
        method:"GET",
        url:url_mensaje,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                tabla_html2=tabla_html2+"<tr><td>"+registro.id+"</td><td>"+registro.messagetext+"</td><td><button onclick=\"borrar_mensaje("+registro.id+"); location.reload()\">borrar</button></td></tr>";
            });
            $('#tabla1').html(tabla_html2);
        }
    });
}

function borrar_mensaje(id){
    $.ajax({
        method:"DELETE",
        url:url_mensaje,
        data:JSON.stringify({"id":id}),
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
            alert("el registro fue borrado")
        }
    });
    location.reload();
}




function update_juego(id){
    var id=document.getElementById("id").value;
    var developer=document.getElementById("developer").value;
    var minage=document.getElementById("minage").value;
    var category_id=document.getElementById("category_id").value;
    var name=document.getElementById("name").value;

    $.ajax({
        method:"PUT",
        url:url_games,
        data:JSON.stringify({"id":id,"developer":developer, "minage":minage, "category_id":category_id, "name":name}),
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){
        }
    });
    llenar_tabla_games();
    }

function precargue_juego(id){
   // document.getElementById("actualiza0").style.display='none';
    document.getElementById("actualiza1").style.display='block';
    var url_games2=url_games+"/"+id
    $.ajax({
        method:"GET",
        url:url_games2,
        complete:function(respuesta){
            respuesta.responseJSON.items.forEach(registro => {
                document.getElementById("id").value=registro.id;
                document.getElementById("developer").value=registro.developer;
                document.getElementById("minage").value=registro.minage;
                document.getElementById("category_id").value=registro.category_id;
                document.getElementById("name").value=registro.name;
            });
        }
    });
}

function precargue_clientes(id){
    // document.getElementById("actualiza0").style.display='none';
     document.getElementById("actualiza1").style.display='block';
     var url_cliente2=url_cliente+"/"+id
     $.ajax({
         method:"GET",
         url:url_cliente2,
         complete:function(respuesta){
             respuesta.responseJSON.items.forEach(registro => {
                 document.getElementById("id").value=registro.id;
                 document.getElementById("name").value=registro.name;
                 document.getElementById("email").value=registro.email;
                 document.getElementById("age").value=registro.age;
             });
         }
     });
 }
 function update_cliente(id){
    var id=document.getElementById("id").value;
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var age=document.getElementById("age").value;
    const misdatos={ID:id,NAME:name, EMAIL:email,AGE:age};
    let dataset=JSON.stringify(misdatos);

    $.ajax({
        method:"PUT",
        url:url_cliente,
        //data:dataset,
        data:JSON.stringify({"id":id,"name":name, "email":email, "age":age}),
        contentType:"application/json",
        dataType:'json',
        complete:function(respuesta){

        }
    });
    llenar_tabla_clientes();
}

/*
document.getElementById("btnCliente").addEventListener("click", (e) => {
    e.preventDefault()
    agregarCliente()
})*/






/*function peticionPost(){
    const producto={
        codprod:"1",
        nomprod:"CocaCola",
        precio:4000,
        inventario:200
    }
    let datasend=(producto)

    $.ajax({
        method:"POST",
        url:endpoint,
        data:datasemd,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            console.log(response.status)
        },
        error:function(error){
            //console.log("error en la api")
        }
    });
    console.log(data)
}*/