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
    $("#saveEtiqueta").on("click",savetag);
    $("#Nw_tareas").on("click",showtareasN);
    $("#w-adduser").on("click",showAddUserW);
    $("#show_act").on("click",showactividades);
    $("#show_act").on("click",genlistactv);
    $("#show_act").on("click",genlistfull);
    $("#show_act").on("click",genlistend);
    $("#pass").on("keydown",logOn);
    $("#jb_etiqueta_reun").attr("onkeyup","busquedaSimpleUsers(this.value,1);");
    $("#meeting-user-share").attr("onkeyup","busquedaSimpleUsers(this.value,2);");

    //$("#n-work").on("click",show_w);

    //$("#logint").on("click",loger);
    //$("#logend").on("click",logend);
    //$("#saveDepa").on("click",savedepa);
     /*$("#saveProy").on("click",saveproy);*/

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
    var txt = "use="+usuario+"&pas="+pass+"&op=1";
    alert(txt);
    if (usuario == "" || pass == "") {
        alert("llenar todos los campos");
    }else
    {
        $.post(ruta,txt, function(data){
            if (data ==1) {
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
            var nombre = $(".meetingTitulo").val();
            var horafin = $("#basicExample2").val();
            if (nombre =="" || horafin == "") { 
                alert("llenar los campos");
            }
        else{    
            var idus = $(".session #idus").val();
            var f = form+"&op=2&selec=1&iduser="+idus;
           // alert(f);
            var ruta = "funciones/funciones.php";;
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
    {       //hace una actualizacion de la reunion 
            var idre = $("#idreunion").val();
            var form = $("#form_reunion_new").serialize();
            var idus = $(".session #idus").val();
            var f = form+"&op=2&selec=1&iduser="+idus+"&idre="+idre;
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

function showactividades()
{
    $(".new-w").css({display:'none'});
    $(".main-home").css({display:'none'});
    $(".meeting_new").css({display:'none'});
    $(".tareas").css({display:'block'});
     $(".cuerpo-tareas").css({display:'block'});
}
function showtareasN()
{   
    $(".main-home").css({display:'none'});
    $(".meeting_new").css({display:'none'});
    $(".tareas").css({display:'block'});
    $(".cuerpo-tareas").css({display:'none'});
    $(".new-w").css({display:'block'});

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
}












function new_meeting()
{   //alert("asas");
    $(".meeting_left").css('display','none');
    $(".meeting_rigth").css('display','none');
    $(".tareas").css('display','none');
    $(".meeting_new").css('display','block');
    $(".meeting_new :text").val("");
    $("#idreunion").remove();
    $("#topiclayer form ul #topiclist").remove();

}

function tag_sel(event)
{   //muestra la etiquetas
    if (event == 1) 
    {
        $("#tag_etiqueta").css({display: 'block'});
        $(".tag_izq_tag").css({display: 'block'});
        listatagshow($("#idus").val());
        tagNewclik();
        $("#tag_departamentos").css({display: 'none'});
        $(".tag_izq_depa").css({display: 'none'});
        $("#tag_proyectos").css({display: 'none'});
        $(".tag_izq_proy").css({display: 'none'});
    }//muestra los deparatamentos
    if (event == 2) 
    {
      $("#tag_etiqueta").css({display: 'none'});
      $(".tag_izq_tag").css({display: 'none'});
      $("#tag_departamentos").css({display: 'block'});
      $(".tag_izq_depa").css({display: 'block'});
      $("#tag_proyectos").css({display: 'none'});
      $(".tag_izq_proy").css({display: 'none'});
    }// muestra los proyectos
    if (event == 3)
    {
      $("#tag_etiqueta").css({display: 'none'});
      $(".tag_izq_tag").css({display: 'none'});
      $("#tag_departamentos").css({display: 'none'});
      $(".tag_izq_depa").css({display: 'none'});
      $("#tag_proyectos").css({display: 'block'});
      $(".tag_izq_proy").css({display: 'block'});
    }     
}
//guarda la etiqeuta cuando dan click en guardar del form
function savetag(e)
{
    //e.preventDefault();
    if($("#idus").length){
    var titulo = $("#nombreTag").val();
    var tipo   = $("#tipoEtiqueta").val();
    var iduser = $("#idus").val();
    var txt = "op=2&selec=3&ti="+titulo+"&tipo="+tipo+"&idus="+iduser;
    var ruta ="funciones/funciones.php";
    $.post(ruta,txt, function(data){
       if(data=="ok"){
        listatagshow(iduser);
       }
    });
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

//genera un nuevo formulario para registrar nueva etiqueta
function tagNewclik()
{

     var form ='<form action="#" >';
      form+='<div><label>Titulo:</label> <input type="text" name="tituloTag" id="nombreTag"></div>';
      form+='<div><label>Tipo de Etiqueta:</label><select id="tipoEtiqueta">';
      form+='<option value="Normal">Normal</option><option value="Departamento">Departamento</option><option value="Proyecto">Proyecto</option>';
      form+='</select></div><input type="submit" value="Guardar" id="saveEtiqueta">';
      form+='</form>';

    if ($("#tag_etiqueta form").length) {
        $("#tag_etiqueta form").remove();
        $("#tag_etiqueta").append(form);
    }
}
//guarda el departamento generado
/*function savedepa()
{
    var titulo = $("#nombreDepa").val();
    var miembros   = $("#miembros").val();
    var txt = "op=&selec=&ti="+titulo+"&tipo="+miembros;
    var ruta ="funciones/funciones.php";

    $.post(ruta, txt , function(data){
        
        
    $("#tag_departamentos :text").val("");
    });
}
/*
function saveproy()
{
    var titulo = $("#nombreDepa").val();
    var miembros   = $("#miembros").val();
    var txt = "op=&selec=&ti="+titulo+"&mimebro="+miembros;
    var ruta ="funciones/funciones.php";

    $.post(ruta, txt , function(data){
        
    });

    $("#tag_proyectos :text").val("");
}*/

//elimina las etiquetas guardadas
//
function dellTag(datos)
{
    var id = $("#idus").val();
     var t = "op=5&tab=2&idcam=2&id="+id+"&ids="+datos;
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
    var tx = "selec=2&op=1&idusua="+$("#idus").val();
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
            //console.log(data);
            
        $.each(data, function(k, v)
        {
            var datahtml='<div id="'+v.idre+'" >';
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
                //datahtml+='<li id="topiclist"><span>'+v.lista.text+'</span></li>';
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
             
              //  $("#showTopic .meeting_post :first-child").remove();
            
        });

    }).fail(function(){
        alert("Error En El Servidor.");
    });
    }
    
}


//generamos la lista de reuniones pasadas
function reunionespasadas(){
    if($("#idus").length){
    var tx = "selec=12&op=1&idusua="+$("#idus").val();
    var ruta = "funciones/funciones.php";
        if ($("#reunionespas #showlisendreuniones .meeting_end").length) {
            $("#reunionespas #showlisendreuniones .meeting_end").remove();}
    $.post(ruta,tx,function(data){
        $.each(data,function(k,v){

            var datahtml='<div id="'+v.idre+'" class="meeting_end">';
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
    var txt = "op=2&selec=4&val=0&id="+id+"&idus="+iduser;
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

    var txt = "op=1&selec=13&id="+id+"&idusua="+$("#idus").val();
    var ruta ="funciones/funciones.php";

    $.post(ruta, txt, function(data) {
        //console.log(data); 
        $.each(data,function(k,v){

           var  html='<div class="meeting_active" style="display:block">';
           html+='<div class="form_reun">';
           html+='<form action="#" id="form_reunion_act" method="post" accept-charset="utf-8">';
           html+='<input type="text" name="nom_reunion" class="meetingTitulo" value="'+v.nombre+'" placeholder="Escribe el nombre de la reunion">';
           html+='<div class="meeting_time"><div>Fecha: '+v.fecha+'</div><div>Hora Inicio: '+v.hora+'</div></div>';
           html+='<h4>Reunion</h4><span class="icon">K</span>';
           html+='<input type="hidden" id="idReunAct" value="'+v.idre+'" />';
           html+='<label><p>Etiquetas:</p><input type="text" name="etiquetas" value="" placeholder="Escribe las etiquetas"></label><span id="tagNew" >Nueva Etiqueta</span>';
           html+='<div class="list-share list-meeting" style="display:none;">';
           html+='<ul>';
           html+='<li>as</li>';
           html+='</ul>';
           html+='<div>';
           html+='<label id="tagNew-n" >Crear Etiqueta</label><br />';
           html+='<label for="">Admin. Etiqueta</label>';
           html+='</div>';
           html+='</div>';
           html+='<label><p>Lugar:</p><input type="text" name="lugar" value="'+v.localizacion+'" placeholder="Escribe el lugar del evento"></label>';
           html+='<label><p>Participantes:</p><input type="text" id="meeting-user-share" name="participantes" value="'+v.usuario+'" placeholder="Escribe el nombre de los participantes"></label>';
           html+='<div class="list-share list-meeting" style="display:none;">';
           html+='<ul>';
           html+='<li>as</li>';
           html+='</ul>';
           html+='<div>';
           html+='<label id="tagNew-n" >Crear Etiqueta</label><br />';
           html+='<label for="">Admin. Etiqueta</label>';
           html+='</div>';
           html+='</div>';
           // html+='<input type="button" value="Guardar" id="new_save_meeting">';
            html+='</form>';
            html+='<div id="newtopic" class="topicAgregar">';
            html+='<div id="topiclayer" style="display:block">';
            html+='<h3>Temas a tratar</h3>';
            html+='<form action="">';
            html+='<ul>';
            var list = v.lista;
            $.each(list, function(i, t) {
                html+='<li class="list_meeting_active">';
                html+='<label>'+t.texts+'</label>';
                html+='<div id="tomas'+t.ids+'"></div>';
                html+='<div class="menu_list_active">';
                html+='<textarea id="textolist_activ" onclick="block_oplits('+t.ids+')" name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div class="opciones_list_activ'+t.ids+'" style="display:none"><div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo</label>';
                html+='<input name="archivo" type="file" id="archivo_meeting_act" /><br /><input type="button" id="agregar_arch_reAct" value="Agregar" /></form><div class="mensaje"></div><div class="showimage"></div></div>';
                html+='<div class="bar_menu_list"><div><label>Guardar Como: </label><input type="button" value="Nota" onclick="save_accionlist('+t.ids+',\'nota\')"/><input type="button" value="Decision" onclick="save_accionlist('+t.ids+',\'decision\')"/><input type="button" value="Tarea" style="display:none" onclick="save_accionlist('+t.ids+',\'tarea\')" /></div></div></div>';
                html+='</div>';
               // html+='<ul><li>alguna nota</li></ul>';
                html+='</li>';
            });
            html+='</ul>';
            //html+='<input type="button" value="Guardar" id="SaveTopicNew">';
            html+='</form>';
            html+='</div>';
            html+='</div>';
            html+='</div>';
            html+='</div>';


            $("#contenUpop").append(html);
        });


    }).fail(function(){
        alert("Error En El Servidor");
    });

  


}

///mostramos las opciones de los elementos de laslistas activas
function block_oplits(id)
{
    $(".opciones_list_activ"+id).css({"display":"block"});
}

//function guardamos la accion de la lista 
function save_accionlist(id,txt)
{
    var txto="op=2&selec=14&id="+id+"&tipo="+txt+"&text="+$("#textolist_activ").val();
    var ruta = "funciones/funciones.php";

    $.post(ruta, txto, function(data){
        if($("#tomas"+id+" .notas").length){
            $("#tomas"+id+" .notas").remove();
        }
        var htm='<ul class="notas">';
       $.each(data, function(k,v){
            htm+='<li class="list_'+v.tipo+'">'+v.texto+'</li>';
       });
       htm+="</ul>";
       $("#tomas"+id).append(htm);

    }).fail(function(){ alert("Fallo Servidor");});
}


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
    var tx = "selec=9&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
         if ($("#incl_list_tareas .post-w").length) {
            $("#incl_list_tareas .post-w").remove();
       }
        $.each(data,function(k,v){
           var html='<div id="'+v.idactw+'"class="post-w">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">'+v.notas+'</div>';
               html+='</div>';
               html+='<div class="btn_down"><span class="icon">:</span></div>';
               html+='<div class="btn_del" onclick="w_fin('+v.idactw+','+idus+')"><span class="icon">Â</span></div>';
               html+='</div>';
               $("#incl_list_tareas ").append(html);
        });

    });

}
///generamos lal ista de todas las actividades
function genlistfull()
{
    var idus = $("#idus").val();
    var tx = "selec=10&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
        $.post(ruta,tx,function(data){
            if ($("#incl_list_act .post-w").length) {
                $("#incl_list_act .post-w").remove();
            }
             $.each(data,function(k,v){
            var html='<div class="post-w">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">'+v.notas+'</div>';
               html+='</div>';
               html+='<div class="btn_down"><span class="icon">:</span></div>';
               html+='<div class="btn_del"><span class="icon">Â</span></div>';
               html+='</div>';
               $("#incl_list_act ").append(html);
            });
        });
}

//generamos las listas de actividades tareas finalizadas
//
function genlistend()
{
    var idus = $("#idus").val();
    var tx = "selec=11&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
        $.post(ruta,tx,function(data3){
            if ($("#incl_list_Wcomplet .post-w").length) {
                $("#incl_list_Wcomplet .post-w").remove();
            }

            $.each(data,function(k,v){
            var html='<div class="post-w">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">'+v.notas+'</div>';
               html+='</div>';
               html+='<div class="btn_down"><span class="icon">:</span></div>';
               html+='<div class="btn_del"><span class="icon">Â</span></div>';
               html+='</div>';
               $("#incl_list_Wcomplet ").append(html);
            });

        });
}

///funcion guardar actividad
///

function save_w_form(){

    var form = $("#form-w").serialize();
    var id = $("#idus").val();
   var txt= form+"&op=2&selec=7&id="+id;
   var ruta="funciones/funciones.php";
   $.post(ruta,txt, function(data){
    if(data!=""){
        showactividades();
        genlistfull();
        genlistfull();
        genlistend();
    }
   });
}

function w_fin(idw,idus)
{
  var txt = "selec=16&op=2&idw="+idw+"&id="+idus;
  var ruta = "funciones/funciones.php"
  $.post(ruta, txt, function(data) {
    if(data==1){
        $("#incl_list_tareas #"+idw).remove();
        genlistend();
    }

  }).fail(function(){
    alert('Error en el servidor.');
  });
}
///cierra el pupop avierto
$("#closeUpop").click(function(){
    $("#capatrans").css('display','none');
});

//guardamos el tema de la reunion
function SaveTopicNew(){
  var titulo = $("#tiTuloTopic").val();
  var id = $("#idreunion").val();
  var txt = "selec=5&op=2&ti="+titulo+"&id="+id;
  var ruta = "funciones/funciones.php";
  
  $.post(ruta,txt,function(data){
        var datos = "op=4&id="+id;
        var ruta ="funciones/eventos.php";
         $.post(ruta,datos, function(datas){
           
                 $("#topiclayer #topiclist").remove();
                 $("#topiclayer form ul").prepend(datas);
                 $("#tiTuloTopic").val("");
             
            // alert(datas);
         });
  });
}



//// seccion de busqueda 
//usuarios


function showAddUserW()
{   

    $("#w-adduser").removeClass();
    $("#w-adduser").removeAttr('style');
    $("#adduser-w").css({"display":'inline-block'});

}


function busquedaSimpleUsers(search,section)
{
  //console.log(search);
  if(section == 1)
  {

    if($.trim(search) == '')
    {
        $("#jb_etiquetas").hide();
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
        $("#jb_list_user").hide();
    }
    //si la caja de texto contiene algo 
    if($.trim(search) != '')
    {
        $("#jb_list_user").show();
        if($("#jb_list_user ul").length == 0)
        {
            var htmlUl='<ul id="jb_ul_data_user"><ul>';
            $("#jb_list_user").append(htmlUl);
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



///////////////////carga de archivos en la seccion de reuniones activas 
$(document).on("ready",function(){

    $(".mensaje").hidden;
    var fileExtension="";
   
    $('formulario_meetin_act :file').change(function()
    {
        var file = $("#archivo_meeting_act")[0].files[0];
        var fileName = file.name;
        fileExtension = fileName.substring(fileName.lastIndexOf('.')+1);

        var fileZise = file.size;
        var fileType = file.type;
        showMessage("<span class='info'>Archivo para subir: "+fileName+", peso Total: "+fileSize+". </span>");
    });
 
    $(':button').click(function(){
        var formData = new FormData($(".formulario_meetin_act")[0]);
        var mensaje="";

        $.ajax({
            url:'funciones/eventos.php',
            type:'POST',
            data:formData+'&op=6&idus='+$("#idus").val+'&dire='+$("#idReunAct").val(),
            cache:false,
            contenType:false,
            processData:false,

            ///mientas se envia el archivo
            beforeSend:function(){
                mensaje=$("<span class='before'>Subiendo el archivo, porfavor espere....</span>");
                showMessage(mensaje);
            },
            //cuando termino correctamente
            success:function(data){
                mensaje = $("<span class='succes'> El Archivo se cargo correctamente.</span>");
                showMessage(mensaje);
                if (isImage(fileExtension))
                {
                    $(".showimage").html("<img src='files/"+data+" alt='50' width='50' / >");
                }
            },
            //si sale un error
            error:function(){
                mensaje = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(mensaje);
            }
        });
    });
});
//para mostrar el mensaje

function showMessage(mensaje)
{
    $(".mensaje").html('').show();
    $(".mensaje").html(mensaje);
}

//comprobamos que sea una imagen para visualisar

function isImage(extension)
{
    /*
    switch(extension.toLOwerCase())
    {
        case'jpg': case'gif': case'png': case'jpeg':
        return true;
        break;
        default:
        return false;
        break;
    }
    */
}

///hacemos un document ready con el post para etiqeutas y para los usuarios
$(document).on('ready', function(){

    $('body').on('click', '.click', function(){  
        var id = $(this).attr('id');
        //console.log($("#"+id).text() + " -> " + id);
        //console.log($(this).text());
        if($("#selected_"+id).length == 0)
            $("#jb_lista_usuarios_click").append("<div id='selected_"+id+"'>"+$("#"+id).text()+"</div>");


        if($("#selected_"+id).length == 0)
            $("#jb_lista_tag_click").append("<div id='selected_"+id+"'>"+$("#"+id).text()+"</div>");
     });
    //para las etiquetas  generamso un post 
    $("body").on('click', '#jb_etiqueta_reun', function(){

        if($("#jb_result_tags").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"op=3&selec=15&id="+$("#idus").val(),
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

    ///hacemos le post para usuarios
    $("body").on('click', '#meeting-user-share', function(){

        if($("#jb_result_users").text() == "")
        {

            $.ajax({
                type: "POST",
                dataType : "json",
                url: "funciones/funciones.php",
                data:"selec=6&op=3",
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
            $("#jb_lista_tag_click").append("<div id='tag_selected_"+id+"'>"+$(this).text()+" <span id='tag_remove_"+id+"'>X</span></div>");
            $("#id_tag_is_"+id).slideUp();
        }

    });
//removemos las etiquetas registradas 
    $("body").on('click', '[id^=tag_remove_]', function(){
        var id = $(this).attr("id").replace("tag_remove_","");
        if($("#tag_selected_"+id).length)
            $("#tag_selected_"+id).remove();

    });


/// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_is_]', function(){
        var id = $(this).attr("id").replace("id_user_is_","");
        
       // console.log($(this).text() + " -> " + id);
        if($("#user_selected_"+id).length == 0)
        {
            $("#jb_lista_usuarios_click").append("<div id='user_selected_"+id+"'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_is_"+id).slideUp();
        }

    });
//removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_]', function(){
        var id = $(this).attr("id").replace("user_remove_","");
        if($("#user_selected_"+id).length)
            $("#user_selected_"+id).remove();

    });
    
});
