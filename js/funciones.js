$.datepicker.regional['es'] = {
 closeText: 'Cerrar',
 prevText: '<Ant',
 nextText: 'Sig>',
 currentText: 'Hoy',
 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
 dayNames: ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
 dayNamesShort: ['Dom','Lun','Mar','MiÃ©','Juv','Vie','SÃ¡b'],
 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','SÃ¡'],
 weekHeader: 'Sm',
 dateFormat: 'dd/mm/yy',
 firstDay: 1,
 isRTL: false,
 showMonthAfterYear: false,
 yearSuffix: ''
 };
 $.datepicker.setDefaults($.datepicker.regional['es']);

$(function()
 {
    $( "#datepicker" ).datepicker();
    $( "#datepicker2" ).datepicker();
    $( "#datepicker3" ).datepicker();
  });

$(document).on('ready', function(){

    $('body').on('click','#datepicker4',function(){
        $("body #datepicker4").datepicker();
    });
})

$(function()
 {
  $('#basicExample').timepicker({ 'step': 15,
                                  'scrollDefault': 'now',
                                  'minTime': '7:00am',
                                  'maxTime': '11:30pm' });
  $('#basicExample2').timepicker({ 'step': 15,
                                  'scrollDefault': 'now',
                                  'minTime': '7:00am',
                                  'maxTime': '11:30pm' });
  });

$(document).on("ready",funciones);

function funciones()
{
    $("#new_save_meeting").on("click",save_meting);
    $("#tagNew").on("click",tagNew);
    $("#tagNew-n").on("click",tagNew);
    $("#N_meeting").on("click",new_meeting);
    $("#SaveTopicNew").on("click",SaveTopicNew);
    $("#save-w").on("click",save_w_form);
    $("#Nw_tareas").on("click",showtareasN);
    $("#w-adduser").on("click",showAddUserW);
    $("#show_act").on("click",showactividades);
    $("#show_act").on("click",genlistactv);
    $("#show_act").on("click",genlistfull);
    $("#show_act").on("click",genlistend);
    $("#pass").on("keydown",logOn);
    $("#jb_etiqueta_reun").attr("onkeyup","busquedaSimpleUsers(this.value,1);");
    $("#meeting-user-share").attr("onkeyup","busquedaSimpleUsers(this.value,2);");
    $("#w-addtag").attr("onkeyup","busquedaSimpleUsersW(this.value,1);");
    $("#adduser-w").attr("onkeyup","busquedaSimpleUsersW(this.value,2);");

}

/*
$(document).on("ready",funkey);
//atajo para llamar una nueva reunion rapido
function funkey()
{
    $(document).keyup(function(event){
        var letra = event.keyCode;//84->t
        if(letra == 82)
        {
            new_meeting();
        }
    });
}
*/
function logOn(event)
{
    if(event.keyCode == 13)
    {
        loger();
    }

}
function loger()
{
    var usuario = $("#logform #usuario").val();
    var pass = $("#logform #pass").val();
    var ruta = "funciones/eventos.php";
    var txt = "op=1&use="+usuario+"&pas="+pass;

    if (usuario == "" || pass == "") {
        alert("llenar todos los campos");
    }else
    {
        $.post(ruta,txt, function(data){
            if (data === "1") {
                location.reload();
            }
            else
            {
                alert(data);
            }
          
        });
    }    
}

function logend()
{           
    var txt = "op=2";
    var ruta = "funciones/eventos.php";
    $.post(ruta, txt, function(data) {
        if (data == 1) { location.reload();}
    });
}
/// guardamos los datos de la reunion
function save_meting()
{
    if (!$(".form_reun #idreunion").length)
     {   //si no exist por primera vez lo registra 
            var form = $("#form_reunion_new").serialize();
            if ($(".meetingTitulo").val() =="" || $("#basicExample2").val() == "") { 
                alert("llenar los campos");
            }
        else{    
            // jalamos los ids de los tag seleccionados
            var padre = $('#jb_lista_tag_click_re div');
            var idtag="";
            $.each(padre,function(index) {
                 var id = $(this).attr("id").replace("tag_selected_","");
                idtag+=id+',';
            }); 
             idtag+=0;

             //jalamos los ids de los usuarios participantes
             var padreUsr = $("#jb_lista_usuarios_click_re div");
             var usrid="";
             $.each(padreUsr, function() {
                  var idusr= $(this).attr("id").replace("user_selected_","");
                  usrid += idusr+',';
             });
             usrid+=0;


            var idus = $(".session #idus").val();
            var f = form+"&selec=1&iduser="+idus+"&idt="+idtag+"&usrdi="+usrid;
            var ruta = "funciones/funciones.php";
            $.post(ruta, f, function(data) {
                if (data != 0) {
                    var span = "<span>Se registro la Reunion</span>";
                    $("#meetingShow").append(span);
                    setTimeout(function(){
                        $("#meetingShow").fadeOut(1500);
                    },3000);
                    $("#new_save_meeting").attr('value','Actualizar');
                    $("#topiclayer").show("slow");
                }
                
                $(".form_reun").append('<input type="hidden" id="idreunion" value='+data+'>');
            });
        }
    }else
    {       //jalamos los ids de los tag seleccionados en la actualizacion
        var padre = $('#jb_lista_tag_click_re div');
            var idtag="";
            $.each(padre,function(index) {
                 var id = $(this).attr("id").replace("tag_selected_","");
                idtag+=id+",";
            }); 
            idtag+=0;
           
            //jalamos los ids de los usuarios seleccionados en la actualzacion
             var padreUsr = $("#jb_lista_usuarios_click_re div");
             var usrid="";
             $.each(padreUsr, function() {
                  var idusr= $(this).attr("id").replace("user_selected_","");
                  usrid+=idusr+',';
             });
             usrid+=0;
            //hace una actualizacion de la reunion 
            var idre = $("#idreunion").val();
            var form = $("#form_reunion_new").serialize();
            var idus = $(".session #idus").val();
            var f = form+"&selec=1&iduser="+idus+"&idre="+idre+"&idt="+idtag+"&usrdi="+usrid;
            var ruta = "funciones/funciones.php";
            $.post(ruta, f, function(data) {
                var span ="<span>"+data+"</span>";
                if ($("#meetingShow span").length) {
                    $("#meetingShow span").remove();
                    $("#meetingShow").append(span);
                    setTimeout(function(){
                        $("#meetingShow").fadeOut(1500);
                    },3000);
                }
            });
    }
}

function dellParticipanteReunion(id)
{
    //"&id="+$(".session #idus").val()+
        if ($("#idreunion").length!==0) {
            var f = "selec=17&idp="+id+"&idre="+$("#idreunion").val();
            var ruta = "funciones/funciones.php";
            $.post(ruta, f, function(data) {
                $("#meetingShow").css('display', 'block');
                $("#meetingShow span").remove();
                $("#meetingShow").append("<span>Se elimino le usuario de la reunion</span>");
                 setTimeout(function(){
                        $("#meetingShow").fadeOut(1500);
                    },3000);

            });
        }
}



function delltagTarea(id)
{
    //"&id="+$(".session #idus").val()+
        if ($("#idreunion").length!==0) {
            var f = "selec=18&idt="+id+"&idre="+$("#idreunion").val();
            var ruta = "funciones/funciones.php";
            //alert(f);
            $.post(ruta, f, function(data) {
                $("#meetingShow").css('display', 'block');
                $("#meetingShow span").remove();
                $("#meetingShow").append("<span>Se elimino la etiqueta de la reunion</span>");
                 setTimeout(function(){
                        $("#meetingShow").fadeOut(1500);
                    },3000);

            });
        }
}
function showactividades()
{
    $(".new-w").css({display:'none'});
    $(".main-home").css({display:'none'});
    $(".meeting_new").css({display:'none'});
    $(".tareas").css({display:'block'});
    $(".cuerpo-tareas").css({display:'block'});
    $("#jb_lista_tag_click").empty();
    $("#jb_lista_tag_click_re").empty();
    $("#jb_lista_usuarios_click").empty();
    $("#jb_lista_usuarios_click_re").empty();
    $("#jb_ul_data_user").empty();
    showAddUserW();
}
function showtareasN()
{   
    $(".main-home").css({display:'none'});
    $(".meeting_new").css({display:'none'});
    $(".tareas").css({display:'block'});
    $(".cuerpo-tareas").css({display:'none'});
    $(".new-w").css({display:'block'});
    $("#jb_etiquetas ul").remove();
    $("#jb_result_tags div").remove();
    $("#form-w #jb_lista_usuarios_click").empty();
    $("#form-w #jb_lista_tag_click").empty();
    $("#form-w #jb_ul_data_user").empty();
    $("#jb_list_user").empty().hide();
    $("#form-w #jb_etiquetas").css({"display":"none"});
    $("#form-w #jb_list_user").css({"display":"none"});
    $("#form-w #adduser_w").val("");
    $("#form-w #datepicker3").val("");
    $("#form-w #w-addtag").val("");
    $("#form-w #notas-w").val("");
    showAddUserW();
}

//muestra la opcion de crear etiquetas nuevas
function tagNew()
{
    $(".meeting_active").remove();
    $(".etiquetas").show();
    $("#capatrans").css('display','block');
    $("#closeUpop").on("click",function(){
        $("#capatrans").css('display','none');
    });
    listatagshow($("#idus").val());
    $(".cuerpo_tag .tag_der :text").val("");
}


//generamos nuevo formulario para una nueva reunion 

function new_meeting()
{   //alert("asas");
    $(".meeting_left").css('display','none');
    $(".meeting_rigth").css('display','none');
    $(".tareas").css('display','none');
    $(".meeting_new").css('display','block');
    $(".meeting_new :text").val("");
    $("#idreunion").remove();
    $("#topiclayer form ul #topiclist").remove();
    $("#form-w #jb_lista_tag_click").empty();
    $("#form-w #jb_lista_usuarios_click").empty();
    $("#jb_lista_usuarios_click_re").empty();
    $("#jb_lista_usuarios_click").empty();
    $("#jb_list_user").empty().hide();
    $("#jb_ul_data_user").empty();
    $("#topiclayer").css('display', 'none');
    $("#jb_lista_tag_click_re div").remove()
    $("#jb_lista_tag_click div").remove()
    $("#meeting-user-share").click();
    $("#jb_etiqueta_reun").click();
    $("#form_reunion_new #jb_etiquetas").hide();

}

function tag_sel(event)
{   //muestra la etiquetas
    if (event == 1) 
    {
        $("#tag_etiqueta").show();
        $(".tag_izq_tag").show();
        listatagshow($("#idus").val());
        tagNewclik();
        $("#tag_departamentos").hide();
        $(".tag_izq_depa").hide();
        $("#tag_proyectos").hide();
        $(".tag_izq_proy").hide();
        $("#jb_lista_usuarios_click_proyect").empty();
        $("#jb_list_user_proyect").empty();
        $("#jb_lista_usuarios_click_depa").empty();
        $("#jb_list_user_departamentos").empty();
        //$("#jb_lista_usuarios_click_re").empty();
    }//muestra los deparatamentos
    if (event == 2) 
    {
      $("#tag_etiqueta").hide();
      $(".tag_izq_tag").hide();
      $("#tag_departamentos").show();
      $(".tag_izq_depa").show()
      listadepashow($("#idus").val());
      $("#tag_proyectos").hide();;
      $(".tag_izq_proy").hide();
        $("#jb_lista_usuarios_click_proyect").empty();
        $("#jb_list_user_proyect").empty();
        $("#jb_lista_usuarios_click_depa").empty();
        $("#jb_list_user_departamentos").empty();
       // $("#jb_lista_usuarios_click_re").empty();
    }// muestra los proyectos
    if (event == 3)
    {
      $("#tag_etiqueta").hide();
      $(".tag_izq_tag").hide();
      $("#tag_departamentos").hide();
      $(".tag_izq_depa").hide();
      $("#tag_proyectos").show();
      $(".tag_izq_proy").show();
        listaproyshow($("#idus").val());
        //$("#jb_lista_usuarios_click_re").empty();
        $("#jb_lista_usuarios_click_proyect").empty();
        $("#jb_list_user_proyect").empty();
        $("#jb_lista_usuarios_click_depa").empty();
        $("#jb_list_user_departamentos").empty();
    }     
    
}
//guarda la etiqeuta cuando dan click en guardar del form
function savetag()
{
    //e.preventDefault();
    if($("#idus").length!==""){
        var titulo = $("#nombreTag").val();
        var tipo   = $("#tipoEtiqueta").val();
        var iduser = $("#idus").val();
        if(titulo !=""){
            var txt = "selec=3&ti="+titulo+"&tipo="+tipo+"&idus="+iduser;
            var ruta ="funciones/funciones.php";
            $.post(ruta,txt, function(data){

               if(data!="ok"){
                    listatagshow(iduser);
               }
               if(data == "ok")
               {
                    var html ='<label class="alerta"for="">La Etiqueta  Ya Esta Registrada.</label>';
                    $("#tag_etiqueta").append(html);
                    setTimeout(function(){
                        $("#tag_etiqueta .alerta").hide();
                    },1500);
               }
            });
        }
        else{
            var html ='<label class="alerta"for="">Escriba una etiqueta.</label>';
            $("#tag_etiqueta").append(html);
            setTimeout(function(){
                $("#tag_etiqueta .alerta").hide();
            },1500);
        }
    }
}

//muestra la lista de etiquetas dependiendo del usuario
function listatagshow(iduser)
{
    var t = "op=3&tab=1&idcam=1&id="+iduser;
    var ruta ="funciones/eventos.php";

    $.post(ruta, t, function(datas){
        var list = '<ul class="listado sinborde">';

            $.each(datas, function(k,v)
            {  
              list+= '<li class="listadoli" ><a><p onclick="tagEditList('+v.id+',\''+v.nombre+'\');">'+v.nombre+'</p></a></li>'; 
            });
             list+="</ul>";
        if ($("#listEtiqueta ul").length) {
            $("#listEtiqueta ul").remove();
            $("#listEtiqueta").append(list);
        }
        else
        {
            $("#listEtiqueta").append(list);
        }

    }).fail(function(){
        alert("Fallo la Respuesta");
    });
}



//genera un formulario para editar la etiqueta
function tagEditList(id,nom)
{
  var form ='<form action="#" >';
      form+='<div><label>Titulo:</label> <input type="text" name="tituloTag" id="nombreTag" value="'+nom+'"></div>';
      form+='<div><label>Tipo de Etiqueta:</label><select id="tipoEtiqueta">';
      form+='<option value="Normal">Normal</option><option value="Departamento">Departamento</option><option value="Proyecto">Proyecto</option>';
      form+='</select></div><span onclick="dellTag('+id+');"><a>Eliminar</a></span><input type="button" value="Actualizar" id="upEtiqueta">';
      form+='</form>';

    if ($("#tag_etiqueta form").length) {
        $("#tag_etiqueta form").remove();
        $("#tag_etiqueta").append(form);
    }
}
//genera un formulario para editar la etiqueta
function tagEditListdep(id,nom)
{
    var txt = "selec=33&dep="+id+"&us="+$("#idus").val();
    var ruta = "funciones/funciones.php";
    $.post(ruta,txt,function(data){
        console.log(data);
    });

  var form ='<form action="#" >';
      form+='<div><label>Titulo:</label> <input type="text" name="tituloTag" id="nombreTag" value="'+nom+'"></div>';
      form+='<div><label>Tipo de Etiqueta:</label><select id="tipoEtiqueta">';
      form+='<option value="Normal">Normal</option><option value="Departamento">Departamento</option><option value="Proyecto">Proyecto</option>';
      form+='</select></div><span onclick="dellTag('+id+');"><a>Eliminar</a></span><input type="button" value="Actualizar" id="upEtiqueta">';
      form+='</form>';

    if ($("#tag_etiqueta form").length) {
        $("#tag_etiqueta form").remove();
        $("#tag_etiqueta").append(form);
    }
}
//genera un formulario para editar la etiqueta
function tagEditListproy(id,nom)
{
  var form ='<form action="#" >';
      form+='<div><label>Titulo:</label> <input type="text" name="tituloTag" id="nombreTag" value="'+nom+'"></div>';
      form+='<div><label>Tipo de Etiqueta:</label><select id="tipoEtiqueta">';
      form+='<option value="Normal">Normal</option><option value="Departamento">Departamento</option><option value="Proyecto">Proyecto</option>';
      form+='</select></div><span onclick="dellTag('+id+');"><a>Eliminar</a></span><input type="button" value="Actualizar" id="upEtiqueta">';
      form+='</form>';

    if ($("#tag_etiqueta form").length) {
        $("#tag_etiqueta form").remove();
        $("#tag_etiqueta").append(form);
    }
}

//genera un nuevo formulario para registrar nueva etiqueta
function tagNewclik()
{

     var form ='<form action="#" >';
      form+='<div><label>Titulo:</label> <input type="text" name="tituloTag" id="nombreTag"></div>';
      form+='<div><label>Tipo de Etiqueta:</label><select id="tipoEtiqueta">';
      form+='<option value="Normal">Normal</option><option value="Departamento">Departamento</option><option value="Proyecto">Proyecto</option>';
      form+='</select></div><input type="button" onclick="savetag();" value="Guardar" id="saveEtiqueta">';
      form+='</form>';

    if ($("#tag_etiqueta form").length) {
        $("#tag_etiqueta").empty();
        $("#tag_etiqueta").append(form);
    }
}

