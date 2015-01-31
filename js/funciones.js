$.datepicker.regional['es'] = {
 closeText: 'Cerrar',
 prevText: '<Ant',
 nextText: 'Sig>',
 currentText: 'Hoy',
 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
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
    $("#show_act").on("click",showactividades);
    $("#Nw_tareas").on("click",showtareasN);
    $("#w-adduser").on("click",showAddUserW);
    $("#show_act").on("click",genlistactv);
    $("#show_act").on("click",genlistfull);
    $("#show_act").on("click",genlistend);
    $("#pass").on("keydown",logOn);
    //$("#n-work").on("click",show_w);

    //$("#logint").on("click",loger);
    //$("#logend").on("click",logend);
    //$("#saveDepa").on("click",savedepa);
     /*$("#saveProy").on("click",saveproy);*/
}

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


function tagNew()
{
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
                datahtml+='<h4  onclick="jb_reunion_upop('+v.idre+')"">'+v.nombre+'</h4><span class="alertDia"></span>';
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
           
            if (v.count_fecha <=0) {
               $("#"+v.idre).addClass('meeting_post timedead');
               var h = '<span class="icon">8</span>Reunion Del Dia';
               $(".timedead .meeting_head .alertDia").append(h);
            }
            if (v.count_fecha > 0 && v.count_fecha <=3) {
              $("#"+v.idre).addClass('meeting_post timeout');
              var h = '<span class="icon">4</span>Reunion Proxima';
              $(".timeout .meeting_head .alertDia").append(h);
            }
            if (v.count_fecha >3) {
                 $("#"+v.idre).addClass('meeting_post norma');
               var h = '<span class="icon normal">K</span>';
                    $(".norma .meeting_head .alertDia").append(h);
            }
             
              //  $("#showTopic .meeting_post :first-child").remove();
            
        });

    }).fail(function(){
        alert("Error En El Servidor");
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

    $(".etiquetas").remove();
    $(".meeting_active").remove();

    var txt = "op=1&selec=13&id="+id+"&idusua="+$("#idus").val();
    var ruta ="funciones/funciones.php";

    $.post(ruta, txt, function(data) {
        //console.log(data); 
        $.each(data,function(k,v){

           var  html='<div class="meeting_active" style="display:block">';
           html+='<div class="form_reun">';
           html+='<form action="index_submit" id="form_reunion_new" method="post" accept-charset="utf-8">';
           html+='<input type="text" name="nom_reunion" class="meetingTitulo" value="'+v.nombre+'" placeholder="Escribe el nombre de la reunion">';
           html+='<div class="meeting_time"><div>Fecha: '+v.fecha+'</div><div>Hora Inicio: '+v.hora+'</div></div>';
           html+='<h4>Reunion</h4>';
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
            html+='<li>';
            html+='<textarea id="tiTuloTopic" name="tituloTopic" class="Titulo-topic" type="text" placeholder="Escriba el titulo de su tema" rows="1"></textarea>';
            html+='</li>';
            html+='</ul>';
            html+='<input type="button" value="Guardar" id="SaveTopicNew">';
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
            $("#incl_list_tareas ").append(data);
       }else
       {
        $("#incl_list_tareas ").append(data);
       }
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
                $("#incl_list_act ").append(data);
            }else
            {
                $("#incl_list_act ").append(data);
            }

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
                $("#incl_list_Wcomplet ").append(data3);
            }else
            {
                $("#incl_list_Wcomplet ").append(data3);
            }
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

///funcion guardar actividad
///

function save_w_form(){
    var form = $("#form-w").serialize();
    var id = $("#idus").val();
   var txt= form+"&op=2&selec=7&id="+id;
   var ruta="funciones/funciones.php";

   $.post(ruta,txt, function(data){
    alert(data);
   });
}


//// seccion de busqueda 
//usuarios


$(document).on("ready",busquedas);

function busquedas()
{
    $("#meeting-user-share").on("keyup",buscUsuario);
}

function buscUsuario()
{
     var ruta="funciones/funciones.php";
    var txt = "selec=6&op=3";
    $.post(ruta,txt,function(data){
        
    });

}

function showAddUserW()
{   

    $("#w-adduser").removeClass();
    $("#w-adduser").removeAttr('style');
    $("#adduser-w").css({"display":'inline-block'});

}


function busquedaSimpleUsers(search)
{
  //console.log(search);

      var elementopadre = $('[id^=jb_nombre_lista_user_]');
      $.each(elementopadre,function(i,t)
      {
        search=search.toLowerCase();
        search= sustituirAcentos(search);
        var id = t.id;
        var strSearched=$(this).text();
        strSearched = strSearched.toLowerCase();
        strSearched = sustituirAcentos(strSearched);
        id = id.replace('jb_nombre_lista_user_-','');
        if(strSearched.indexOf(search.trim()) !== -1)
            console.log($("#"+id).text());

      });

}

function sustituirAcentos(str)
{
var str = str.replace(/á/g,"a"); 
str = str.replace(/é/g,"e");  
str = str.replace(/í/g,"i");  
str = str.replace(/ó/g,"o");  
str = str.replace(/ú/g,"u"); 
str = str.replace(/Á/g,"A"); 
str = str.replace(/É/g,"E");  
str = str.replace(/Í/g,"I");  
str = str.replace(/Ó/g,"O");  
str = str.replace(/Ú/g,"U"); 
return str;
}