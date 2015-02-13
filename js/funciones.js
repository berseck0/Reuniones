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
   // $("#form_tarea_tema #datepicker4").datepicker();
  //  $(".list_meeting_active #form_tarea_tema #datepicker4").datepicker();
  });

$('body').on('click','#datepicker4',function(){
        $( "#datepicker4" ).datepicker();
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
   // $("#form_tarea_tema #sav_asing_w").on("click",save_asing_wActv);

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
            if ($(".meetingTitulo").val() =="" || $("#basicExample2").val() == "") { 
                alert("llenar los campos");
            }
        else{    
            // jalamos los ids de los tag seleccionados
            var padre = $('#jb_lista_tag_click div');
            var idtag="";
            $.each(padre,function(index) {
                 var id = $(this).attr("id").replace("tag_selected_","");
                idtag+=id+',';
            }); 
             idtag+=0;

             //jalamos los ids de los usuarios participantes
             var padreUsr = $("#jb_lista_usuarios_click div");
             var usrid="";
             $.each(padreUsr, function() {
                  var idusr= $(this).attr("id").replace("user_selected_","");
                  usrid += idusr+',';
             });
             usrid+=0;


            var idus = $(".session #idus").val();
            var f = form+"&op=2&selec=1&iduser="+idus+"&idt="+idtag+"&usrdi="+usrid;
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
        var padre = $('#jb_lista_tag_click div');
            var idtag="";
            $.each(padre,function(index) {
                 var id = $(this).attr("id").replace("tag_selected_","");
                idtag+=id+",";
            }); 
            idtag+=0;
           
            //jalamos los ids de los usuarios seleccionados en la actualzacion
             var padreUsr = $("#jb_lista_usuarios_click div");
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
            var f = form+"&op=2&selec=1&iduser="+idus+"&idre="+idre+"&idt="+idtag+"&usrdi="+usrid;
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
            var f = "op=4&selec=17&idp="+id+"&idre="+$("#idreunion").val();
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
            var f = "op=4&selec=18&idt="+id+"&idre="+$("#idreunion").val();
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
    $("#form-w #jb_lista_usuarios_click div").remove();
    $("#form-w #jb_lista_tag_click div").remove();
    $("#form-w #jb_etiquetas").css({"display":"none"});
    $("#form-w #jb_list_user").css({"display":"none"});
    $("#form-w #adduser_w").val("");
    $("#form-w #datepicker3").val("");
    $("#form-w #w-addtag").val("");
    $("#form-w #notas-w").val("");

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
    $("#form-w #jb_lista_tag_click div").remove();
    $("#jb_lista_usuarios_click div").remove();
    $("#topiclayer").css('display', 'none');
    $("#jb_lista_tag_click div").remove()

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
function savetag()
{
    //e.preventDefault();
    if($("#idus").length!==""){
        var titulo = $("#nombreTag").val();
        var tipo   = $("#tipoEtiqueta").val();
        var iduser = $("#idus").val();
        var txt = "op=2&selec=3&ti="+titulo+"&tipo="+tipo+"&idus="+iduser;
        var ruta ="funciones/funciones.php";
        $.post(ruta,txt, function(data){
           //alert(data);
           if(data!=""){
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
      form+='</select></div><input type="button" onclick="savetag();" value="Guardar" id="saveEtiqueta">';
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
            $.each(list, function(i, t) {
                html+='<li class="list_meeting_active">';
                html+='<label>'+t.texts+'</label>';
                html+='<div id="tomas'+t.ids+'">';
                html+='<ul class="notas">';
                  var res = t.resoluciones;
                   $.each(res, function(p,r){
                        html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                   });
                html+="</ul>";
                var arch = t.archivos;
                html+="<div class='archivos'><ul>";
                $.each(arch, function(k,a){
                    if(isImage(a.tipo)){
                        html+="<li style='list-style: outside none none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                    }else{
                        html+="<li style='list-style: outside none none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                    }
                });
                html+="</ul></div>";

                html+='</div>';
                html+='<div id="txt_'+t.ids+'" class="menu_list_active">';
                html+='<textarea id="textolist_activ_'+t.ids+'" onclick="block_oplits('+t.ids+')" name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div class="opciones_list_activ_'+t.ids+'" style="display:none"><div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" action="" method="post" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo: </label>';
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_meeting_act" class="up_acrh"/></span><input type="button" id="arch_reunAct" onclick="uparchivo(1,'+t.ids+','+v.idre+');"value="Agregar" />';
                html+='</form><div class="mensaje"></div><div class="showImage"></div></div>';
                html+='<div class="bar_menu_list"><div><label>Guardar Como: </label><input type="button" value="Nota" onclick="save_accionlist('+t.ids+',\'nota\')"/><input type="button" value="Decision" onclick="save_accionlist('+t.ids+',\'decision\')"/><input type="button" value="Tarea" onclick="save_tarea_display('+t.ids+',\'tarea\')" /></div></div></div>';
                html+='</div>';
               // html+='<ul><li>alguna nota</li></ul>';
                html+='</li>';
            });
            html+='</ul>';
            //html+='<input type="button" value="Guardar" id="SaveTopicNew">';
            html+='</form>';
            html+='</div>';
            html+='</div><form action="#" method="post"><label for="">Nuevo Tema:</label><input type="text"  id="nue_tema_'+v.idre+'"placeholder="Escribe El tema a tratar" /><input type="button" value="agregar" onclick="saveTemaActivre('+v.idre+');"/></form>';
            html+='</div>';
            html+='</div>';


            $("#contenUpop").append(html);
        });


    }).fail(function(){
        alert("Error En El Servidor");
    });

  


}

function saveTemaActivre(idre)
{
    var txt="op=2&selec=5&ti="+$("#nue_tema_"+idre).val()+"&id="+idre;
    //alert(txt);
    var ruta="funciones/funciones.php";
    $.post(ruta,txt, function(data){
        if (data!=""){
            genListReunActv(idre);
        }
            
    });
}
function genListReunActv(idre)
{
    var txt = "op=1&selec=13&id="+idre+"&idusua="+$("#idus").val();
    var ruta ="funciones/funciones.php";
    if($("#topiclayer_"+idre).length){
        $("#topiclayer_"+idre).remove();
    }
    $.post(ruta, txt, function(data) {
        $.each(data,function(k,v){
        var html='<div id="topiclayer_'+idre+'" style="display:block">';
            html+='<h3>Temas a tratar</h3>';
            html+='<form action="">';
            html+='<ul>';
            var list = v.lista;
            $.each(list, function(i, t) {
                html+='<li class="list_meeting_active">';
                html+='<label>'+t.texts+'</label>';
                html+='<div id="tomas'+t.ids+'">';
                html+='<ul class="notas">';
                  var res = t.resoluciones;
                   $.each(res, function(p,r){
                        html+='<li class="list_'+r.tipo+'">'+r.texto+'</li>';
                   });
                html+="</ul>";
                
                    var arch = t.archivos;
                html+="<div class='archivos'><ul>";
                    $.each(arch, function(k,a){
                        if(isImage(a.tipo)){
                            html+="<li style='list-style: outside none none; display: inline;' ><img src='"+a.liga+"' alt='70' width='80' /></li>";    
                        }else{
                            html+="<li style='list-style: outside none none; display: inline;'><a href='"+a.liga+"' rel='ignore' role='menuitem'><span class='icon'>m</span></a></li>";
                        }
                    });
                html+="</ul></div>";
                html+='</div>';
                html+='<div id="txt_'+t.ids+'" class="menu_list_active">';
                html+='<textarea id="textolist_activ_'+t.ids+'" onclick="block_oplits('+t.ids+')" name="textolist_activ" class="Titulo-topic txtlist_activ" placeholder="Escribe Una Nota, Decicion O Actividad" rows="1"></textarea>';
                html+='<div class="opciones_list_activ_'+t.ids+'" style="display:none"><div style="border-top: 1px solid;border-bottom: 1px solid;">';
                html+='<form enctype="multipart/form-data" action="" method="post" class="formulario_meetin_act"><label style="font-size: 0.6em;">Agregar Archivo: </label>';
                html+='<span class="icon" style="font-size: 2em; margin: 7px;cursor: pointer;overflow: hidden;width: 10px;">Ø<input name="archivo" type="file" id="archivo_meeting_act" class="up_acrh"/></span><input type="button" id="arch_reunAct" onclick="uparchivo(1,'+t.ids+','+v.idre+');"value="Agregar" />';
                html+='</form><div class="mensaje"></div><div class="showImage"></div></div>';
                html+='<div class="bar_menu_list"><div><label>Guardar Como: </label><input type="button" value="Nota" onclick="save_accionlist('+t.ids+',\'nota\')"/><input type="button" value="Decision" onclick="save_accionlist('+t.ids+',\'decision\')"/><input type="button" value="Tarea" onclick="save_tarea_display('+t.ids+',\'tarea\')" /></div></div></div>';
                html+='</div>';
                html+='</li>';
            });
            html+='</ul>';
            html+='</form>';
            html+='</div>';
            $("#newtopic_"+idre).append(html);
            
        });
    });

}
///mostramos las opciones de los elementos de laslistas activas
function block_oplits(id)
{
    $(".opciones_list_activ_"+id).css({"display":"block"});
}


//function guardamos la accion de la lista 
function save_accionlist(id,txt)
{
    var txto="op=2&selec=14&id="+id+"&tipo="+txt+"&text="+$("#textolist_activ_"+id).val();
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

//////funcion para visualisas las notas en la reunion de los temas
function show_listreunion(id)
{
    var txto="op=1&selec=21&id="+id;
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


//function guardamos la accion de la lista 
function list_tareasAct(id)
{
    var txto="op=1&selec=19&id="+$("#idus").val();
    var ruta = "funciones/funciones.php";
    $.post(ruta, txto, function(data){
       
       $.each(data, function(k,v){
            var htm='<li class="list_'+v.tipo+'">'+v.texto+'</li>';
       });

       $("#tomas"+id).append(htm);

    }).fail(function(){ alert("Fallo Servidor");});
}

//funcionas para asignar la tarea en la lista de la reunion activa
function save_tarea_display(id,txt){
    var txto = $("#textolist_activ_"+id).val();
    $("#txt_"+id+" div").hide();
    $("#txt_"+id+" textarea").hide();
        
        var htmlp='<div id="form_tarea_tema"class="form_usr_w_asing"><form action="#" method="post"><label for="">nombre de la tarea</label><input type="text"  name="titulo-w" value="'+txto+'"/>';
            htmlp+='<label for="">fecha</label><input type="text" id="datepicker4" name="fecha" placeholder="fecha limite" ><label for="">usuario</label><input type="text" id="adduser_listact" onkeyup="share_usuarios(this.value);" />';
            htmlp+='<div id="jb_list_user" class="list-share list-meeting" style="display:none;z-index: 2;"></div><div class="listaUsuarios listusract" id="jb_lista_usuarios_click" style="display: block;"></div>';
            htmlp+='<div class="chkmail-w"><label for="">Mail:</label><div class="slideThree"><input type="checkbox" id="slideThree" name="mailsend" value="1" /><label for="slideThree"></label></div> </div><input type="button" id="sav_asing_w" value="Asignar Tarea" onclick="save_asing_wActv();" style="display:inline;margin-left: 1em;width: 20%;" /><input type="button" value="Cancelar" onclick="cancel_asing_wAct();" style="display:inline;margin-left: 1em;width: 20%;"/></form></div>';
            
    $("#txt_"+id).append(htmlp);
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
               html+='<div class="notas-w">Nota: '+v.nota+'</div>';
               html+='</div>';
               html+='<div class="btn_down"  onclick="showtarw('+v.idactw+',0);"><span class="icon" >:</span></div>';
               html+='<div class="btn_del" onclick="w_fin('+v.idactw+','+idus+')"><span class="icon">Â</span></div>';
               html+='<div id="comn_tareas_'+v.idactw+'" class="coment_w"><label for="">Comentario:</label><input type="text" placeholder="escribe algun comentario" />';
               html+='<div class="mensaje" style="margin-top: 2em;font-size: 0.81em; width: 31%; overflow: hidden; position: relative; float: right;"></div>';
               html+='<div style="width: 25%; display: inline-block;"><label for="">mail:</label><input type="checkbox" id="mail-w" name="mailsend" value="1" />';
               html+='</div>';
               html+='<div class="uparch_w"><form  enctype="multipart/form-data" id="arch_upw_tar_'+v.idactw+'" action="" method="post" accept-charset="utf-8">';
               html+='<label class="up-archivo">Agregar archivo<input name="archivo" type="file" id="archivo_tareasw" class="up_acrh"/></label><span id="arch_reunAct" class="icon" onclick="uparchivo(3);" style="font-size: 2em; margin-left: 0.4em;">n</span>';
               html+='</form></div><input type="button" value="Agregar" onclick="savecomen_actw('+v.idactw+',0)"/></div>';
               html+='<div id="segmain_'+v.idactw+'" class="w-segundo-main">';
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
                    if(isImage(a.tipo)){
                        html+='<li><img src="'+a.liga+'" alt="50" width="50" /></li>';
                    }else{
                        html+='<li><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
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
    var tx = "selec=10&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
        $.post(ruta,tx,function(data){
            if ($("#incl_list_act .post-w").length) {
                    $("#incl_list_act .post-w").remove();
            }
             $.each(data,function(k,v){
            var html='<div id="'+v.idw+'" class="post-w">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">Nota: '+v.nota+'</div>';
               html+='</div>';
               html+='<div class="btn_down" onclick="showtarw('+v.idw+',1);"><span class="icon">:</span></div>';
               if(idus==v.idprop){
                    html+='<div class="btn_del"><span class="icon">Â</span></div>';
               }
               html+='<div id="comn_actividad_'+v.idw+'" class="coment_w"><label for="">Comentario:</label><input type="text" placeholder="escribe algun comentario" />';
               html+='<div><label for="">mail:</label><input type="checkbox" id="mail-w" name="mailsend" value="1" />';
               html+='</div><input type="button" value="Agregar" onclick="savecomen_actw('+v.idw+',1)"/></div>';
               html+='<div id="seg_main_'+v.idw+'" class="w-segundo-main">';
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
               //////////////////////////////////////////////no me genera los demas siendo null erro
                $.each(arch,function(k,a){
                    if (a.tipo!="") {
                        if(isImage(a.tipo)){
                            html+='<li><img src="'+a.liga+'" alt="50" width="50" /></li>';
                        }
                    }else{
                        html+='<li><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
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
    var tx = "selec=11&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
        $.post(ruta,tx,function(data3){
            if ($("#incl_list_Wcomplet .post-w").length) {
                $("#incl_list_Wcomplet .post-w").remove();
            }

            $.each(data3,function(k,v){
            var html='<div class="post-w">';
               html+='<img src="" alt="una imagen" height="50" width="80">';
               html+='<div class="post-w-head">';
               html+='<h4>'+v.titulo+'</h4>';
               html+='<div class="post-w-date">'+v.fecha+'</div>';
               html+='<div class="post-w-user">'+v.usuario+'</div>';
               html+='<div class="notas-w">Nota: '+v.nota+'</div>';
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
                    if(isImage(a.tipo)){
                        html+='<li><img src="'+a.liga+'" alt="50" width="50" /></li>';
                    }else{
                        html+='<li><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
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
        var txt= form+"&op=2&selec=7&id="+id+"&idt="+idtag+"&idp="+usrid;
        alert(txt);
         var ruta="funciones/funciones.php";
        $.post(ruta,txt, function(data){
        alert(data);
        if(data!=""){
            showactividades();
            genlistactv();
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
        $("#incl_list_act #"+idw).remove();
        genlistend();
    }

  }).fail(function(){
    alert('Error en el servidor.');
  });
}







///guardamos la tarea asiganda de una reunion
function save_asing_wActv()
{
    //jalamos los ids de los usuarios participantes
    var padreUsr = $("#form_tarea_tema #jb_lista_usuarios_click div");
    var usrid="";
    $.each(padreUsr, function() {
        var idusr= $(this).attr("id").replace("user_selected_","");
        usrid += idusr+',';
    });
    usrid+=0;

        var form = $("#form_tarea_tema form").serialize();
        var id = $("#idus").val();
        var txt= form+"&op=2&selec=7&id="+id+"&idp="+usrid;
       // alert(txt);
         var ruta="funciones/funciones.php";
        $.post(ruta,txt, function(data){
               if(data!=''){
                $("#form_tarea_tema").remove();
                var id = $("[id^=txt_]").attr('id').replace("txt_","");
                $("#txt_"+id+" div").show();
                $("#txt_"+id+" textarea").show();
                $("#textolist_activ_"+id).val("");
                //save_accionlist(id,"tarea");
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
    var txt = "op=2&selec=22&comen="+comn+"&mail="+mail+"&idus="+$("#idus").val()+"&idw="+id;
    var ruta = "funciones/funciones.php";
    $.post(ruta,txt, function(data){
        if(data!=""){
            showtarw(id,op);
            if(op==0){
                genLisTarea(id);
            }
            if (op==1){
                genLitsAct(id);
            }
        }
    });

}

///genermaos el listado del segundo main dentro de las tareas
function genLisTarea(idw)
{
    var idus = $("#idus").val();
    var tx = "selec=9&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
         if ($("#"+idw+" #segmain_"+idw+" div").length) {
                 $("#"+idw+" #segmain_"+idw+" div").remove();
       }

        $.each(data,function(k,v){
               var html='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
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
                    if(isImage(a.tipo)){
                        html+='<li><img src="'+a.liga+'" alt="50" width="50" /></li>';
                    }else{
                        html+='<li><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
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
               $("#"+idw+" #segmain_"+idw).append(html);
        });
    });

}

///generamos la listado de segundo main ara todas las accctividades
function genLitsAct(idw)
{
    var idus = $("#idus").val();
    var tx = "selec=10&op=1&idusua="+idus;
    var ruta = "funciones/funciones.php";
    $.post(ruta,tx,function(data){
            if ($("#"+idw+" #seg_main_"+idw+" div").length) {
                 $("#"+idw+" #seg_main_"+idw+" div").remove();
       }

        $.each(data,function(k,v){
            /*   var html='<div class="listUserw"><label for=""><span class="icon">L</span>Usuarios asignados: </label><ul>';
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
                    if(isImage(a.tipo)){
                        html+='<li><img src="'+a.liga+'" alt="50" width="50" /></li>';
                    }else{
                        html+='<li><a href="'+a.liga+'"><span class="icon">Ø</span></a></li>';
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
               $("#"+idw+" #seg_main_"+idw).append(html);*/
        });
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
           
                 $("#topiclayer_"+id+" #topiclist").remove();
                 $("#topiclayer_"+id+" form ul").prepend(datas);
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
        $("#adduser-w").hide();
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

    $('body').on('click', '.click', function(){  
        var id = $(this).attr('id');
        alert(id);
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
            $("#jb_lista_tag_click").append("<div id='tag_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='tag_remove_"+id+"'>X</span></div>");
            $("#id_tag_is_"+id).slideUp();
            $("#form-w #jb_etiqueta_reun").val('');
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
            $("#jb_lista_usuarios_click").append("<div id='user_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_is_"+id).slideUp();
            $("#form-w #meeting-user-share").val('');
            $("#form-w #jb_list_user").hide();
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






// seccion de busqueda de usuarios en las reuniones activas 

function share_usuarios(search){
   //si la caja de texto esta vacia eliminamos la lista
        if($.trim(search) == '')
        {
            $("#form_tarea_tema #jb_list_user").hide();
        }

        //si la caja de texto contiene algo 
        if($.trim(search) !== '')
        {
           
            $("#form_tarea_tema #jb_list_user").show();
            if($("#form_tarea_tema #jb_list_user ul").length == 0)
            {
                var htmlUl='<ul id="jb_ul_data_user"><ul>';
                $("#form_tarea_tema #jb_list_user").append(htmlUl);
                $("#form_tarea_tema #jb_list_user #jb_ul_data_user ul").remove();
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
                            var htmlLi = '<li id="id_user_is_'+id+'">'+nombre+'</li>';
                            if($("#id_user_is_"+id).length == 0 && $("#user_selected_"+id).length == 0)
                                $("#jb_ul_data_user").prepend(htmlLi);
                        }
                    }
                    else
                    {
                        if($("#id_user_is_"+id).length)
                                $("#id_user_is_"+id).remove();
                    }

              });
        }
        
}


$(document).on("ready",function()
{
    ///al ace el click en el campo nos egenera el listado en el div jb_lista_usuarios_click
    $('body').on('click', '.click', function(){  
            var id = $(this).attr('id');

         if($("#selected_"+id).length == 0)
            $("#form_tarea_tema #jb_lista_usuarios_click").append("<div id='selected_"+id+"' class='list_asociada'>"+$("#"+id).text()+"</div>");
    });

    ///hacemos le post para usuarios
    $("body").on('click', '#adduser_listact', function(){

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

       /// seccion para la lista de usuarios 
    $("body").on('click', '[id^=id_user_is_]', function(){
        var id = $(this).attr("id").replace("id_user_is_","");
        

        if($("#form_tarea_tema #jb_lista_usuarios_click #user_selected_"+id).length == 0)
        {
            $("#form_tarea_tema #jb_lista_usuarios_click").append("<div id='user_selected_"+id+"' class='list_asociada'>"+$(this).text()+" <span id='user_remove_"+id+"'>X</span></div>");
            $("#id_user_is_"+id).slideUp();
            $("#form_tarea_tema  #adduser-w").val('');
            $("#form_tarea_tema #jb_list_user").hide();
        }

    });
    //removemos los usuarios registrados 
    $("body").on('click', '[id^=user_remove_]', function(){
        var id = $(this).attr("id").replace("user_remove_","");
        if($("#user_selected_"+id).length)
            $("#user_selected_"+id).remove();
            $("#jb_ul_data_user #id_user_is_"+id).slideDown();

    });
});


//cargamos los archivos y mostramos si son imagenes en la opcion de reuniones
$(document).on("ready", function(){

    $("body").on("click","[id^=txt_]",function(){

        var id = $(this).attr('id').replace("txt_","");
        //$(".mensaje").hide();
         //queremos que esta variable sea global
        var fileExtension = "";
        $('#txt_'+id+' :file').change(function (event)
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
                        showMessage("<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>");
                  }else{
                     showMessage("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>");
                     //$("#arch_reunAct").attr("style","color:#1A72D4;");
                     //$("#arch_reunAct").fadeOut(100);
                     //$("#arch_reunAct").fadeIn(100);
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

    });

});

//cargamos el archivo para la opcion de tareas
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
                        showMessage("<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>");
                  }else{
                     showMessage("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>");
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

//cargamos los archivos para la opcion de tareas
$(document).on("ready", function(){

     $("#archivo_tareasw").on("click",function(){
        var fileExtension = "";
        $(':file').change(function (event)
        {
            //obtenemos un array con los datos del archivo
            var file = $("#archivo_tareasw")[0].files[0];
            var fileName = file.name;
            //obtenemos la extensión del archivo
            fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
            var fileSize = file.size;
            var fileType = file.type;
            alert(fileName);
            var msg="";
            fileSize =(fileSize / (1024*1024)).toFixed(2);

                  if(fileSize > 4){
                        var inpu= $('#archivo_tareasw');
                        inpu.replaceWith(inpu.val('').clone(true));
                       msg="<span class='info'>Archivo para subir: Es muy grande \"limite de carga por archivo 4m.b\"</span>";
                       $(".coment_w .mensaje").append(msg);
                  }else{
                     msg="<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" Mbytes.</span>";
                     $(".coment_w .mensaje").append(msg);
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
});

function uparchivo(op,id,idre){
 //al enviar el formulario
        //información del formulario
     
        var inputFile = document.getElementById("archivo_meeting_act");
        if(inputFile!=="")
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
                        mensaje = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                        showMessage(mensaje)        
                    },
                    //una vez finalizado correctamente
                    success: function(data){
                        mensaje = $("<span class='success'>La imagen ha subido correctamente.</span>");
                        if(op==1){
                            savedbarch(id,idre,data,fileExtension);
                        }
                        if(op==2){
                            $("#arch_reunAct").removeClass('resaltado');
                            $("#arch_reunAct").css({
                                display: 'inline',
                                color: '#135D58'
                            });
                            preparesave(data,fileExtension);
                        }
                        showMessage(mensaje);
                    },
                    //si ha ocurrido un error
                    error: function(){
                        mensaje = $("<span class='error'>Ha ocurrido un error.</span>");
                        showMessage(mensaje);
                    }
                });
        }else{
            mensaje = $("<span class='erro'>Seleccione un archivo</span>");
            showMessage(mensaje);
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
    switch(extension.toLowerCase()) 
    {
        case 'jpg': case 'gif': case 'png': case 'jpeg':
            return true;
        break;
        case 'null':
            return false;
        break;
        default:
            return false;
        break;
    }
}

//guardamos el arch en la bd
function savedbarch(id,idre,data,tipo)
{
    var liga="";
    $.each(data,function(k,v){
        liga+=v+"/";
    });
    liga=liga.substring(0, liga.length-1);
    liga=liga.substring(3, liga.length);
    var txt = "op=2&selec=20&id="+id+"&idre="+idre+"&dir="+liga+"&tipo="+tipo+"&idus="+$("#idus").val();
    var ruta= "funciones/funciones.php";
    $.post(ruta,txt,function(data){
       if (data!="") {
            show_listreunion(id);
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