//genera un nuevo formulario para registrar nueva etiqueta
function tag_new_depa()
{
    if ($("#tag_departamentos form").length) {
        $("#tag_departamentos form :text").val("");
        
    }

        $("#jb_lista_usuarios_click_depa").empty();
        $("#jb_list_user_departamentos").empty();
}

//genera un nuevo formulario para registrar nueva etiqueta
function tag_new_proy()
{
    if ($("#tag_proyectos form").length) {
        $("#tag_proyectos form :text").val("");
        
    }

        $("#jb_lista_usuarios_click_proyect").empty();
        $("#jb_list_user_proyect").empty();
}

//// en listamos los departamentos de lado izquierdo
function listadepashow(iduser)
{
    var t = "op=3&tab=2&idcam=2&id="+iduser;
    var ruta ="funciones/eventos.php";
    $("#tagselec").attr("onclick","tag_new_depa();");
    $.post(ruta, t, function(datas){
        var list = '<ul class="listado sinborde">';

            $.each(datas, function(k,v)
            {  
              list+= '<li class="listadoli" ><a><p onclick="tagEditListdep('+v.id+',\''+v.nombre+'\');">'+v.nombre+'</p></a></li>'; 
            });
             list+="</ul>";
        if ($("#listEtiqueta_depa ul").length) {
            $("#listEtiqueta_depa ul").remove();
            $("#listEtiqueta_depa").append(list);
        }
        else
        {
            $("#listEtiqueta_depa").append(list);
        }

    }).fail(function(){
        alert("Fallo la Respuesta");
    });
}

function listaproyshow(iduser)
{
    var t = "op=3&tab=3&idcam=3&id="+iduser;
    var ruta ="funciones/eventos.php";
    $("#tagselec").attr("onclick","tag_new_proy();");
    $.post(ruta, t, function(datas){
        var list = '<ul class="listado sinborde">';

            $.each(datas, function(k,v)
            {  
              list+= '<li class="listadoli" ><a><p onclick="tagEditListproy('+v.id+',\''+v.nombre+'\');">'+v.nombre+'</p></a></li>'; 
            });
             list+="</ul>";
        if ($("#listEtiqueta_proy ul").length) {
            $("#listEtiqueta_proy ul").remove();
            $("#listEtiqueta_proy").append(list);
        }
        else
        {
            $("#listEtiqueta_proy").append(list);
        }

    }).fail(function(){
        alert("Fallo la Respuesta");
    });
}





//guarda el departamento generado
function savedepa()
{
    //$("#tag_departamentos :text").val("");
 
    //e.preventDefault();
    if($("#idus").length!==""){
        
            var iduser = $("#idus").val();
            var titulo = $("#nombreDepa").val();
            var miembros   = ""; 
            var padre = $('#jb_lista_usuarios_click_depa div');
            $.each(padre,function(index) {
                 var id = $(this).attr("id").replace("user_selected_dp_","");
                miembros+=id+',';
            }); 
             miembros+=0;

        if(titulo !=""){
            var txt = "selec=31&ti="+titulo+"&miembros="+miembros+"&idus="+iduser;
            var ruta ="funciones/funciones.php"
            $.post(ruta,txt, function(data){

               if(data!="ok"){
                    listadepashow(iduser);
               }
               if(data == "ok")
               {
                    var html ='<label class="alerta"for="">La Etiqueta  Ya Esta Registrada.</label>';
                    $("#tag_departamentos").append(html);
                    setTimeout(function(){
                        $("#tag_departamentos .alerta").hide();
                    },1500);
               }
            });
        }
        else{
            var html ='<label class="alerta"for="">Escriba una etiqueta.</label>';
            $("#tag_departamentos").append(html);
            setTimeout(function(){
                $("#tag_departamentos .alerta").hide();
            },1500);
        }
    }

}

function saveproy()
{
     if($("#idus").length!==""){
        
            var iduser = $("#idus").val();
            var titulo = $("#nombreProy").val();
            var miembros   = ""; 
            var padre = $('#jb_lista_usuarios_click_proyect div');
            $.each(padre,function(index) {
                 var id = $(this).attr("id").replace("user_selected_proy_","");
                miembros+=id+',';
            }); 
             miembros+=0;

        if(titulo !=""){
            var txt = "selec=32&ti="+titulo+"&miembros="+miembros+"&idus="+iduser;
            var ruta ="funciones/funciones.php"
            $.post(ruta,txt, function(data){

               if(data!="ok"){
                    listaproyshow(iduser);
               }
               if(data == "ok")
               {
                    var html ='<label class="alerta"for="">La Etiqueta  Ya Esta Registrada.</label>';
                    $("#tag_departamentos").append(html);
                    setTimeout(function(){
                        $("#tag_departamentos .alerta").hide();
                    },1500);
               }
            });
        }
        else{
            var html ='<label class="alerta"for="">Escriba una etiqueta.</label>';
            $("#tag_departamentos").append(html);
            setTimeout(function(){
                $("#tag_departamentos .alerta").hide();
            },1500);
        }
    }
}

//elimina las etiquetas guardadas
//
function dellTag(datos)
{
    var id = $("#idus").val();
     var t = "tab=2&idcam=2&id="+id+"&ids="+datos;
    var ruta ="funciones/eventos.php";
    $.post(ruta,t, function(data){
        if(data==1){
            tagNewclik();
            listatagshow(id);
        }
    });


}

///generador de listas al cargar 
$(document).on("ready",cargareuniones);

function cargareuniones(){
    reunionesnuevas();
    reunionespasadas();
}
//generamos lal istas de las reuniones
function reunionesnuevas(){
    if($("#idus").length){ 
    var tx = "selec=2&idusua="+$("#idus").val();
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
            //console.log(data);
            
        $.each(data, function(k, v)
        {
            var datahtml='<div id="'+v.idre+'" class="jb_nuevas_reuniones">';
                datahtml+='<img src="img/avatar_2x.png" alt="imagen_user" height="50" width="80">';
                datahtml+='<div  class="meeting_head">';
                datahtml+='<h4 onclick="jb_reunion_upop(\''+v.idre+'\')">'+v.nombre+'</h4><span class="alertDia"></span>';
                datahtml+='<div class="meeting_date">'+v.fecha+' '+v.hora+'</div>';
                datahtml+='<div class="meeting_user">'+v.usuario+'</div>';
                datahtml+='</div>';
                datahtml+='<div class="btn_down" onclick="showtemasreunion('+v.idre+',0)"><span  class="icon">:</span></div>';
                datahtml+='<div class="btn_del" onclick="movListReunion('+v.idre+','+v.iduser+')"><span class="icon">Â</span></div>';
                datahtml+='<div id="list-'+v.idre+'"class="meeting_topic">';
                datahtml+='<ul>';
                var lis=v.lista;
                $.each(lis,function(i,t){
                    datahtml+='<li id="topiclist"><span>'+t.texts+'</span></li>';    
                });
                datahtml+='</ul>';
                datahtml+='</div>';
                datahtml+='</div>';

            $("#reunionesOk #showTopic").append(datahtml);
           
            if (v.count_fecha <= 0) {
               $("#"+v.idre).addClass('meeting_post timedead');
               var h = '<span class="icon">8</span>Reunion Del Dia';
               $("#" + v.idre + " .alertDia").append(h);
            }
            if (v.count_fecha > 0 && v.count_fecha <=3) {
              $("#"+v.idre).addClass('meeting_post timeout');
              var h = '<span class="icon">4</span>Reunion Proxima';
                $("#" + v.idre + " .alertDia").append(h);
            }
            if (v.count_fecha >3) {
                 $("#"+v.idre).addClass('meeting_post norma');
               var h = '<span class="icon normal">K</span>';
                    $("#" + v.idre + " .alertDia").append(h);
            }
             
            
        });

    }).fail(function(){
        alert("Error En El Servidor. 01");
    });
    }
    
}


//generamos la lista de reuniones pasadas
function reunionespasadas(){
    if($("#idus").length){
    var tx = "selec=12&idusua="+$("#idus").val();
    var ruta = "funciones/funciones.php";
        if ($("#reunionespas #showlisendreuniones .meeting_end").length) {
            $("#reunionespas #showlisendreuniones .meeting_end").remove();}
    $.post(ruta,tx,function(data){
        $.each(data,function(k,v){

            var datahtml='<div id="'+v.idre+'" class="meeting_end jb_antiguas_reuniones">';
                datahtml+='<img src="img/avatar_2x.png" alt="imagen_user" height="50" width="80">';
                datahtml+='<div  class="meeting_head">';
                datahtml+='<h4>'+v.nombre+'</h4><span class="alertDia">Reunion Terminada<span class="icon normal">Ë</span></span>';
                datahtml+='<div class="meeting_date">'+v.fecha+'  '+v.hora+'</div>';
                datahtml+='<div class="meeting_user">'+v.usuario+'</div>';
                datahtml+='</div>';
                datahtml+='<div class="btn_down" onclick="showtemasreunion('+v.idre+',0)"><span  class="icon">:</span></div>';
                datahtml+='<div class="btn_del" onclick="movListReunion('+v.idre+','+v.iduser+')"><span class="icon">Â</span></div>';
                datahtml+='<div id="list-'+v.idre+'"class="meeting_topic">';
                datahtml+='<ul>';
                var lis=v.lista;
                $.each(lis,function(i,t){
                    datahtml+='<li id="topiclist"><span>'+t.texts+'</span></li>';    
                });
                datahtml+='</ul>';
                datahtml+='</div>';
                datahtml+='</div>';

                $("#reunionespas #showlisendreuniones").append(datahtml);
        });
    }).fail(function(){
        alert("Error En El Servidor");
    });
    }
}

//////////movemos la reunion como terminada o pasada
function movListReunion(id,iduser)
{
    var txt = "selec=4&val=0&id="+id+"&idus="+iduser;
    var ruta= "funciones/funciones.php";
    $.post(ruta,txt, function(data){
        $("#"+id).remove();
        reunionespasadas();
    });
}
//mostramos la reunion en accion
function jb_reunion_upop(id)
{
        
    $("#capatrans").css({'display':'block'});
    $(".capaover #contenUpop").css({'height':'650','background-color':'transparent','border':'none','box-shadow':'none'});
    $("#closeUpop").on("click",function(){
        $("#capatrans").css('display','none');
    });

    $(".etiquetas").css({"display":"none"});
    $(".meeting_active").remove();

    var txt = "selec=13&id="+id+"&idusua="+$("#idus").val();
    var ruta ="funciones/funciones.php";

    $.post(ruta, txt, function(data) {
        //console.log(data); 
            //jeneramos la lista de usuarios
            $.each(data,function(k,v){
            var participan = v.participantes;
            var usrparti='';
            $.each(participan,function(k,p){
                usrparti+=p.nomEmp+' ';
            });
            //generamos las lista de etiquetas
            var tag = v.etiquetas;
            var etique='';
            $.each(tag,function(k,t){
                etique+=t.nomTag+' ';
            });

           var  html='<div class="meeting_active" style="display:block">';
           html+='<div class="form_reun">';
           html+='<form action="#" id="form_reunion_act" method="post" accept-charset="utf-8">';
           html+='<input type="text" name="nom_reunion" class="meetingTitulo" value="'+v.nombre+'" placeholder="Escribe el nombre de la reunion">';
           html+='<div class="meeting_time"><div>Fecha: '+v.fecha+'</div><div>Hora Inicio: '+v.hora+'</div></div>';
           html+='<h4>Reunion</h4><span class="icon">K</span>';
           html+='<input type="hidden" id="idReunAct" value="'+v.idre+'" />';
           html+='<label><p>Etiquetas:</p><input type="text" name="etiquetasact" value="'+etique+'" placeholder="Escribe las etiquetas"></label>';
           html+='<label><p>Lugar:</p><input type="text" name="lugar" value="'+v.localizacion+'" placeholder="Escribe el lugar del evento"></label>';
           html+='<label><p>Participantes:</p><input type="text" id="meeting-user" name="participantes" value="'+usrparti+'" placeholder="Escribe el nombre de los participantes"></label>';
           // html+='<input type="button" value="Guardar" id="new_save_meeting">';
            html+='</form>';
            html+='<div id="newtopic_'+v.idre+'" class="topicAgregar">';
            html+='<div id="topiclayer_'+v.idre+'" style="display:block">';
            html+='<h3>Temas a tratar</h3>';
            html+='<form action="">';
            html+='<ul>';



                var list = v.lista;
                $.each(list,function(k,v){
                    html+="<li id='topiclist_"+v.id+"' class='topiclist' ><span id='tema_prim_"+v.id+"'>"+v.text+"</span><div id='listanotas_"+v.id+"'><div id='notas'>";
                    html+='<ul class="notas">';

                        var list = v.resoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                                
                        var tar= v.tareas;
                        $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                        });
                        html+="</ul>";
                                    
                        var arch = v.archivos;
                        html+="<div class='archivos'><ul>";
                        $.each(arch, function(k,a){
                        var img = isImage(a.tipo);
                            if(img){
                                    html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                            }else{
                                    html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                            }
                        });
                        html+="</ul></div>";


                        html+="</div></div><div id='sublistaction_"+v.id+"'></div><ul id='subtema_"+v.id+"'>";
                   

                    var sublis= v.sublist;
                    $.each(sublis, function(k,l){
                            html+="<li id='subtopiclist_"+l.idsub+"' class='subtopiclist' style='color: green; text-shadow: none;' ><span id='tema_sub_"+l.idsub+"'>"+l.subtema+"</span><input type='hidden' value='"+v.id+"' id='idtema'>";
                            html+="<div id='sublistanotas_"+l.idsub+"'><div id='notas'>";
                            html+='<ul class="notas">';

                            var list = l.subresoluciones;
                            $.each(list, function(i, r) {
                                    html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                            });
                            
                            var tar= l.subtareas;
                               $.each(tar, function(p,ac){
                                    html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                               });
                             html+="</ul>";
                                
                            var arch = l.subarchivos;
                            html+="<div class='archivos'><ul>";
                                $.each(arch, function(k,a){
                                   var img = isImage(a.tipo);
                                    if(img){
                                            html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                        }else{
                                            html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                        }
                                });
                            html+="</ul></div>";



                            html+="</div></div><div id='sub_listaction_"+l.idsub+"'></div> </li>";
                    });
                    html+='</ul></li>';



                /*
             
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_meeting_act_'+t.ids+'" class="up_acrh"/></span><input type="button" id="arch_reunAct" onclick="uparchivo(1,'+t.ids+','+v.idre+');"value="Agregar" />';
                */
            });
            html+='</ul>';
            html+='</form>';
            html+='</div>';
            html+='</div><form action="#" method="post"><label for="">Nuevo Tema:</label><input type="text"  id="nue_tema_'+v.idre+'"placeholder="Escribe El tema a tratar" /><input type="button" value="agregar" onclick="saveTemaActivre('+v.idre+');"/></form>';
            html+='</div>';
            html+='</div>';


            $("#contenUpop").append(html);
            $("[id^=topiclist_] [id^=tema_prim_]").click();
            $("[id^=topiclist_] [id^=subtema_]").click();
        });


    }).fail(function(){
        alert("Error En El Servidor");
    });

}


//agregamos nuevos temas ala reunion activa
function saveTemaActivre(idre)
{
    var txt="selec=27&ti="+$("#nue_tema_"+idre).val()+"&id="+idre;
    //alert(txt);
    var ruta="funciones/funciones.php";
    $.post(ruta,txt, function(data){
        if (data!=""){
            genListReunActv(idre);
        }
            
    });
}
//// genereamos la lista al momento de escribir todo
function genListReunActv(idre)
{
    var txt = "selec=13&id="+idre+"&idusua="+$("#idus").val();
    var ruta ="funciones/funciones.php";
    $.post(ruta, txt, function(data) {
        var html="";
                $.each(data,function(k,v){
                    var li=v.lista;
                    $.each(li, function(i, va) {
                            html+="<li id='topiclist_"+va.id+"' class='topiclist' ><span id='tema_prim_"+va.id+"'>"+va.text+"</span><div id='listanotas_"+va.id+"'><div id='notas'>";
                            html+='<ul class="notas">';
                         
                            var list = va.resoluciones;
                            $.each(list, function(i, r) {
                                    html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                            });
                                    
                            var tar= va.tareas;
                            $.each(tar, function(p,ac){
                                    html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                            });
                            html+="</ul>";

                            var arch = va.archivos;
                            html+="<div class='archivos'><ul>";
                            $.each(arch, function(k,a){
                            var img = isImage(a.tipo);
                                if(img){
                                        html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                }else{
                                        html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                }
                            });

                            html+="</ul></div>";
                            html+="</div></div><div id='sublistaction_"+va.id+"'></div><ul id='subtema_"+va.id+"'>";

                            var sublis= va.sublist;
                            $.each(sublis, function(k,l){
                                    html+="<li id='subtopiclist_"+l.idsub+"' class='subtopiclist' style='color: green; text-shadow: none;' ><span id='tema_sub_"+l.idsub+"'>"+l.subtema+"</span><input type='hidden' value='"+v.id+"' id='idtema'>";
                                    html+="<div id='sublistanotas_"+l.idsub+"'><div id='notas'>";
                                    html+='<ul class="notas">';

                                    var list = l.subresoluciones;
                                    $.each(list, function(i, r) {
                                            html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                                    });
                                    
                                    var tar= l.subtareas;
                                       $.each(tar, function(p,ac){
                                            html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                                       });
                                     html+="</ul>";
                                        
                                    var arch = l.subarchivos;
                                    html+="<div class='archivos'><ul>";
                                        $.each(arch, function(k,a){
                                           var img = isImage(a.tipo);
                                            if(img){
                                                    html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                                }else{
                                                    html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                                }
                                        });
                                    html+="</ul></div>";
                                    html+="</div></div><div id='sub_listaction_"+l.idsub+"'></div> </li>";
                            });
                            html+='</ul></li>';
                        
                    });
                    $("#topiclayer_"+idre+" form ul").empty();
                    $("#topiclayer_"+idre+" form ul").append(html);
                    $("#nue_tema_"+idre).val("");
                    $("#topiclayer_"+idre+" [id^=topiclist_]").click();
                    $("[id^=topiclist_] [id^=subtopiclist_]").click();    
                });
                    
    });

}
///mostramos las opciones de los elementos de laslistas activas
function block_oplits(id)
{
    var detectShow = $("[id^=text_check_visible_]")
    $.each(detectShow, function(k,v){
        if($('#'+v.id).is(":visible"))
        {
            $('#'+v.id).hide();
            $(".mensaje span").remove();
            $(".showImage img").remove();
        }
        var id_txt = v.id.replace("text_check_visible_","");
        if($('#txt_'+id_txt+' #form_tarea_tema').length > 0)
        {

            $(".mensaje span").remove();
            $(".showImage img").remove();
            $('#txt_'+id_txt+' #form_tarea_tema').remove();
            $("#txt_"+id_txt+" div").show();
            $("#txt_"+id_txt+" textarea").show();
        }
   });
    $(".opciones_list_activ_"+id).css({"display":"block"});
}


//function guardamos la accion de la lista 
function save_accionlist(id,txt)
{
    if($("#textolist_activ_"+id).val()!=""){
        var idre= $("#idReunAct").val();
        var txto="selec=14&id="+id+"&tipo="+txt+"&text="+$("#textolist_activ_"+id).val()+"&idre="+idre+"&idus="+$("#idus").val();
        var ruta = "funciones/funciones.php";
        $.post(ruta, txto, function(data){
            if($("#listanotas_"+id+" #notas").length > 0){
                $("#listanotas_"+id+" #notas").empty();
            }

             $.each(data, function(k,v){
                    var html='<ul class="notas">';

                    var list = v.resoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                        
                    var tar= v.tareas;
                           $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                           });
                         html+="</ul>";
                            
                    var arch = v.archivos;
                    html+="<div class='archivos'><ul>";
                            $.each(arch, function(k,a){
                               var img = isImage(a.tipo);
                                if(img){
                                        html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                    }else{
                                        html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                    }
                            });
                    html+="</ul></div>";
                $("#listanotas_"+id+" #notas").append(html);
            });

        }).fail(function(){ alert("Fallo Servidor");});
    }else{
        alert("No has escrito nada");
    }
}


//////funcion para visualisas las notas en la reunion de los temas
function show_listreunion(id)
{
    //console.log(id);
    var idre= $("#idReunAct").val();
    var txto="selec=21&id="+id+"&idre="+idre+"&idus="+$("#idus").val()+"&op=1";      
    var ruta = "funciones/funciones.php";

    $.post(ruta, txto, function(data){
            if($("#listanotas_"+id+" #notas").length > 0){
                $("#listanotas_"+id+" #notas").empty();
            }
        $.each(data, function(k,v){
            var html='<ul class="notas">';
            var list = v.resoluciones;
                    $.each(list, function(i, r) {
                        html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                    });
                        
            var tar= v.tareas;
                    $.each(tar, function(p,ac){
                        html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                   });
            html+="</ul>";
                            
            var arch = v.archivos;
            html+="<div class='archivos'><ul>";
                    $.each(arch, function(k,a){
                        var img = isImage(a.tipo);
                        if(img){
                                html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                        }else{
                                html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                        }
                    });
            html+="</ul></div>";
            $("#listanotas_"+id+" #notas").append(html);
        });
        
    }).fail(function(){ alert("Fallo Servidor");});
}


//////funcion para visualisas las notas en la reunion de los temas
function show_listreunion_new(id)
{
    var idre= $("#idreunion").val();
    var txto="selec=21&id="+id+"&idre="+idre+"&idus="+$("#idus").val()+"&op=1";      
    var ruta = "funciones/funciones.php";
    $.post(ruta, txto, function(data){
            if($("#topiclist_"+id+" #listanotas_"+id+" #notas").length > 0){
                $("#topiclist_"+id+" #listanotas_"+id+" #notas").empty();
               // $("#list_"+id+" #tomas"+id+" div").remove();
            }

            $.each(data, function(k,v){
                    var html='<ul class="notas">';

                    var list = v.resoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                        
                    var tar= v.tareas;
                           $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                           });
                         html+="</ul>";
                            
                    var arch = v.archivos;
                    html+="<div class='archivos'><ul>";
                            $.each(arch, function(k,a){
                               var img = isImage(a.tipo);
                                if(img){
                                        html+="<li style='list-style: outside none none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                    }else{
                                        html+="<li style='list-style: outside none none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                    }
                            });
                    html+="</ul></div>";
                $("#topiclist_"+id+" #listanotas_"+id+" #notas").append(html);
            });
    }).fail(function(){ alert("Fallo Servidor");});
}


//////funcion para visualisas las notas en la reunion de los temas
function show_listreunion_newsubtema(id,op)
{
    if(op ==1){
    var idre= $("#idreunion").val();
    }

    if(op ==2){
    var idre= $("#idReunAct").val();
    }

    var txto="selec=21&id="+id+"&idre="+idre+"&idus="+$("#idus").val()+"&op=2";      
    var ruta = "funciones/funciones.php";
    $.post(ruta, txto, function(data){
            if($("#subtopiclist_"+id+" #sublistanotas_"+id+" #notas").length > 0){
                $("#subtopiclist_"+id+" #sublistanotas_"+id+" #notas").empty();
               // $("#list_"+id+" #tomas"+id+" div").remove();
               
            }
            
            $.each(data,function(k,v){
                    var html='<ul class="notas">';

                    var list = v.subresoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                        
                    var tar= v.subtareas;
                           $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                           });
                         html+="</ul>";
                            
                    var arch = v.subarchivos;
                    html+="<div class='archivos'><ul>";
                            $.each(arch, function(k,a){
                               var img = isImage(a.tipo);
                                if(img){
                                        html+="<li style='list-style: outside none none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                    }else{
                                        html+="<li style='list-style: outside none none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                    }
                            });
                    html+="</ul></div>";
                $("#subtopiclist_"+id+" #sublistanotas_"+id+" #notas").append(html);
            });
    }).fail(function(){ alert("Fallo Servidor");});
}

//function guardamos la accion de la lista 
function list_tareasAct(id)
{
    var txto="selec=19&id="+$("#idus").val();
    var ruta = "funciones/funciones.php";
    $.post(ruta, txto, function(data){
       
       $.each(data, function(k,v){
            var htm='<li class="list_'+v.tipo+'">'+v.texto+'</li>';
       });

       $("#tomas"+id).append(htm);

    }).fail(function(){ alert("Fallo Servidor");});
}

/*
//funcionas para asignar la tarea en la lista de la reunion activa
function save_tarea_display(id,txt){
    var txto = $("#textolist_activ_"+id).val();
    $("#txt_"+id+" div").hide();
    $("#txt_"+id+" textarea").hide();
        var htmlp='<div id="form_tarea_tema"class="form_usr_w_asing"><form action="#" method="post"><label for="">nombre de la tarea</label><input type="text"  name="titulo-w" value="'+txto+'"/>';
            htmlp+='<label for="">fecha</label><input type="text" id="datepicker4" name="fecha" placeholder="fecha limite" ><label for="">usuario</label><input type="text" id="adduser_listact" onkeyup="share_usuarios(this.value);" />';
            htmlp+='<div id="jb_list_user" class="list-share list-meeting" style="display:none;z-index: 2;"></div><div class="listaUsuarios listusract" id="jb_lista_usuarios_click_re" style="display: block;"></div>';
            htmlp+='<div class="chkmail-w"><label for="">Mail:</label><div class="slideThree"><input type="checkbox" id="slideThree" name="mailsend" value="1" /><label for="slideThree"></label></div> </div><input type="button" id="sav_asing_w" value="Asignar Tarea" onclick="save_asing_wActv('+id+');" style="display:inline;margin-left: 1em;width: 20%;" /><input type="button" value="Cancelar" onclick="cancel_asing_wAct();" style="display:inline;margin-left: 1em;width: 20%;"/></form></div>';
            
    $("#txt_"+id).append(htmlp);
    $("body #datepicker4").click();
}
*/

//hacemos visible los temas a tratar de lareuniones

function showtemasreunion(id,pam)
{   
    if($("#list-"+id).is(':hidden'))
    {
         $("#list-"+id).css({"display":"block"});
    }
    else
    {
         $("#list-"+id).css({"display":"none"});
    }
   
}



//generamos las istas de las tareas
function genlistactv()
{
    var idus = $("#idus").val();
    var tx = "selec=9&idusua="+idus;
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
         if ($("#incl_list_tareas .post-w").length) {
                 $("#incl_list_tareas .post-w").remove();
       }
        $.each(data,function(k,v){
           var html='<div id="'+v.idactw+'"class="post-w list_primero_tareas">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">Nota: ';
                if (typeof v.nota !== "undefined" || v.nota !== "null") {
                html+=''+v.nota+'';
                }
                html+='</div>';
               html+='</div>';
               html+='<div class="btn_down"  onclick="showtarw('+v.idactw+',0);"><span class="icon" >:</span></div>';
               html+='<div class="btn_del" onclick="w_fin('+v.idactw+','+idus+',1)"><span class="icon">Â</span></div>';
               html+='<div id="segmain_'+v.idactw+'" class="w-segundo-main">';
               html+='<div id="comn_tareas_'+v.idactw+'" class="coment_w"><label for="">Comentario:</label><input type="text" placeholder="escribe algun comentario" />';
               html+='<div class="mensaje" id="mensaje_'+v.idactw+'" style="margin-top: 1em;font-size: 0.81em; width: 31%; overflow: hidden; position: relative; float: right; right: 1.7em;"></div>';
               html+='<div style="width: 25%; display: inline-block;"><label for="">mail:</label><input type="checkbox" id="mail-w" name="mailsend" value="1" />';
               html+='</div>';
               html+='<div class="uparch_w"><form  enctype="multipart/form-data" id="arch_upw_tar_'+v.idactw+'" action="" method="post" accept-charset="utf-8">';
               html+='<label class="up-archivo">Agregar archivo<input name="archivo" type="file" onclick="selectarchwtar('+v.idactw+');" id="archivo_tareasw_'+v.idactw+'" class="up_acrh"/></label><span id="arch_reunAct" class="icon" onclick="uparchivo(3,'+v.idactw+',0);" style="font-size: 2em; margin-left: 0.4em;">n</span>';
               html+='</form></div><input type="button" value="Agregar" onclick="savecomen_actw('+v.idactw+',0)"/></div>';
                html+='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
                var usrlis = v.usrAsing;
                $.each(usrlis,function(l,u){
                    html+='<li>'+u.nombreEmp+'</li>';
                });
               html+='</ul></div>';
               html+='<div class="listTagw"><label for=""><span class="icon">y</span>Etiquetas:</label><ul>';
                var tag = v.tagW;
                $.each(tag,function(k,t){
                    html+='<li class="'+t.tipo+'">'+t.tagName+'</li>';
                });
               html+='</ul></div>';
               html+='<div  class="listarchw"><label for=""><span class="icon">m</span> Archivos:</label><ul style="margin: 1px; font-size: 2.5em;">';
               var arch = v.archivos;
                $.each(arch,function(k,a){
                    if (typeof a !== "undefined" || a !== "null") {
                        var img = isImage(a.tipo);
                        if(img){
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;"" ><img src="'+a.liga+'" alt="50" width="50" /></li>';
                        }else{
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;" ><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
                        }
                    }
                });
               html+='</ul></div>';
               html+='<div  class="listacoment"><label for=""><span class="icon">[</span> Comentarios:</label><ul>';
               var coment = v.comentarios;
                $.each(coment,function(k,c){
                    c.fecha=c.fecha.substring(0, c.fecha.length-3);
                        html+='<li id="coment_'+c.idcom+'"><label><span class="icon">O</span><strong>'+c.texto+'</strong> <span> Por:'+c.nomusr+' '+c.fecha+'</span></label></li>';
                });
               html+='</ul></div>';
               html+='</div></div>';
               $("#incl_list_tareas ").append(html);
        });

    });

}

///generamos lal ista de todas las actividades
function genlistfull()
{
    var idus = $("#idus").val();
    var tx = "selec=10&idusua="+idus;
    var ruta = "funciones/funciones.php";
        $.post(ruta,tx,function(data){
            if ($("#incl_list_act .post-w").length) {
                    $("#incl_list_act .post-w").remove();
            }
             $.each(data,function(k,v){
            var html='<div id="'+v.idw+'" class="post-w list_medio_actividades">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">Nota: ';
               if (typeof v.nota !== "undefined" || v.nota !== "null" || v.nota !== "") {
               
                    v.nota;
                }
                html+='</div>';
               html+='</div>';
               html+='<div class="btn_down" onclick="showtarw('+v.idw+',1);"><span class="icon">:</span></div>';
               if(idus==v.idprop){
                    html+='<div class="btn_del" onclick="w_fin('+v.idw+','+idus+',2)""><span class="icon">Â</span></div>';
               }
               html+='<div id="seg_main_'+v.idw+'" class="w-segundo-main">';
               html+='<div id="comn_actividad_'+v.idw+'" class="coment_w"><label for="">Comentario:</label><input type="text" placeholder="escribe algun comentario" />';
               html+='<div class="mensaje" id="mensaje_'+v.idw+'" style="margin-top: 1em;font-size: 0.81em; width: 31%; overflow: hidden; position: relative; float: right; right: 1.7em;"></div>';
               html+='<div style="width: 25%; display: inline-block;"><label for="">mail:</label><input type="checkbox" id="mail-w" name="mailsend" value="1" /></div>';
               html+='<div class="uparch_w"><form  enctype="multipart/form-data" id="arch_upw_tar_'+v.idw+'" action="" method="post" accept-charset="utf-8">';
               html+='<label class="up-archivo">Agregar archivo<input name="archivo" type="file" onclick="selectarchwact('+v.idw+');" id="archivo_actw_'+v.idw+'" class="up_acrh"/></label><span id="arch_reunAct" class="icon" onclick="uparchivo(4,'+v.idw+',1);" style="font-size: 2em; margin-left: 0.4em;">n</span>';
               html+='</form></div>';
               html+='<input type="button" value="Agregar" onclick="savecomen_actw('+v.idw+',1)"/></div>';
               html+='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
                var usrlis = v.usrAsing;
                $.each(usrlis,function(l,u){
                    html+='<li>'+u.nombreEmp+'</li>';
                });
               html+='</ul></div>';
               html+='<div class="listTagw"><label for=""><span class="icon">y</span>Etiquetas:</label><ul>';
                var tag = v.tagW;
                $.each(tag,function(k,t){
                    html+='<li class="'+t.tipo+'">'+t.tagName+'</li>';
                });
               html+='</ul></div>';
               html+='<div  class="listarchw"><label for=""><span class="icon">m</span> Archivos:</label><ul style="margin: 1px; font-size: 2.5em;">';
               var arch = v.archivos;
               //////////////////////////////////////////////no me genera los demas siendo null erro
                $.each(arch,function(k,a){
                    if (typeof a !== "undefined" || a !== "null") {
                        var img = isImage(a.tipo);
                        if(img){
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;" ><img src="'+a.liga+'" alt="50" width="50" /></li>';
                        }
                        else{
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;" ><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
                        }
                    }
                });
               html+='</ul></div>';
                html+='<div  class="listacoment"><label for=""><span class="icon">[</span> Comentarios:</label><ul>';
               var coment = v.comentarios;
                $.each(coment,function(k,c){
                    c.fecha=c.fecha.substring(0, c.fecha.length-3);
                        html+='<li id="coment_'+c.idcom+'"><label><span class="icon">O</span><strong>'+c.texto+'</strong> <span> Por:'+c.nomusr+' '+c.fecha+'</span></label></li>';
                });
               html+='</ul></div>';
               html+='</div></div>';
               $("#incl_list_act ").append(html);
            });
        });
}

//generamos las listas de actividades tareas finalizadas
function genlistend()
{
    var idus = $("#idus").val();
    var tx = "selec=11&idusua="+idus;
    var ruta = "funciones/funciones.php";
        $.post(ruta,tx,function(data3){
            if ($("#incl_list_Wcomplet .post-w").length) {
                $("#incl_list_Wcomplet .post-w").remove();
            }

            $.each(data3,function(k,v){
            var html='<div class="post-w jb_tareas_terminadas">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">Nota: ';
               if (typeof v.nota !== "undefined" || v.nota !== "null") {
                    v.nota;
                }
                html+='</div>';
               html+='</div>';
               html+='<div class="btn_down" onclick="showtarw('+v.idw+',0);"><span class="icon">:</span></div>';
               html+='<div id="segmain_'+v.idw+'" class="w-segundo-main">';
               html+='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
                var usrlis = v.usrAsing;
                $.each(usrlis,function(l,u){
                    html+='<li>'+u.nombreEmp+'</li>';
                });
               html+='</ul></div>';
               html+='<div class="listTagw"><label for=""><span class="icon">y</span>Etiquetas:</label><ul>';
                var tag = v.tagW;
                $.each(tag,function(k,t){
                    html+='<li class="'+t.tipo+'">'+t.tagName+'</li>';
                });
               html+='</ul></div>';
              html+='<div  class="listarchw"><label for=""><span class="icon">m</span> Archivos:</label><ul>';
               var arch = v.archivos;
                $.each(arch,function(k,a){
                    var img = isImage(a.tipo);
                    if(img){
                        html+='<li style="list-style: none; margin-right: 15px; display: inline;" ><img src="'+a.liga+'" alt="50" width="50" /></li>';
                    }else{
                        html+='<li style="list-style: none; margin-right: 15px; display: inline;" ><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
                    }
                });
               html+='</ul></div>';
               html+='<div  class="listacoment"><label for=""><span class="icon">[</span> Comentarios:</label><ul>';
               var coment = v.comentarios;
                $.each(coment,function(k,c){
                    c.fecha=c.fecha.substring(0, c.fecha.length-3);
                        html+='<li id="coment_'+c.idcom+'"><label><span class="icon">O</span><strong>'+c.texto+'</strong> <span> Por:'+c.nomusr+' '+c.fecha+'</span></label></li>';
                });
               html+='</ul></div>';
               html+='</div></div>';
               $("#incl_list_Wcomplet ").append(html);
            });
        });
}

///funcion guardar actividad
///

function save_w_form()
{  

      // jalamos los ids de los tag seleccionados
      var padre = $('#form-w #jb_lista_tag_click div');
      var idtag="";
      $.each(padre,function(index) {
            var id = $(this).attr("id").replace("tag_selected_","");
            idtag+=id+',';
      }); 
      idtag+=0;

             //jalamos los ids de los usuarios participantes
             var padreUsr = $("#form-w #jb_lista_usuarios_click div");
             var usrid="";
             $.each(padreUsr, function() {
                  var idusr= $(this).attr("id").replace("user_selected_","");
                  usrid += idusr+',';
             });
             usrid+=0;

        var form = $("#form-w").serialize();
        var id = $("#idus").val();
        var txt= form+"&selec=7&id="+id+"&idt="+idtag+"&idp="+usrid;
         var ruta="funciones/funciones.php";
        $.post(ruta,txt, function(data){
        if(data!=""){
            showactividades();
            genlistactv();
            genlistfull();
            genlistend();
        }
         });
}

function w_fin(idw,idus,op)
{
  var txt = "selec=16&idw="+idw+"&id="+idus;
  var ruta = "funciones/funciones.php"
  $.post(ruta, txt, function(data) {
    if(data==1){
        if (op ==1) {
            $("#incl_list_tareas #"+idw).remove();
            $("#incl_list_act #"+idw).remove();
            genlistend();
        }
        if (op ==2) 
        {
            $("#incl_list_tareas #"+idw).remove();
            $("#incl_list_act #"+idw).remove();
            genlistend();
        }
    }

  }).fail(function(){
    alert('Error en el servidor.');
  });
}




///guardamos la tarea asiganda de una reunion
function save_asing_subactw(idsubtop,op)
{
    //jalamos los ids de los usuarios participantes
    var padreUsr = $("#jb_lista_usuarios_click_tema div");
    var usrid="";
    $.each(padreUsr, function() {
        var idusr= $(this).attr("id").replace("user_selected_tm_","");
        usrid += idusr+',';
    });
    usrid+=0;
   // usrid = usrid.substring(0, usrid.length-1);
    var idtop = $("#subtopiclist_"+idsubtop+" #idtema").val();
            if(op==1){
                var idre=$("#idreunion").val();    
                var detectShow = $("[id^=txts_]");
                var camp = "#txts_"+idtop;
            }
            if(op==2){
                 var idre=$("#idReunAct").val();   
                 var detectShow = $("[id^=txt_]"); 
                 var camp = "#txt_"+idsubtop;
            }
        var form = $("#form_tarea_tema_"+idsubtop+" form").serialize();
        var id = $("#idus").val();
        var txt= form+"&selec=8&id="+id+"&idp="+usrid+"&idtop="+idtop+"&idre="+idre+"&idsubtop="+idsubtop;
        var ruta="funciones/funciones.php";
        $.post(ruta,txt, function(data){
               if(data!=''){

                    if($("#form_tarea_tema_"+idsubtop).length > 0)
                    {
                        $("#form_tarea_tema_"+idsubtop).remove();
                        $(camp+" div").show();
                        $(camp+" #textoreunion_"+idsubtop).show();
                        $("#textoreunion_"+idsubtop).val("");
                    }
                    if (op==1) {
                    show_listreunion_newsubtema(idsubtop,op);
                    }
                    if (op==2) {
                     show_listreunion_newsubtema(idsubtop,op);
                    }
               }
         });

}



///guardamos la tarea asiganda de una reunion
function save_asing_wActv(idtop,op)
{
    //jalamos los ids de los usuarios participantes
    var padreUsr = $("#jb_lista_usuarios_click_tema div");
    var usrid="";
    $.each(padreUsr, function() {
        var idusr= $(this).attr("id").replace("user_selected_tm_","");
        usrid += idusr+',';
    });
    usrid+=0;
   // usrid = usrid.substring(0, usrid.length-1);
            if(op==1){
                 var idre=$("#idreunion").val();    
                var detectShow = $("[id^=txts_]");
                var camp = "#txts_"+idtop;
            }
            if(op==2){
                 var idre=$("#idReunAct").val();   
                 var detectShow = $("[id^=txt_]"); 
                 var camp = "#txt_"+idtop;
            }
        var form = $("#form_tarea_tema_"+idtop+" form").serialize();
        var id = $("#idus").val();
        var txt= form+"&selec=23&id="+id+"&idp="+usrid+"&idtop="+idtop+"&idre="+idre;
         var ruta="funciones/funciones.php";
        $.post(ruta,txt, function(data){
               if(data!=''){

                    if($("#form_tarea_tema_"+idtop).length > 0)
                    {
                        $("#form_tarea_tema_"+idtop).remove();
                        $(camp+" div").show();
                        $(camp+" #textoreunion_"+idtop).show();
                        $("#textoreunion_"+idtop).val("");
                    }
                    if (op==1) {
                        show_listreunion_new(idtop);   
                    }
                    if (op==2) {
                        show_listreunion(idtop);
                    }
               }
         });

}


function cancel_asing_wAct(){

                $("#form_tarea_tema").remove();
                var id = $("[id^=txt_]").attr('id').replace("txt_","");
                $("#txt_"+id+" div").show();
                $("#txt_"+id+" textarea").show();

}

///visualisamos la lista de la tarea
function showtarw(valor,op)
{
    var inni="";
    if(op==1){
         inni= "seg_main_";
    }
    if (op==0) {
        inni = "segmain_";
    }
    if($("#"+inni+valor).is(':hidden'))
  
    {
        $("#"+inni+valor).css({"display":"block"});
    }
    else
    {
         $("#"+inni+valor).css({"display":"none"});
    }

}

///guardamos el comentario de la  actividad
function savecomen_actw(id,op)
{   var l = "";
    var  t= "";
    if (op ==0) {
        l = "#comn_tareas_"+id;
        t="#segmain_"+id;
    }
    if (op ==1) {
         l = "#comn_actividad_"+id;
         t="#seg_main_"+id;
    };
    var comn= $(l+" :text").val();
    var mail =$(l+" #mail-w").val();
    var txt = "selec=22&comen="+comn+"&mail="+mail+"&idus="+$("#idus").val()+"&idw="+id;
    var ruta = "funciones/funciones.php";
    $.post(ruta,txt, function(data){
        if(data!=""){
            //showtarw(id,op);
            if(op==0){
                genLisTarea(id);
            }
            if (op==1){
                //console.log(data);
                genLitsAct(id);
            }
        }
    });

}

///genermaos el listado del segundo main dentro de las tareas
function genLisTarea(idw)
{
    var idus = $("#idus").val();
    var tx = "selec=24&idusua="+idus+"&idw="+idw;
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
         if ($('.tareasIdeas #'+idw+' #segmain_'+idw+'').length > 0) {
                $('.tareasIdeas #'+idw+' #segmain_'+idw+'').empty();
                //$('.tareasIdeas #'+idw+' #segmain_'+idw+' div').remove();
        }

        $.each(data,function(k,v){
                var html='<div id="comn_tareas_'+v.idactw+'" class="coment_w"><label for="">Comentario:</label><input type="text" placeholder="escribe algun comentario" />';
               html+='<div class="mensaje" style="margin-top: 2em;font-size: 0.81em; width: 31%; overflow: hidden; position: relative; float: right;"></div>';
               html+='<div style="width: 25%; display: inline-block;"><label for="">mail:</label><input type="checkbox" id="mail-w" name="mailsend" value="1" />';
               html+='</div>';
               html+='<div class="uparch_w"><form  enctype="multipart/form-data" id="arch_upw_tar_'+v.idactw+'" action="" method="post" accept-charset="utf-8">';
               html+='<label class="up-archivo">Agregar archivo<input name="archivo" type="file" onclick="selectarchwtar('+v.idactw+');" id="archivo_tareasw_'+v.idactw+'" class="up_acrh"/></label><span id="arch_reunAct" class="icon" onclick="uparchivo(3,'+v.idactw+',0);" style="font-size: 2em; margin-left: 0.4em;">n</span>';
               html+='</form></div><input type="button" value="Agregar" onclick="savecomen_actw('+v.idactw+',0)"/></div>';
               html+='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
                var usrlis = v.usrAsing;
                $.each(usrlis,function(l,u){
                    html+='<li>'+u.nombreEmp+'</li>';
                });
               html+='</ul></div>';
               html+='<div class="listTagw"><label for=""><span class="icon">y</span>Etiquetas:</label><ul>';
                var tag = v.tagW;
                $.each(tag,function(k,t){
                    html+='<li class="'+t.tipo+'">'+t.tagName+'</li>';
                });
               html+='</ul></div>';
               html+='<div  class="listarchw"><label for=""><span class="icon">m</span> Archivos:</label><ul style="margin: 1px; font-size: 2.5em;">';
               var arch = v.archivos;
                $.each(arch,function(k,a){
                    if (typeof a !== "undefined" || a !== "null") {
                        var img = isImage(a.tipo);
                        if(img){
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;"><img src="'+a.liga+'" alt="50" width="50" /></li>';
                        }else{
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;"><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
                        }
                    }
                });
               html+='</ul></div>';
               html+='<div  class="listacoment"><label for=""><span class="icon">[</span> Comentarios:</label><ul>';
               var coment = v.comentarios;
                $.each(coment,function(k,c){
                    c.fecha=c.fecha.substring(0, c.fecha.length-3);
                        html+='<li id="coment_'+c.idcom+'"><label><span class="icon">O</span><strong>'+c.texto+'</strong> <span> Por:'+c.nomusr+' '+c.fecha+'</span></label></li>';
                });
               html+='</ul></div>';
               html+='</div>';
               $(".tareasIdeas #"+idw+" #segmain_"+idw).append(html);
        });
    });

}

///generamos la listado de segundo main ara todas las accctividades
function genLitsAct(idw)
{
    var idus = $("#idus").val();
    var tx = "selec=25&idusua="+idus+"&idw="+idw;
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
            if ($('.tareasPend #'+idw+' #seg_main_'+idw).length > 0) {
                 $('.tareasPend #'+idw+' #seg_main_'+idw).empty();
                 //$('.tareasPend #'+idw+' #seg_main_'+idw+' div').remove();
            }

        $.each(data,function(k,v){

               var html='<div id="comn_actividad_'+v.idw+'" class="coment_w"><label for="">Comentario:</label><input type="text" placeholder="escribe algun comentario" />';
               html+='<div class="mensaje" id="mensaje_'+v.idw+'" style="margin-top: 1em;font-size: 0.81em; width: 31%; overflow: hidden; position: relative; float: right; right: 1.7em;"></div>';
               html+='<div style="width: 25%; display: inline-block;"><label for="">mail:</label><input type="checkbox" id="mail-w" name="mailsend" value="1" /></div>';
               html+='<div class="uparch_w"><form  enctype="multipart/form-data" id="arch_upw_tar_'+v.idw+'" action="" method="post" accept-charset="utf-8">';
               html+='<label class="up-archivo">Agregar archivo<input name="archivo" type="file" onclick="selectarchwact('+v.idw+');" id="archivo_actw_'+v.idw+'" class="up_acrh"/></label><span id="arch_reunAct" class="icon" onclick="uparchivo(4,'+v.idw+',1);" style="font-size: 2em; margin-left: 0.4em;">n</span>';
               html+='</form></div>';
               html+='</div><input type="button" value="Agregar" onclick="savecomen_actw('+v.idw+',1)"/></div>';
              html+='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
                var usrlis = v.usrAsing;
                $.each(usrlis,function(l,u){
                    html+='<li>'+u.nombreEmp+'</li>';
                });
               html+='</ul></div>';
               html+='<div class="listTagw"><label for=""><span class="icon">y</span>Etiquetas:</label><ul>';
                var tag = v.tagW;
                $.each(tag,function(k,t){
                    html+='<li class="'+t.tipo+'">'+t.tagName+'</li>';
                });
               html+='</ul></div>';
               html+='<div  class="listarchw"><label for=""><span class="icon">m</span> Archivos:</label><ul style="margin: 1px; font-size: 2.5em;">';
               var arch = v.archivos;
                $.each(arch,function(k,a){
                     if (typeof a !== "undefined" || a !== "null") {
                        var img = isImage(a.tipo);
                        if(img){
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;"><img src="'+a.liga+'" alt="50" width="50" /></li>';
                        }else{
                            html+='<li style="list-style: none; margin-right: 15px; display: inline;"><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
                        }
                    }
                });
               html+='</ul></div>';
                html+='<div  class="listacoment"><label for=""><span class="icon">[</span> Comentarios:</label><ul>';
               var coment = v.comentarios;
                $.each(coment,function(k,c){
                    c.fecha=c.fecha.substring(0, c.fecha.length-3);
                        html+='<li id="coment_'+c.idcom+'"><label><span class="icon">O</span><strong>'+c.texto+'</strong> <span> Por:'+c.nomusr+' '+c.fecha+'</span></label></li>';
                });
               html+='</ul></div>';
               html+='</div>';
               $('.tareasPend #'+idw+' #seg_main_'+idw+'').append(html);
        });
    });
}

///cierra el pupop avierto
$("#closeUpop").click(function(){
    $("#capatrans").css('display','none');
});


//guardamos el tema de la reunion
////// generamos la lisat de los temas atratar 
function SaveTopicNew(){
  var titulo = $("#topiclayer #tiTuloTopic").val();
  var id = $("#idreunion").val();
  var txt = "selec=5&ti="+titulo+"&id="+id+"&idus="+$("#idus").val();
  var ruta = "funciones/funciones.php";
  if(titulo != "")
  {
          $.post(ruta,txt,function(data){
                //console.log(data);
                var html="";
                $.each(data,function(k,v){
                    html+="<li id='topiclist_"+v.id+"' class='topiclist' ><span id='tema_prim_"+v.id+"'>"+v.text+"</span><div id='listanotas_"+v.id+"'><div id='notas'>";
                    html+='<ul class="notas">';

                        var list = v.resoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                                
                        var tar= v.tareas;
                        $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                        });
                        html+="</ul>";
                                    
                        var arch = v.archivos;
                        html+="<div class='archivos'><ul>";
                        $.each(arch, function(k,a){
                        var img = isImage(a.tipo);
                            if(img){
                                    html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                            }else{
                                    html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                            }
                        });
                        html+="</ul></div>";


                        html+="</div></div><div id='sublistaction_"+v.id+"'></div><ul id='subtema_"+v.id+"'>";
                   

                    var sublis= v.sublist;
                    $.each(sublis, function(k,l){
                            html+="<li id='subtopiclist_"+l.idsub+"' class='subtopiclist' style='color: green; text-shadow: none;' ><span id='tema_sub_"+l.idsub+"'>"+l.subtema+"</span><input type='hidden' value='"+v.id+"' id='idtema'>";
                            html+="<div id='sublistanotas_"+l.idsub+"'><div id='notas'>";
                            html+='<ul class="notas">';

                            var list = l.subresoluciones;
                            $.each(list, function(i, r) {
                                    html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                            });
                            
                            var tar= l.subtareas;
                               $.each(tar, function(p,ac){
                                    html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                               });
                             html+="</ul>";
                                
                            var arch = l.subarchivos;
                            html+="<div class='archivos'><ul>";
                                $.each(arch, function(k,a){
                                   var img = isImage(a.tipo);
                                    if(img){
                                            html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                        }else{
                                            html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                        }
                                });
                            html+="</ul></div>";



                            html+="</div></div><div id='sub_listaction_"+l.idsub+"'></div> </li>";
                    });
                    html+='</ul></li>';
                });
                    $("#topiclayer [id^=topiclist_]").remove();
                    $("#topiclayer form ul").prepend(html);
                    $("#topiclayer #tiTuloTopic").val("");
                    $("#topiclayer [id^=topiclist_]").click();
                    $("[id^=topiclist_] [id^=subtopiclist_]").click();
                
          }).fail(function(){ alert("Error servidor. 02");});
    }else
    {
        alert("No Has Escrito Ningun Titulo De Tema.");
    }
}

////mostramos el sub menu en la reunion al momento de generarlad
$(document).on("ready",function(){
    $("#topiclayer").on('click','[id^=topiclist_]', function(){
        var id = $(this).attr("id").replace("topiclist_",'');
        $("#form_reunion_new #jb_list_user").empty();
        $("#topiclist_"+id+" #tema_prim_"+id).click(function() {
            //!$("#topiclist_"+id+" #sublistaction_"+id).empty();
            $('body #jb_result_users').empty();
            if (!$("#topiclist_"+id+" #txts_"+id).is(":visible")) {
                $("[id^=topiclist_] [id^=sublistaction_]").empty();
                $("[id^=subtopiclist_] [id^=sub_listaction_]").empty();
                html="";
                html+='<div id="seccion_'+id+'">';
                html+='<div id="txts_'+id+'" class="menu_list_active">';
                html+='<textarea id="textoreunion_'+id+'" name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div id="check_visible_'+id+'" class="opciones_list_activ_'+id+'" ">';
                html+='<div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" action="" method="post" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo: </label>';
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_reunion_'+id+'" onclick="selecarchreunew('+id+',1);" class="up_acrh"/></span><input type="button" id="arch_reunnew" onclick="uparchivo_reunion(1,'+id+');"value="Agregar" />';
                html+='</form><div class="mensaje"></div><div class="showImage"></div></div>';
                html+='<div class="bar_menu_list_'+id+'"><div><label>Guardar Como: </label><input type="button" value="nota" onclick="save_listreunion('+id+',\'nota\')"/>';
                html+='<input type="button" value="Decision" onclick="save_listreunion('+id+',\'decision\')"/><input type="button" value="Tarea" onclick="save_tarea_tema('+id+',\'tarea\',1)" />';
                html+='</div></div>';
                html+='</div></div>';
                html+='</div>';
                html+='<div><label for="" onclick="subtopic('+id+');">Agregar sub tema</label></div>';
                $("#sublistaction_"+id).append(html);
            }
        });
    });
});

////mostramos las opciones para sub menus en la reunion nueva 
////mostramos el sub menu en la reunion al momento de generarlad
$(document).on("ready",function(){
    $("#topiclayer").on('click','[id^=subtopiclist_]', function(){
        var id = $(this).attr("id").replace("subtopiclist_",'');
        $("body #jb_list_user").empty();
        $('body #jb_result_users').empty();
        $("#subtopiclist_"+id+" #tema_sub_"+id).click(function() {
            
            //!$("#topiclist_"+id+" #sublistaction_"+id).empty();
            if ($("#sub_listaction_"+id).length) {
               
                $("[id^=subtopiclist_] [id^=sub_listaction_]").empty();
                $("[id^=topiclist_] [id^=sublistaction_]").empty();
                html="";
                html+='<div id="seccion_'+id+'">';
                html+='<div id="txts_'+id+'" class="menu_list_active">';
                html+='<textarea id="textoreunion_'+id+'" name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div id="check_visible_'+id+'" class="opciones_list_activ_'+id+'" ">';
                html+='<div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" action="" method="post" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo: </label>';
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_reunion_'+id+'" onclick="selecarchreunew('+id+',1);" class="up_acrh"/></span><input type="button" id="arch_reunnew" onclick="uparchivo_reunion(2,'+id+');"value="Agregar" />';
                html+='</form><div class="mensaje"></div><div class="showImage"></div></div>';
                html+='<div class="bar_menu_list_'+id+'"><div><label>Guardar Como: </label><input type="button" value="nota" onclick="save_sublistreunion('+id+',\'nota\',1)"/>';
                html+='<input type="button" value="Decision" onclick="save_sublistreunion('+id+',\'decision\',1)"/><input type="button" value="Tarea" onclick="save_tarea_subtema('+id+',\'tarea\',1);"/>';
                html+='</div></div>';
                html+='</div></div>';
                html+='</div>';
                
                $("#subtopiclist_"+id+" #sub_listaction_"+id).append(html);
            }
        });
    });
});



////mostramos el sub menu en la reunion al momento de generarlad

$(document).on("ready",function(){
    $("#contenUpop").on('click','[id^=topiclist_]', function(){
        var id = $(this).attr("id").replace("topiclist_",'');
        var idre = $("#idReunAct").val();
        $("#topiclist_"+id+" #tema_prim_"+id).click(function() {
            if (!$("#topiclist_"+id+" #txts_"+id).is(":visible")) {
                $("[id^=topiclist_] [id^=sublistaction_]").empty();
                $("[id^=subtopiclist_] [id^=sub_listaction_]").empty();
                html="";
                html+='<div id="seccion_'+id+'">';
                html+='<div id="txt_'+id+'" class="menu_list_active">';
                html+='<textarea id="textolist_activ_'+id+'" onclick="block_oplits('+id+');" name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div id="text_check_visible_'+id+'" class="opciones_list_activ_'+id+'" style="display:none">';
                html+='<div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" action="" method="post" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo: </label>';
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_meeting_act_'+id+'" onclick="selecarchreunew('+id+',2);" class="up_acrh"/></span><input type="button" id="arch_reunnew" onclick="uparchivo(1,'+id+','+idre+');"value="Agregar" />';
                html+='</form><div class="mensaje"></div><div class="showImage"></div></div>';
                html+='<div class="bar_menu_list_'+id+'"><div><label>Guardar Como: </label><input type="button" value="nota" onclick="save_accionlist('+id+',\'nota\')"/>';
                html+='<input type="button" value="Decision" onclick="save_accionlist('+id+',\'decision\')"/><input type="button" value="Tarea" onclick="save_tarea_tema('+id+',\'tarea\',2)" />';
                html+='</div></div>';
                html+='</div></div>';
                html+='</div>';
                html+='<div><label for="" onclick="subtopicact('+id+');">Agregar sub tema</label></div>';
                $("#sublistaction_"+id).append(html);
            }
        });
    });
});



////mostramos el sub menu en la reunion al momento de generarlad
$(document).on("ready",function(){
     $("#contenUpop").on('click','[id^=subtopiclist_]', function(){
        var id = $(this).attr("id").replace("subtopiclist_",'');
        $("#subtopiclist_"+id+" #tema_sub_"+id).click(function() {
            //!$("#topiclist_"+id+" #sublistaction_"+id).empty();
            if ($("#sub_listaction_"+id).length) {
               
                $("[id^=subtopiclist_] [id^=sub_listaction_]").empty();
                $("[id^=topiclist_] [id^=sublistaction_]").empty();
                html="";
                html+='<div id="seccion_'+id+'">';
                html+='<div id="txt_'+id+'" class="menu_list_active">';
                html+='<textarea id="textoreunion_'+id+'" onclick="block_oplits('+id+');"  name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div id="text_check_visible_'+id+'" class="opciones_list_activ_'+id+'" style="display:none">';
                html+='<div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" action="" method="post" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo: </label>';
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_meeting_act_'+id+'" onclick="selecarchreunew('+id+',2);" class="up_acrh"/></span><input type="button" id="arch_reunnew" onclick="uparchivo_reunion(3,'+id+');"value="Agregar" />';
                html+='</form><div class="mensaje"></div><div class="showImage"></div></div>';
                html+='<div class="bar_menu_list_'+id+'"><div><label>Guardar Como: </label><input type="button" value="nota" onclick="save_sublistreunion('+id+',\'nota\',2)"/>';
                html+='<input type="button" value="Decision" onclick="save_sublistreunion('+id+',\'decision\',2)"/><input type="button" value="Tarea" onclick="save_tarea_subtema('+id+',\'tarea\',2)" />';
                html+='</div></div>';
                html+='</div></div>';
                html+='</div>';
                
                $("#subtopiclist_"+id+" #sub_listaction_"+id).append(html);
            }
        });
    });
});



//function guardamos la accion de la lista 
function save_listreunion(id,txt)
{
    if($("#textoreunion_"+id).val()!=""){
        var idre= $("#idreunion").val();
        var txto="selec=14&id="+id+"&tipo="+txt+"&text="+$("#textoreunion_"+id).val()+"&idre="+idre+"&idus="+$("#idus").val();
        var ruta = "funciones/funciones.php";
        $.post(ruta, txto, function(data){
            if($("#listanotas_"+id+" #notas").length > 0){
                $("#listanotas_"+id+" #notas").empty();
               // $("#listanotas_"+id+" #notas div").remove();
            }

            $.each(data, function(k,v){
                    var html='<ul class="notas">';

                    var list = v.resoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                        
                    var tar= v.tareas;
                           $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                           });
                         html+="</ul>";
                            
                    var arch = v.archivos;
                    html+="<div class='archivos'><ul>";
                            $.each(arch, function(k,a){
                               var img = isImage(a.tipo);
                                if(img){
                                        html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                    }else{
                                        html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                    }
                            });
                    html+="</ul></div>";
                $("#listanotas_"+id+" #notas").append(html);
            });
        }).fail(function(){ alert("Fallo Servidor");});
    }else{
        alert("No has escrito nada");
    }
}

//////agregamos  la opsion para los sub menus en la reunion creada
function subtopic(id)
{
    $("#topiclist_"+id+" #sublistaction_"+id).empty();
    var html="";
    html+='<div style="overflow: hidden; width: 75%; padding: 0px;"><textarea  name="" id="texto_'+id+'" class="Titulo-topic subtopic" cols="30" rows="10" style="display: block;"></textarea><input type="button" value="Agregar" onclick="savesubtop('+id+');" style="display: block;"/></div>';
    $("#topiclist_"+id+" #sublistaction_"+id).append(html);
}

///////////////////////////////////agregamos le capara la reunion activa
function subtopicact(id)
{
    $("#topiclist_"+id+" #sublistaction_"+id).empty();
    var html="";
    html+='<div style="overflow: hidden; width: 75%; padding: 0px;"><textarea  name="" id="texto_'+id+'" class="Titulo-topic subtopic" cols="30" rows="10" style="display: block;"></textarea><input type="button" value="Agregar" onclick="savesubtopact('+id+');" style="display: block;"/></div>';
    $("#topiclist_"+id+" #sublistaction_"+id).append(html);
}

//////////////////guardamos los sub temas en la reunion recien creadad
function savesubtop(id)
{
    var txt = "selec=28&tes="+$("#texto_"+id).val()+"&topic="+id+"&idre="+$("#idreunion").val()+"&idus="+$("#idus").val();
    var ruta = "funciones/funciones.php";

    $.post(ruta, txt, function(data) {
         var html="";
         //console.log(data);
        $.each(data,function(k,v){
            html+="<li id='subtopiclist_"+v.idsub+"' class='subtopiclist' style='color: green; text-shadow: none;' ><span id='tema_sub_"+v.idsub+"'>"+v.subtema+"</span><input type='hidden' value='"+id+"' id='idtema'>";
            html+="<div id='sublistanotas_"+v.idsub+"'><div id='notas'>";

            html+='<ul class="notas">';
            var subnot= v.subresoluciones;
            $.each(subnot, function(ls, sb) {
                     html+='<li class="list_'+sb.tipo+'">'+sb.texto+'</li>';
            });
    
            html+="</ul>";
            html+="</div></div><div id='sub_listaction_"+v.idsub+"'></div></li>";
        
        });
            $("#topiclist_"+id+" #subtema_"+id).empty();
            $("#topiclist_"+id+" #subtema_"+id).append(html);
            $("#tiTuloTopic").val("");
            $("#topiclist_"+id+" #subtema_"+id+" [id^=subtopiclist_]").click();

    }).fail(function(){ alert("Error conexion servidor.");});
}

////guardamos los subtemas en la reunion activa
function savesubtopact(id)
{   
    var idre = $("#idReunAct").val();
    var txt = "selec=28&tes="+$("#texto_"+id).val()+"&topic="+id+"&idre="+idre+"&idus="+$("#idus").val();
    var ruta = "funciones/funciones.php";

    $.post(ruta, txt, function(data) {
         var html="";
         //console.log(data);
        $.each(data,function(k,v){
            //html+="<li id='topiclist_"+v.id+"' class='topiclist' ><span id='tema_prim_"+v.id+"'>"+v.text+"</span><div id='listanotas_"+v.id+"'><div id='notas'>";
        
            html+="<li id='subtopiclist_"+v.idsub+"' class='subtopiclist' style='color: green; text-shadow: none;' ><span id='tema_sub_"+v.idsub+"'>"+v.subtema+"</span><input type='hidden' value='"+id+"' id='idtema'>";
            html+="<div id='sublistanotas_"+v.idsub+"'><div id='notas'>";

            html+='<ul class="notas">';
            var subnot= v.subresoluciones;
            $.each(subnot, function(ls, sb) {
                     html+='<li class="list_'+sb.tipo+'">'+sb.texto+'</li>';
            });
    
            html+="</ul>";
            html+="</div></div><div id='sub_listaction_"+v.idsub+"'></div></li>";
        
        });
            $("#topiclist_"+id+" #subtema_"+id).empty();
            $("#topiclist_"+id+" #subtema_"+id).append(html);
            $("#tiTuloTopic").val("");
            $("#topiclist_"+id+" #subtema_"+id+" [id^=subtopiclist_]").click();

    }).fail(function(){ alert("Error conexion servidor.");});
}



//function guardamos la accion de la lista 
function save_sublistreunion(id,txt,op)
{
    if($("#sub_listaction_"+id+" #textoreunion_"+id).val()!=""){
        var texto= $("#sub_listaction_"+id+" #textoreunion_"+id).val();
        if (op==1) {
        var idre= $("#idreunion").val();
        }
        if (op==2) {
        var idre= $("#form_reunion_act #idReunAct").val();
        }
        var txto="selec=29&id="+id+"&tipo="+txt+"&text="+texto+"&idre="+idre+"&idus="+$("#idus").val();
        var ruta = "funciones/funciones.php";
        $.post(ruta, txto, function(data){
            if($("#subtopiclist_"+id+" #sublistanotas_"+id+" #notas").length > 0){
                $("#subtopiclist_"+id+" #sublistanotas_"+id+" #notas").empty();
               // $("#listanotas_"+id+" #notas div").remove();
            }

            $.each(data, function(k,v){
                    var html='<ul class="notas">';

                    var list = v.subresoluciones;
                        $.each(list, function(i, r) {
                                html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                        });
                        
                    var tar= v.subtareas;
                           $.each(tar, function(p,ac){
                                html+='<li class="list_tarea"><span>'+ac.actividad+'</span><label for=""> '+ac.nombreus+'</label><span> '+ac.fecha+'</span></li>';
                           });
                         html+="</ul>";
                            
                    var arch = v.subarchivos;
                    html+="<div class='archivos'><ul>";
                            $.each(arch, function(k,a){
                               var img = isImage(a.tipo);
                                if(img){
                                        html+="<li style='list-style: none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                                    }else{
                                        html+="<li style='list-style: none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                                    }
                            });
                    html+="</ul></div>";
                $("#subtopiclist_"+id+" #sublistanotas_"+id+" #notas").append(html);
            });
        }).fail(function(){ alert("Fallo Servidor");});
    }else{
        alert("No has escrito nada");
    }
}


//funcionas para asignar la tarea en la lista de la reunion recien generadad
function save_tarea_tema(id,txt,op){
    if (op==1) {
        var camp = "#txts_"+id;
        var txto = $("#textoreunion_"+id).val();
    }
    if (op==2) {
        var camp = "#txt_"+id;
        var txto = $("#textolist_activ_"+id).val();
    }
    $(camp+" div").hide();
    $(camp+" textarea").hide();
        var htmlp='<div id="form_tarea_tema_'+id+'" class="form_usr_w_asing"><form action="#" method="post"><label for="">nombre de la tarea</label><input type="text"  name="titulo-w" value="'+txto+'"/>';
            htmlp+='<label for="">fecha</label><input type="text" id="datepicker4" name="fecha" placeholder="fecha limite" ><label for="">usuario</label><input type="text" id="adduser_listact" onkeyup="share_usuarios(this.value,1);" />';
            htmlp+='<div id="jb_lista_usuarios" class="list-share list-meeting" style="display:none;z-index: 2;"></div><div class="listaUsuarios listusract" id="jb_lista_usuarios_click_tema" style="display: block;"></div>';
            htmlp+='<div class="chkmail-w"><label for="">Mail:</label><div class="slideThree"><input type="checkbox" id="slideThree" name="mailsend" value="1" /><label for="slideThree"></label></div> </div>';
            htmlp+='<input type="button" id="sav_asing_w" value="Asignar Tarea" onclick="save_asing_wActv('+id+','+op+');" style="display:inline;margin-left: 1em;width: 20%;" /><input type="button" value="Cancelar" onclick="cancel_w_tema('+op+');" style="display:inline;margin-left: 1em;width: 20%;"/></form></div>';
            
    $(camp).append(htmlp);
    $("body #datepicker4").click();
}



function cancel_w_tema(op){
    if (op==1) {
        var id = $("[id^=txts_]").attr('id').replace("txts_","");
        var camp = "#txts_"+id;
    }
    if (op==2) {
        var id = $("[id^=txt_]").attr('id').replace("txt_","");
        var camp = "#txt_"+id;
    }
    $("#form_tarea_tema_"+id).remove();
    $(camp+" div").show();
    $(camp+" textarea").show();
    $("#jb_lista_usuarios").empty();
    $("#jb_lista_usuarios_click_tema").empty();

}

//funcionas para asignar la tarea en la lista de la reunion nueva y activa
function save_tarea_subtema(id,txt,op){
    var  camp= "";
    var camp2 ="";
    var camp3 ="";
    if (op ==1) {
        var txto = $("#textoreunion_"+id).val();
        camp ="#txts_"+id+" div";
        camp2="#txts_"+id+" textarea";
        camp3="#txts_"+id;
    }
    if (op ==2) {
        var txto = $("#sub_listaction_"+id+" #textoreunion_"+id).val();
        camp ="#txt_"+id+" div";
        camp2="#txt_"+id+" textarea";
        camp3="#txt_"+id;
    }
    $(camp).hide();
    $(camp2).hide();
         var htmlp='<div id="form_tarea_tema_'+id+'" class="form_usr_w_asing"><form action="#" method="post"><label for="">nombre de la tarea</label><input type="text"  name="titulo-w" value="'+txto+'"/>';
            htmlp+='<label for="">fecha</label><input type="text" id="datepicker4" name="fecha" placeholder="fecha limite" ><label for="">usuario</label><input type="text" id="adduser_listact" onkeyup="share_usuarios(this.value,1);" />';
            htmlp+='<div id="jb_lista_usuarios" class="list-share list-meeting" style="display:none;z-index: 2;"></div><div class="listaUsuarios listusract" id="jb_lista_usuarios_click_tema" style="display: block;"></div>';
            htmlp+='<div class="chkmail-w"><label for="">Mail:</label><div class="slideThree"><input type="checkbox" id="slideThree" name="mailsend" value="1" /><label for="slideThree"></label></div> </div>';
            htmlp+='<input type="button" id="sav_asing_w" value="Asignar Tarea" onclick="save_asing_subactw('+id+','+op+');" style="display:inline;margin-left: 1em;width: 20%;" /><input type="button" value="Cancelar" onclick="cancel_w_subtema('+op+','+id+');" style="display:inline;margin-left: 1em;width: 20%;"/></form></div>';
  
    $(camp3).append(htmlp);
    $("body #datepicker4").click();
}


/////canselamos la asigancion de tareas en las reuniones
function cancel_w_subtema(op,id){

        var  camp= "";
        if (op ==1) {
            camp ="#txts_"+id;
        }
        if (op ==2) {
            camp="#txt_"+id;
        }
                
        $(camp+" #form_tarea_tema_"+id).remove();
        $(camp+" div").show();
        $(camp+" textarea").show();

    $("#jb_lista_usuarios").empty();
    $("#jb_lista_usuarios_click_subtema").empty();

}


//// seccion de busqueda 
//usuarios


function showAddUserW()
{   
    if($("#adduser-w").is(":visible")){
        $("#w-adduser").addClass("up-archivo");
        $("#w-adduser").css('cursor','pointer');
        $("#adduser-w").css('display','none');
        $("#adduser-w").hide();
    }else
    {
        $("#w-adduser").removeClass();
        $("#w-adduser").removeAttr('style');
        $("#adduser-w").show();
    }
}

////buscamos las tareas y las reuniones en lista
function busquedaSimpleSearch(search)
{
    var elementopadre = $('.list_primero_tareas');
          $.each(elementopadre,function(i,t)
          {
                
                search=search.toLowerCase();
                search= sustituirAcentos(search);
                var id = t.id;
                var nombre = $("#"+t.id).text();
                var strSearched=$(this).text();
                strSearched = strSearched.toLowerCase();
                strSearched = sustituirAcentos(strSearched);
                //id = id.replace('','');
                if(strSearched.indexOf(search.trim()) !== -1)
                {
                    $("#incl_list_tareas #" + id).show();
                    //$("#jb_etiquetas ul").remove();
                }
                else
                    $("#incl_list_tareas #" + id).hide();
            });

    var elementopadre = $('.list_medio_actividades');
          $.each(elementopadre,function(i,t)
          {
                
                search=search.toLowerCase();
                search= sustituirAcentos(search);
                var id = t.id;
                var nombre = $("#"+t.id).text();
                var strSearched=$(this).text();
                strSearched = strSearched.toLowerCase();
                strSearched = sustituirAcentos(strSearched);
                //id = id.replace('','');
                if(strSearched.indexOf(search.trim()) !== -1)
                {
                    $("#incl_list_act #" + id).show();
                    //$("#jb_etiquetas ul").remove();
                }
                else
                    $("#incl_list_act #" + id).hide();
            });

        var elementopadre = $('.jb_tareas_terminadas');
          $.each(elementopadre,function(i,t)
          {
                search=search.toLowerCase();
                search= sustituirAcentos(search);
                var id = t.id;
                var nombre = $("#"+t.id).text();
                var strSearched=$(this).text();
                strSearched = strSearched.toLowerCase();
                strSearched = sustituirAcentos(strSearched);
                //id = id.replace('','');
                if(strSearched.indexOf(search.trim()) !== -1)
                {
                    $("#incl_list_Wcomplet #" + id).show();
                    //$("#jb_etiquetas ul").remove();
                }
                else
                    $("#incl_list_Wcomplet #" + id).hide();
            });

          var elementopadre = $('.jb_nuevas_reuniones');
          $.each(elementopadre,function(i,t)
          {
                search=search.toLowerCase();
                search= sustituirAcentos(search);
                var id = t.id;
                var nombre = $("#"+t.id).text();
                var strSearched=$(this).text();
                strSearched = strSearched.toLowerCase();
                strSearched = sustituirAcentos(strSearched);
                //id = id.replace('','');
                if(strSearched.indexOf(search.trim()) !== -1)
                {
                    $("#showTopic #" + id).show();
                    //$("#jb_etiquetas ul").remove();
                }
                else
                    $("#showTopic #" + id).hide();
            });

          var elementopadre = $('.jb_antiguas_reuniones');
          $.each(elementopadre,function(i,t)
          {
                search=search.toLowerCase();
                search= sustituirAcentos(search);
                var id = t.id;
                var nombre = $("#"+t.id).text();
                var strSearched=$(this).text();
                strSearched = strSearched.toLowerCase();
                strSearched = sustituirAcentos(strSearched);
                //id = id.replace('','');
                if(strSearched.indexOf(search.trim()) !== -1)
                {
                    $("#showlisendreuniones #" + id).show();
                    //$("#jb_etiquetas ul").remove();
                }
                else
                    $("#showlisendreuniones #" + id).hide();
            });

}



///buscamos los usaurios
function busquedaSimpleUsers(search,section)
{
  //console.log(search);
  if(section == 1)
  {

    if($.trim(search) == '')
    {
        $("#form_reunion_new #jb_etiquetas").hide();
        $("#jb_ul_data").remove();
    }


    if($.trim(search) != '')
    {
        $("#jb_etiquetas").show();
        if($("#jb_etiquetas ul").length == 0)
        {
            var htmlUl='<ul id="jb_ul_data"><ul>';
            $("#jb_etiquetas").append(htmlUl);
        }
          var elementopadre = $('[id^=jb_id_tag_]');
          $.each(elementopadre,function(i,t)
          {
                search=search.toLowerCase();
                search= sustituirAcentos(search);
                var id = t.id;
                var nombre = $("#"+t.id).text();
                var strSearched=$(this).text();
                strSearched = strSearched.toLowerCase();
                strSearched = sustituirAcentos(strSearched);
                id = id.replace('jb_id_tag_','');
                if(strSearched.indexOf(search.trim()) !== -1)
                {
                    //$("#jb_etiquetas ul").remove();

                    if(typeof id !== "undefined")
                    {

                        //console.log(id + " is -> " + nombre);
                        var htmlLi = '<li id="id_tag_is_'+id+'">'+nombre+'</li>';

                        if($("#id_tag_is_"+id).length == 0 && $("#tag_selected_"+id).length == 0)
                            $("#jb_ul_data").prepend(htmlLi);
                    }
                }
                else
                {
                    //console.log("No es -> " + nombre + " -> " + id)
                    if($("#id_tag_is_"+id).length)
                            $("#id_tag_is_"+id).remove();
                }

          });
    }
  }

  //seccion para busqueda de usuarios en reunion
  if(section == 2)
  {
    //si la caja de texto esta vacia eliminamos la lista
    if($.trim(search) == '')
    {
        //$("#adduser-w").hide();
        $("#form_reunion_new #jb_list_user").hide();
        $("#jb_ul_data_user").remove();
    }


    //si la caja de texto contiene algo 
    if($.trim(search) != '')
    {
            $("#jb_list_user").show();
            if($("#jb_list_user ul").length == 0)
            {
                var htmlUl='<ul id="jb_ul_data_user"><ul>';
                $("#form_reunion_new #jb_list_user").append(htmlUl);
            }
              var elementopadre = $('[id^=jb_id_user_]');
              //recorremos el each buscando todos los id que inicien jb_id_user_
              $.each(elementopadre,function(i,t)
              {
                    search=search.toLowerCase();
                    search= sustituirAcentos(search);
                    var id = t.id;
                    var nombre = $("#"+t.id).text();
                    var strSearched=$(this).text();
                    strSearched = strSearched.toLowerCase();
                    strSearched = sustituirAcentos(strSearched);
                    id = id.replace('jb_id_user_','');
                    if(strSearched.indexOf(search.trim()) !== -1)
                    {
                        
                        //console.log(id + " -> " + nombre)
                        //nos escribe todo lo que sea diferente de undefined
                        if(typeof id !== "undefined")
                        {

                            //console.log(id + " is -> " + nombre);
                            var htmlLi = '<li id="id_user_is_'+id+'">'+nombre+'</li>';

                            if($("#id_user_is_"+id).length == 0 && $("#user_selected_"+id).length == 0)
                                $("#jb_ul_data_user").prepend(htmlLi);
                        }
                    }
                    else
                    {
                        //console.log("No es -> " + nombre + " -> " + id)
                        if($("#id_user_is_"+id).length)
                                $("#id_user_is_"+id).remove();
                    }

              });
        }
    
  }

}

function sustituirAcentos(str)
{
    var str = str.replace(/Ã¡/g,"a"); 
    str = str.replace(/Ã©/g,"e");  
    str = str.replace(/Ã­/g,"i");  
    str = str.replace(/Ã³/g,"o");  
    str = str.replace(/Ãº/g,"u"); 
    str = str.replace(/Ã/g,"A"); 
    str = str.replace(/Ã‰/g,"E");  
    str = str.replace(/Ã/g,"I");  
    str = str.replace(/Ã“/g,"O");  
    str = str.replace(/Ãš/g,"U"); 
    return str;
}


///hacemos un document ready con el post para etiquetas y para los usuarios
$(document).on('ready', function(){
    //Resou
    $('.showImage').remove();

    $('body').on('click', '.click', function(){  
        var id = $(this).attr('id');
        //alert(id);
        if($("#selected_"+id).length == 0)
            $("#jb_lista_usuarios_click_re").append("<div id='selected_"+id+"'>"+$("#"+id).text()+"</div>");


        if($("#selected_"+id).length == 0)
            $("#jb_lista_tag_click_re").append("<div id='selected_"+id+"'>"+$("#"+id).text()+"</div>");
     });

    //para las etiquetas  generamso un post 
    $("body").on('click', '#jb_etiqueta_reun', function(){

        if($("#jb_result_tags").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=15&id="+$("#idus").val(),
                beforeSend: function()
                {
                    $("#jb_etiquetas").css({"display":"block"});
                },
                success: function(server)
                {
                    //escribismos las etiqeutas en un div 
                    $.each(server,function(i,t){
                            $("#jb_result_tags").append('<div id="jb_id_tag_'+t.idTag+'">'+t.nombre+'</div>');
                           // $("#jb_result_tags").append('<div id="jb_id_tag_'+t.idproy+'">'+t.nombre+'</div>');
                           
                          
                    });
                }
            });

        }
    });

    ///hacemos le post para usuarios
    $("body").on('click', '#meeting-user-share', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6",
                beforeSend: function()
                {
                    $("#jb_list_user").css({"display":"block"});
                },
                success: function(server)
                {
                    /// escribimos las etiqeutas 
                    $.each(server,function(i,t){
                            $("#jb_result_users").append('<div id="jb_id_user_'+t.id+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });


    ///al hacer el click las etiquetas inicio de id  las remueve
    $("body").on('click', '[id^=id_tag_is_]', function(){
        var id = $(this).attr("id").replace("id_tag_is_","");//remplazamos  el resto del texto para obtener el id
        
        //console.log($(this).text() + " -> " + id);
        if($("#tag_selected_"+id).length == 0)
        {   
            $("#jb_lista_tag_click_re").show();
            $("#jb_lista_tag_click_re").append("<div id='tag_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='tag_remove_"+id+"'>X</span></div>");
            $("#id_tag_is_"+id).slideUp();
            $("#jb_etiqueta_reun").val('');
            $("#jb_etiquetas").hide();
        }

    });
    //removemos las etiquetas registradas 
    $("body").on('click', '[id^=tag_remove_]', function(){
        var id = $(this).attr("id").replace("tag_remove_","");
        if($("#tag_selected_"+id).length)
            $("#tag_selected_"+id).remove();
            $("#jb_ul_data #id_tag_is_"+id).slideDown();
            delltagReunion(id);

    });




    /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_is_]', function(){
        var id = $(this).attr("id").replace("id_user_is_","");
        
       // console.log($(this).text() + " -> " + id);
        if($("#user_selected_"+id).length == 0)
        {
            $("#jb_lista_usuarios_click_re").append("<div id='user_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_is_"+id).slideUp();
            $("#meeting-user-share").val('');
            $("#jb_list_user").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_]', function(){
        var id = $(this).attr("id").replace("user_remove_","");
        if($("#user_selected_"+id).length)
            $("#user_selected_"+id).remove();
            $("#jb_ul_data_user #id_user_is_"+id).slideDown();
            dellParticipanteReunion(id);

    });
    
});





////seccion de busqueda de tag y usuarios en las tareas 
////
///
function busquedaSimpleUsersW(search,section)
{
  //console.log(search);
  if(section == 1)
  {
        if($.trim(search) == '')
        {
            $("#form-w  #jb_etiquetas").hide();
            $("#form-w  #jb_ul_data").remove();
        }


        if($.trim(search) != '')
        {
            $("#form-w  #jb_etiquetas").show();
            if($("#form-w  #jb_etiquetas ul").length == 0)
            {
                var htmlUl='<ul id="jb_ul_data"><ul>';
                $("#form-w  #jb_etiquetas").append(htmlUl);
                $("#form-w #jb_etiquetas #jb_ul_data ul").remove();
            }
              var elementopadre = $('[id^=jb_id_tag_]');
              $.each(elementopadre,function(i,t)
              {
                    search=search.toLowerCase();
                    search= sustituirAcentos(search);
                    var id = t.id;
                    var nombre = $("#"+t.id).text();
                    var strSearched=$(this).text();
                    strSearched = strSearched.toLowerCase();
                    strSearched = sustituirAcentos(strSearched);
                    id = id.replace('jb_id_tag_','');
                    if(strSearched.indexOf(search.trim()) !== -1)
                    {
                        //$("#jb_etiquetas ul").remove();

                        if(typeof id !== "undefined")
                        {

                            //console.log(id + " is -> " + nombre);
                            var htmlLi = '<li id="id_tag_is_'+id+'">'+nombre+'</li>';

                            if($("#id_tag_is_"+id).length == 0 && $("#tag_selected_"+id).length == 0)
                                $("#form-w  #jb_ul_data").prepend(htmlLi);
                        }
                    }
                    else
                    {
                        //console.log("No es -> " + nombre + " -> " + id)
                        if($("#id_tag_is_"+id).length)
                                $("#id_tag_is_"+id).remove();
                    }

              });
        }
  }

  //seccion para busqueda de usuarios en reunion
  if(section == 2)
  {

        //si la caja de texto esta vacia eliminamos la lista
        if($.trim(search) == '')
        {
            $("#jb_list_user").hide();
        }


        //si la caja de texto contiene algo 
        if($.trim(search) !== '')
        {
            $("#form-w #jb_list_user").show();
            if($("#form-w #jb_list_user ul").length == 0)
            {
                var htmlUl='<ul id="jb_ul_data_user"><ul>';
                $("#form-w #jb_list_user").append(htmlUl);
                $("#form-w #jb_list_user #jb_ul_data_user ul").remove();
            }
              var elementopadre = $('[id^=jb_id_user_]');
              //recorremos el each buscando todos los id que inicien jb_id_user_
              $.each(elementopadre,function(i,t)
              {
                    search=search.toLowerCase();
                    search= sustituirAcentos(search);
                    var id = t.id;

                    var nombre = $("#"+t.id).text();
                    var strSearched=$(this).text();
                    strSearched = strSearched.toLowerCase();
                    strSearched = sustituirAcentos(strSearched);
                    id = id.replace('jb_id_user_','');
                    if(strSearched.indexOf(search.trim()) !== -1)
                    {
                        
                        //console.log(id + " -> " + nombre)
                        //nos escribe todo lo que sea diferente de undefined
                        if(typeof id !== "undefined")
                        {

                            //console.log(id + " is -> " + nombre);
                            var htmlLi = '<li id="id_user_is_'+id+'">'+nombre+'</li>';

                            if($("#id_user_is_"+id).length == 0 && $("#user_selected_"+id).length == 0)
                                $("#form-w #jb_ul_data_user").prepend(htmlLi);
                        }
                    }
                    else
                    {
                        //console.log("No es -> " + nombre + " -> " + id)
                        if($("#id_user_is_"+id).length)
                                $("#id_user_is_"+id).remove();
                    }

              });
        }
        
  }

}

$(document).on("ready",function(){

    $('body').on('click', '.click', function(){  
            var id = $(this).attr('id');
          // alert(id);

         if($("#selected_"+id).length == 0)
            //$("#form-w #jb_lista_usuarios_click").addClass("cont_listado");
            $("#form-w #jb_lista_usuarios_click").append("<div id='selected_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");


         if($("#selected_"+id).length == 0)
            //$("#form-w #jb_lista_tag_click").addClass("cont_listado");
            $("#form-w  #jb_lista_tag_click").append("<div id='selected_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");
     });

    ///hacemos le post para usuarios
    $("body").on('click', '#adduser-w', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6",
                beforeSend: function()
                {
                    $("#jb_list_user").css({"display":"block"});
                },
                success: function(server)
                {
                    /// escribimos las etiqeutas 
                    $.each(server,function(i,t){
                            $("#jb_result_users").append('<div id="jb_id_user_'+t.id+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });



    /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_is_]', function(){
        var id = $(this).attr("id").replace("id_user_is_","");
        
       // console.log($(this).text() + " -> " + id);
        if($("#form-w #jb_lista_usuarios_click #user_selected_"+id).length == 0)
        {
            $("#form-w #jb_lista_usuarios_click").append("<div id='user_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_is_"+id).slideUp();
            $("#form-w #adduser-w").val('');
            $("#form-w #jb_list_user").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_]', function(){
        var id = $(this).attr("id").replace("user_remove_","");
        if($("#user_selected_"+id).length)
            $("#user_selected_"+id).remove();
            $("#jb_ul_data_user #id_user_is_"+id).slideDown();
           // dellParticipanteReunion(id);

    });
    

    //para las etiquetas  generamso un post 
    $("body").on('click', '#w-addtag', function(){

        if($("#jb_result_tags").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=15&id="+$("#idus").val(),
                beforeSend: function()
                {
                    $("#jb_etiquetas").css({"display":"block"});
                },
                success: function(server)
                {
                    //escribismos las etiqeutas en un div 
                    $.each(server,function(i,t){
                            $("#jb_result_tags").append('<div id="jb_id_tag_'+t.idTag+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });


    ///al hacer el click las etiquetas inicio de id  las remueve
    $("body").on('click', '[id^=id_tag_is_]', function(){
        var id = $(this).attr("id").replace("id_tag_is_","");//remplazamos  el resto del texto para obtener el id
        
        //console.log($(this).text() + " -> " + id);
        if($("#form-w #jb_lista_tag_click #tag_selected_"+id).length == 0)
        {
            $("#form-w #jb_lista_tag_click").append("<div id='tag_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='tag_remove_"+id+"'>X</span></div>");
            $("#id_tag_is_"+id).slideUp();
            $("#form-w #jb_etiqueta_reun").val('');
            $("#form-w #jb_etiquetas").hide();
        }

    });


    //removemos las etiquetas registradas 
    $("body").on('click', '[id^=tag_remove_]', function(){
        var id = $(this).attr("id").replace("tag_remove_","");
        if($("#fomr-w #tag_selected_"+id).length)
            $("#tag_selected_"+id).remove();
            $("#jb_ul_data #id_tag_is_"+id).slideDown();
           // delltagReunion(id);

    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// seccion de busqueda de usuarios en las reuniones activas 
function share_usuarios(search,op){
   //si la caja de texto esta vacia eliminamos la lista
   //
  
   var camp ="";
            if (op ==1) {
                camp="#jb_lista_usuarios";
            }
            if (op ==2) {
                camp ="#jb_lista_user_subtema";
            }

        if($.trim(search) == '')
        {
            $(camp).hide();
        }

        //si la caja de texto contiene algo 
        if($.trim(search) !== '')
        {
            $("body "+camp).show();

            if($("body "+camp+" ul").length == 0)
            {
                var htmlUl='<ul id="jb_ul_data_user"><ul>';
                $("body "+camp).append(htmlUl);
                $("body "+camp+" #jb_ul_data_user ul").remove();
            }
              var elementopadre = $('[id^=jb_id_user_]');
              //recorremos el each buscando todos los id que inicien jb_id_user_
              $.each(elementopadre,function(i,t)
              {
                    search=search.toLowerCase();
                    search= sustituirAcentos(search);
                    var id = t.id;

                    var nombre = $("#"+t.id).text();
                    var strSearched=$(this).text();
                    strSearched = strSearched.toLowerCase();
                    strSearched = sustituirAcentos(strSearched);
                    id = id.replace('jb_id_user_','');
                    if(strSearched.indexOf(search.trim()) !== -1)
                    {
                        //nos escribe todo lo que sea diferente de undefined
                        if(typeof id !== "undefined")
                        {
                            var htmlLi = '<li id="id_user_tm_'+id+'">'+nombre+'</li>';
                            if($("#id_user_tm_"+id).length == 0 && $("#user_selected_tm_"+id).length == 0)
                                $("#jb_ul_data_user").prepend(htmlLi);
                        }
                    }
                    else
                    {
                        if($("#id_user_tm_"+id).length)
                                $("#id_user_tm_"+id).remove();
                    }

              });
        }
        
}

//////para los temas principales
$(document).on("ready",function()
{
    ///al ace el click en el campo nos egenera el listado en el div jb_lista_usuarios_click
    $('body').on('click', '.click', function(){  
            var id = $(this).attr('id');
            //alert(id);
         if($("#selected_"+id).length == 0)
            $("#form_tarea_tema_"+id+" #jb_lista_usuarios_click_tema").append("<div id='selected_tm_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");
    });

    ///hacemos le post para usuarios
    $("body").on('click', '#adduser_listact', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6",
                beforeSend: function()
                {
                    $("[id^=form_tarea_tema_] #jb_lista_usuarios").css({"display":"block"});
                },
                success: function(server)
                {
                    /// escribimos las etiqeutas 
                    $.each(server,function(i,t){
                            $("#jb_result_users").append('<div id="jb_id_user_'+t.id+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });

       /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_tm_]', function(){
        var id = $(this).attr("id").replace("id_user_tm_","");
        

        if($("#jb_lista_usuarios_click_tema #user_selected_tm_"+id).length == 0)
        {
            $("#jb_lista_usuarios_click_tema").append("<div id='user_selected_tm_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_tm_"+id+"'>X</span></div>");
            $("#id_user_tm_"+id).slideUp();
            $("#adduser_listact").val('');
            $("#jb_lista_usuarios").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_tm_]', function(){
        var id = $(this).attr("id").replace("user_remove_tm_","");
        if($("#user_selected_tm_"+id).length)
            $("#user_selected_tm_"+id).remove();
            $("#jb_ul_data_user #id_user_tm_"+id).slideDown();

    });
});


////////////////////////////para los subtemas
$(document).on("ready",function()
{
    ///al ace el click en el campo nos egenera el listado en el div jb_lista_usuarios_click
    $('body').on('click', '.click', function(){  
            var id = $(this).attr('id');
            alert(id);
         if($("#selected_"+id).length == 0)
            $("#form_tarea_subtema_"+id+" #jb_lista_usuarios_click_subtema").append("<div id='selected_sbtm_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");
    });

    ///hacemos le post para usuarios
    $("body").on('click', '#adduser_tema', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6",
                beforeSend: function()
                {
                    $("#form_tarea_subtema_"+id+" #jb_list_user_subtema").css({"display":"block"});
                },
                success: function(server)
                {
                    /// escribimos las etiqeutas 
                    $.each(server,function(i,t){
                            $("#jb_result_users").append('<div id="jb_id_user_'+t.id+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });

       /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_tm_]', function(){
        var id = $(this).attr("id").replace("id_user_tm_","");
        

        if($("#jb_lista_usuarios_click_subtema #user_selected_"+id).length == 0)
        {
            $("#jb_lista_usuarios_click_subtema").append("<div id='user_selected_tm_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_tm_"+id+"'>X</span></div>");
            $("#id_user_tm_"+id).slideUp();
            $("#adduser_listact").val('');
            $("#jb_lista_usuarios").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_tm_]', function(){
        var id = $(this).attr("id").replace("user_remove_tm_","");
        if($("#user_selected_tm_"+id).length)
            $("#user_selected_tm_"+id).remove();
            $("#jb_ul_data_user #id_user_tm_"+id).slideDown();

    });
});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///buscamos usuarios para los departamentos  y proyectos
//
//
// seccion de busqueda
function busqueda_usuarios_depyproy(search,op){
   //si la caja de texto esta vacia eliminamos la lista
      var camp = "";
    var ides = "";
    var idcmp = "";
    if(op==1)
    {
        camp = "#tag_departamentos #jb_list_user_departamentos";
        ides = "user_selected_dp_";
        idcmp = "id_user_dp_";
    }
    if(op ==2)
    {
        camp ="#tag_proyectos #jb_list_user_proyect";
        ides = "user_selected_proy_";
        idcmp = "id_user_proy_";
    }
        if($.trim(search) == '')
        {
            $(camp).hide();
        }

        //si la caja de texto contiene algo 
        if($.trim(search) !== '')
        {
           
            $(camp).show();
            if($(camp+" ul").length == 0)
            {
                var htmlUl='<ul id="jb_ul_data_user"><ul>';
                $(camp).append(htmlUl);
                $(camp+" #jb_ul_data_user ul").remove();
            }
              var elementopadre = $('[id^=jb_id_user_]');
              //recorremos el each buscando todos los id que inicien jb_id_user_
              $.each(elementopadre,function(i,t)
              {
                    search=search.toLowerCase();
                    search= sustituirAcentos(search);
                    var id = t.id;

                    var nombre = $("#"+t.id).text();
                    var strSearched=$(this).text();
                    strSearched = strSearched.toLowerCase();
                    strSearched = sustituirAcentos(strSearched);
                    id = id.replace('jb_id_user_','');
                    if(strSearched.indexOf(search.trim()) !== -1)
                    {
                        //nos escribe todo lo que sea diferente de undefined
                        if(typeof id !== "undefined")
                        {
                            var htmlLi = '<li id="'+idcmp+id+'">'+nombre+'</li>';
                            if($("#"+idcmp+id).length == 0 && $("#"+ides+id).length == 0)
                                $("#jb_ul_data_user").prepend(htmlLi);
                        }
                    }
                    else
                    {
                        if($("#"+idcmp+id).length)
                                $("#"+idcmp+id).remove();
                    }

              });
        }
        
}


////////ready para la seccicon de departamentos
$(document).on("ready",function()
{
    ///al ace el click en el campo nos egenera el listado en el div jb_lista_usuarios_click
    $('#contenUpop').on('click', '.click', function(){  
            var id = $(this).attr('id');

         if($("#selected_"+id).length == 0)
            $("#tag_departamentos #jb_list_user_click_depa").append("<div id='selected_dp_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");
    });

    ///hacemos le post para usuarios
    $("body").on('click', '#miembros', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6",
                beforeSend: function()
                {
                    $("#jb_list_user").css({"display":"block"});
                },
                success: function(server)
                {
                    /// escribimos las etiqeutas 
                    $.each(server,function(i,t){
                            $("#jb_result_users").append('<div id="jb_id_user_'+t.id+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });

       /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_dp_]', function(){
        var id = $(this).attr("id").replace("id_user_dp_","");
        

        if($("#tag_departamentos #jb_lista_usuarios_click_depa #user_selected_"+id).length == 0)
        {
            $("#tag_departamentos #jb_lista_usuarios_click_depa").append("<div id='user_selected_dp_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_dp_"+id).slideUp();
            $("#tag_departamentos #miembros").val('');
            $("#tag_departamentos #formdepa #jb_list_user_departamentos").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_]', function(){
        var id = $(this).attr("id").replace("user_remove_","");
        if($("#user_selected_dp_"+id).length)
            $("#user_selected_dp_"+id).remove();
            $("#jb_ul_data_user #id_user_dp_"+id).slideDown();

    });
});


////ready ara la seccion de proyectos
///
$(document).on("ready",function()
{
    ///al ace el click en el campo nos egenera el listado en el div jb_lista_usuarios_click
    $('body').on('click', '.click', function(){  
            var id = $(this).attr('id');

         if($("#selected_"+id).length == 0)
            $("#tag_proyectos #jb_lista_usuarios_click_proyect").append("<div id='selected_proy_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");
    });

    ///hacemos le post para usuarios
    $("body").on('click', '#miembrosproy', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6",
                beforeSend: function()
                {
                    $("#jb_list_user").css({"display":"block"});
                },
                success: function(server)
                {
                    /// escribimos las etiqeutas 
                    $.each(server,function(i,t){
                            $("#jb_result_users").append('<div id="jb_id_user_'+t.id+'">'+t.nombre+'</div>');
                    });
                }
            });

        }
    });

       /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_proy_]', function(){
        var id = $(this).attr("id").replace("id_user_proy_","");
        

        if($("#tag_proyectos #jb_lista_usuarios_click_proyect #user_selected_proy_"+id).length == 0)
        {
            $("#tag_proyectos #jb_lista_usuarios_click_proyect").append("<div id='user_selected_proy_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_dp_"+id).slideUp();
            $("#tag_proyectos #miembrosproy").val('');
            $("#tag_proyectos #formproy #jb_list_user_proyect").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_]', function(){
        var id = $(this).attr("id").replace("user_remove_","");
        if($("#user_selected_proy_"+id).length)
            $("#user_selected_proy_"+id).remove();
            $("#jb_ul_data_user #id_user_proy_"+id).slideDown();

    });
});


//////////////////////////////////////////////////////////////////////////////////////////////////





//cargamos el archivo para la opcion de tareas y actividades //////////////////////////////////////////////
$(document).on("ready", function(){

     $("#archivo_meeting_act").on("click",function(){
        var fileExtension = "";
        $(':file').change(function (event)
        {
            //obtenemos un array con los datos del archivo
            var file = $("#archivo_meeting_act")[0].files[0];
            var fileName = file.name;
            //obtenemos la extensión del archivo
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            var fileSize = file.size;
            var fileType = file.type;
            fileSize =(fileSize / (1024*1024)).toFixed(2);

                  if(fileSize > 4){
                        var inpu= $('#archivo_meeting_act');
                        inpu.replaceWith(inpu.val('').clone(true));
                        $("#form-w .mensaje").append("<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>");
                  }else{
                     $("#form-w .mensaje").append("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>");
                     $("#arch_reunAct").css({"color":"#1A72D4;"});
                     $("#arch_reunAct").addClass('resaltado');

                        parpareout();
                    
                  }
            var files = event.target.files; // FileList object
             
            for (var i = 0, f; f = files[i]; i++) {
                    //Solo admitimos imágenes.
                    if (!f.type.match('image.*')) {
                        continue;
                    }
                    var reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         $(".showImage").html(['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '" alt="90" width="100"/>'].join(''));
                        };
                    })(f);
                    reader.readAsDataURL(f);
                  }

           
        });
        function parpareout()
        {
             $(".resaltado").fadeOut('slow',parpareoint);
        }
        function parpareoint(){
             $(".resaltado").fadeIn('slow',parpareout);
        }

    });
});

//cargamos los archivos para la reunion recien creda
function selecarchreunew(idw,op){
        var camp = "";
        var camp2 ="";
        var camp3 ="";
        if (op == 1) {
            camp="#txts_"+idw;
            camp2="#check_visible_"+idw;
            camp3="#archivo_reunion_"+idw;
        }
        if (op ==2 ) {
            camp="#txt_"+idw
            camp2="#text_check_visible_"+idw;
            camp3="#archivo_meeting_act_"+idw;
        }
     $(camp).on("click",camp2,function(){
        var fileExtension = "";
        $(':file').change(function (event)
        {
            //obtenemos un array con los datos del archivo
            var file = $(camp2+" "+camp3)[0].files[0];
            var fileName = file.name;
            //obtenemos la extensión del archivo
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            var fileSize = file.size;
            var fileType = file.type;
            var msg="";
            fileSize =(fileSize / (1024*1024)).toFixed(2);

                  if(fileSize > 4){
                        var inpu= $(camp3);
                        inpu.replaceWith(inpu.val('').clone(true));
                       msg="<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>";
                       $(camp2+" .mensaje").append(msg);
                  }else{
                     msg="<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>";
                     $(camp2+" .mensaje").append(msg);
                  }
            var files = event.target.files; // FileList object
             
            for (var i = 0, f; f = files[i]; i++) {
                    //Solo admitimos imágenes.
                    if (!f.type.match('image.*')) {
                        continue;
                    }
                    var reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         $(camp2+" .showImage").html(['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '" alt="90" width="100"/>'].join(''));
                        };
                    })(f);
                    reader.readAsDataURL(f);
                  }
           
        });

    });
}


//cargamos los archivos para la opcion de tareas
function selectarchwtar(idw){

     $("#comn_tareas_"+idw).on("click","#archivo_tareasw_"+idw,function(){
        var fileExtension = "";
        $(':file').change(function (event)
        {
            //obtenemos un array con los datos del archivo
            var file = $("#arch_upw_tar_"+idw+" #archivo_tareasw_"+idw)[0].files[0];
            var fileName = file.name;
            //obtenemos la extensión del archivo
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            var fileSize = file.size;
            var fileType = file.type;
            var msg="";
            fileSize =(fileSize / (1024*1024)).toFixed(2);

                  if(fileSize > 4){
                        var inpu= $('#archivo_tareasw');
                        inpu.replaceWith(inpu.val('').clone(true));
                       msg="<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>";
                       $(".coment_w .mensaje").append(msg);
                  }else{
                     msg="<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>";
                     $("#comn_tareas_"+idw+" .mensaje").append(msg);
                     $("#comn_tareas_"+idw+" #arch_reunAct").css({"color":"#1A72D4;","cursor":"pointer"});
                     $("#comn_tareas_"+idw+" #arch_reunAct").addClass('resaltado');

                        parpareout();
                    
                  }
            var files = event.target.files; // FileList object
             
            for (var i = 0, f; f = files[i]; i++) {
                    //Solo admitimos imágenes.
                    if (!f.type.match('image.*')) {
                        continue;
                    }
                    var reader = new FileReader();
                    reader.onload = (function(theFile) {
                        return function(e) {
                          // Insertamos la imagen
                         //$(".showImage").html(['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '" alt="90" width="100"/>'].join(''));
                        };
                    })(f);
                    reader.readAsDataURL(f);
                  }

           
        });
        function parpareout()
        {
             $(".resaltado").fadeOut('slow',parpareoint);
        }
        function parpareoint(){
             $(".resaltado").fadeIn('slow',parpareout);
        }

    });
}
//cargamos los archivos para la opcion de las actividades
function selectarchwact(idw){

     $("#comn_actividad_"+idw).on("click","#archivo_actw_"+idw,function(){
        var fileExtension = "";
        $(':file').change(function (event)
        {
            //obtenemos un array con los datos del archivo
            var file = $("#arch_upw_tar_"+idw+" #archivo_actw_"+idw)[0].files[0];
            var fileName = file.name;
            //obtenemos la extensión del archivo
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            var fileSize = file.size;
            var fileType = file.type;
            var msg="";
            fileSize =(fileSize / (1024*1024)).toFixed(2);

                  if(fileSize > 4){
                        var inpu= $('#archivo_tareasw');
                        inpu.replaceWith(inpu.val('').clone(true));
                       msg="<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>";
                       $("#comn_actividad_"+idw+" #mensaje_"+idw).append(msg);
                  }else{
                     msg="<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>";
                     $("#comn_actividad_"+idw+" #mensaje_"+idw).append(msg);
                     $("#comn_actividad_"+idw+" #arch_reunAct").css({"color":"#1A72D4;","cursor":"pointer"});
                     $("#comn_actividad_"+idw+" #arch_reunAct").addClass('resaltado');

                        parpareout();
                    
                  }
        });
        function parpareout()
        {
             $(".resaltado").fadeOut('slow',parpareoint);
        }
        function parpareoint(){
             $(".resaltado").fadeIn('slow',parpareout);
        }

    });
}

function uparchivo_reunion(op,id){
 //al enviar el formulario
        //información del formulario
       var camp="";
    if (op ==1) {
        camp = "archivo_reunion_"+id;
        var idre = $("#idreunion").val();
     }
    if(op == 2)
     {  
        var idre = $("#idreunion").val();
        camp = "archivo_reunion_"+id;
     }  
     if (op == 3) {
        camp = "archivo_meeting_act_"+id
        var idre = $("#idReunAct").val();
     }
        var inputFile = document.getElementById(camp);
        if(inputFile !=="")
        {
                var file = inputFile.files[0];
                var fileName = file.name;
                fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
                var data = new FormData();
                data.append('archivo',file);

                var mensaje = ""; 
                //hacemos la petición ajax 
                var datosful = data;
                $.ajax({
                    url: 'funciones/uparchivos.php',  
                    type: 'POST',
                    contentType: false,
                    data: datosful,
                    // Form data//datos del formulario
                    //necesario para subir archivos via ajax
                    processData: false,
                    cache: false,
                    //mientras enviamos el archivo
                    beforeSend: function(){
                        mensaje = $("<span class='before'>Subiendo el archivo, por favor espere...</span>");
                    
                        if (op==1) {
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").empty();
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").append(mensaje);
                        }
                        if(op==2)
                        {
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").empty();
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").append(mensaje);
                        }
                        if(op==3)
                        {
                            $("#txt_"+id+" #text_check_visible_"+id+" .mensaje").empty();
                            $("#txt_"+id+" #text_check_visible_"+id+" .mensaje").append(mensaje);
                        }
                        // $("#save-w").val("")       
                    },
                    //una vez finalizado correctamente
                    success: function(data){
                        mensaje = $("<span class='success'>El archivo se ha subido correctamente.</span>");
                        if( op == 1 ){
                            savedbarch(id,idre,data,fileExtension,op);
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").empty();
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").append(mensaje);
                           
                                timeout("#txts_"+id+" #check_visible_"+id+" .mensaje");
                                timeout("#txts_"+id+" #check_visible_"+id+" .showImage");
                        }
                        if( op == 2 ){
                           op =1;
                           savedbarch_subtema(id,idre,data,fileExtension,op);
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").empty();
                            $("#txts_"+id+" #check_visible_"+id+" .mensaje").append(mensaje);
                            timeout("#txts_"+id+" #check_visible_"+id+" .mensaje");
                            timeout("#txts_"+id+" #check_visible_"+id+" .showImage");
                          
                        }
                        if( op == 3 ){
                            op=2;
                           savedbarch_subtema(id,idre,data,fileExtension,op);
                            $("#txt_"+id+" #text_check_visible_"+id+" .mensaje").empty();
                            $("#txt_"+id+" #text_check_visible_"+id+" .mensaje").append(mensaje);
                            
                                timeout("#txt_"+id+" #text_check_visible_"+id+" .mensaje");
                                timeout("#txt_"+id+" #text_check_visible_"+id+" .showImage");
                            
                        }
                    },
                    //si ha ocurrido un error
                    error: function(){
                        mensaje = $("<span class='error'>Ha ocurrido un error.</span>");
                        showMessage(mensaje);
                    }
                });
        }else{
            mensaje = $("<span class='erro'>Seleccione un archivo</span>");
            if (op==1) {
                $("#txts_"+id+" #check_visible_"+id+" .mensaje").empty();
                $("#txts_"+id+" #check_visible_"+id+" .mensaje").append(mensaje);
                timeout("#txts_"+id+" #check_visible_"+id+" .mensaje");
                timeout("#txts_"+id+" #check_visible_"+id+" .showImage");
            }
            if (op==2) {
                showMessage(mensaje);
                $("#txts_"+id+" #text_check_visible_"+id+" .mensaje").empty();
                $("#txts_"+id+" #text_check_visible_"+id+" .mensaje").append(mensaje);
                timeout("#txts_"+id+" #text_check_visible_"+id+" .mensaje");
                timeout("#txts_"+id+" #text_check_visible_"+id+" .showImage");
           }
            if (op==3) {
                showMessage(mensaje);
                $("#txt_"+id+" #text_check_visible_"+id+" .mensaje").empty();
                $("#txt_"+id+" #text_check_visible_"+id+" .mensaje").append(mensaje);
                timeout("#txt_"+id+" #text_check_visible_"+id+" .mensaje");
                timeout("#txt_"+id+" #text_check_visible_"+id+" .showImage");
           }
            
        }
}

function timeout(param)
{
    setTimeout(function(){
        $(param).empty();
    });
    return true;
}

/////opcion de subida de archivos  barias secciones
function uparchivo(op,id,idre){
 //al enviar el formulario
        //información del formulario
       var camp="";
    if (op ==1) {
        camp = "archivo_meeting_act_"+id;
     }
    if(op == 2)
     {
        camp = "archivo_meeting_act";
     }
    if(op==3){
       camp= "archivo_tareasw_"+id;
    }  
     if(op==4){
       camp= "archivo_actw_"+id;
    }    
        var inputFile = document.getElementById(camp);
        if(inputFile !=="")
        {
                var file = inputFile.files[0];
                var fileName = file.name;
                fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
                var data = new FormData();
                data.append('archivo',file);

                var mensaje = ""; 
                //hacemos la petición ajax 
                var datosful = data;
                $.ajax({
                    url: 'funciones/uparchivos.php',  
                    type: 'POST',
                    contentType: false,
                    data: datosful,
                    // Form data//datos del formulario
                    //necesario para subir archivos via ajax
                    processData: false,
                    cache: false,
                    //mientras enviamos el archivo
                    beforeSend: function(){
                        mensaje = $("<span class='before'>Subiendo el archivo, por favor espere...</span>");
                        if (op==1) {
                            showMessage(mensaje);
                            $("#save-w").css('opacity','0.2');

                        }
                        if (op==2) {
                            showMessage(mensaje);
                            $("#save-w").css('opacity','0.2');
                       }
                        if (op==3) {
                            $(".tareasIdeas #"+id+" #mensaje_"+id).empty();
                            $(".tareasIdeas #"+id+" #mensaje_"+id).append(mensaje);
                          $("#save-w").css('opacity','0.2');
                        }
                        if(op==4)
                        {
                            $("#comn_actividad_"+id+" #mensaje_"+id).empty();
                            $("#comn_actividad_"+id+" #mensaje_"+id).append(mensaje);

                        }
                        // $("#save-w").val("")       
                    },
                    //una vez finalizado correctamente
                    success: function(data){
                        mensaje = $("<span class='success'>El archivo se ha subido correctamente.</span>");
                        if(op==1){
                            var sec="";
                            savedbarch(id,idre,data,fileExtension,sec);
                            $(".mensaje").append(mensaje);
                            timeout(".showImage");
                            timeout(".mensaje");

                        }
                        if(op==2){
                            $("#arch_reunAct").removeClass('resaltado');
                            $("#arch_reunAct").css({
                                display: 'inline',
                                color: '#135D58'
                            });
                            $("#save-w").css('opacity','1');
                            $(".mensaje").prepend("Ya puedes guardar la tarea.");
                            preparesave(data,fileExtension);
                            showMessage(mensaje);
                            timeout(".showImage");
                            timeout(".mensaje");
                        }
                        if(op == 3){
                            savearchw(data,id,idre,fileExtension);
                            $(".tareasIdeas #"+id+" #mensaje_"+id).empty();
                            $(".tareasIdeas #"+id+" #mensaje_"+id).append(mensaje);
                            timeout(".tareasIdeas #"+id+" #mensaje_"+id);
                            timeout(".tareasIdeas #"+id+" .showImage");
                        }
                        if (op==4) {
                            savearchw(data,id,idre,fileExtension);
                            $("#comn_actividad_"+id+" #mensaje_"+id).empty();
                            $("#comn_actividad_"+id+"#arch_upw_tar_"+id+" #arch_reunAct").removeClass('resaltado');
                            $("#comn_actividad_"+id+" #mensaje_"+id).append(mensaje);
                            timeout("#comn_actividad_"+id+" .showImage");
                        }
                        setTimeout(function(){
                            $("#text_check_visible_"+id+" .showImage").hide();
                            $("#text_check_visible_"+id+" .mensaje").hide();
                        },1500);
                    },
                    //si ha ocurrido un error
                    error: function(){
                        mensaje = $("<span class='error'>Ha ocurrido un error.</span>");
                        showMessage(mensaje);
                    }
                });
        }else{
            mensaje = $("<span class='erro'>Seleccione un archivo</span>");
            if (op==1) {
                showMessage(mensaje);
                $("#save-w").css('opacity','0.2');

            }
            if (op==2) {
                showMessage(mensaje);
                $("#save-w").css('opacity','0.2');
           }
            if (op==3) {
                $(".tareasIdeas #"+id+" #mensaje_"+id).append(mensaje);
              $("#save-w").css('opacity','0.2');
            }
             setTimeout(function(){
                            $("#save-w .showImage").empty();
                            $("#save-w .mensaje").empty();
                            $(".tareasIdeas #"+id+" #mensaje_"+id).empty();
                        },1500);
        }
}
//como la utilizamos demasiadas veces, creamos una función para
//evitar repetición de código
function showMessage(message){
    $(".mensaje").html("").show();
    $(".mensaje").html(message);
}

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension)
{
    var continua ="";
    if(typeof extension==="null" || typeof extension ==="undefined")
    {
        continua = false;
        //return false;
    }else{
        if (extension == "jpg" || extension == "png" || extension == "jpeg" ||extension == "gif" ) {
            continua = true;
        }
    }
    return continua;
}

//guardamos el arch en la bd
function savedbarch(id,idre,data,tipo,op)
{
    var liga="";
    $.each(data,function(k,v){
        liga+=v+"/";
    });
    liga=liga.substring(0, liga.length-1);
    liga=liga.substring(3, liga.length);
    var txt = "selec=20&id="+id+"&idre="+idre+"&dir="+liga+"&tipo="+tipo+"&idus="+$("#idus").val();
    var ruta= "funciones/funciones.php";
    $.post(ruta,txt,function(data){

       if (data!="") {
        //console.log(op);
            if(op == 1){
                show_listreunion_new(id);
            }
            if(op ==""){
                show_listreunion(id);
            }
        }
    });
}


//guardamos el arch en la bd del subtema
function savedbarch_subtema(id,idre,data,tipo,op)
{
    var liga="";
    $.each(data,function(k,v){
        liga+=v+"/";
    });
    liga=liga.substring(0, liga.length-1);
    liga=liga.substring(3, liga.length);
    var txt = "selec=30&id="+id+"&idre="+idre+"&dir="+liga+"&tipo="+tipo+"&idus="+$("#idus").val();
    var ruta= "funciones/funciones.php";
    $.post(ruta,txt,function(data){
       if (data!="") {
          show_listreunion_newsubtema(id,op);
         // console.log(data);
       };
    });
}




///generamso unos input con la ruta del archivo para posterior guardarlos en la bd seccion tareas actividades
function preparesave(data,filextension)
{
    var liga="";
    $.each(data,function(k,v){
        liga+=v+"/";
    });
    liga=liga.substring(0, liga.length-1);
    liga=liga.substring(3, liga.length);
    var html = '<input type="hidden" id="files" name="files" value="'+liga+'"><input type="hidden" id="extension" name="extension" value="'+filextension+'">';
    $("#form-w").prepend(html);

}

function savearchw(data,id,op,tipo)
{
    var liga="";
    $.each(data,function(k,v){
        liga+=v+"/";
    });

    liga=liga.substring(0, liga.length-1);
    liga=liga.substring(3, liga.length);
    var idus=$("#idus").val();
    var txt = " selec=26&id="+idus+"&idw="+id+"&file="+liga+"&extension="+tipo;  
    var ruta ="funciones/funciones.php";

    $.post(ruta,txt,function(data){
        if(data !=""){
            if(op==0){
                genLisTarea(id);
            }if (op==1) {
                genLitsAct(id);
            }
        }
    });

}