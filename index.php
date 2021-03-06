<!DOCTYPE html>
<?php session_start();?>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Actividades y Reuniones</title>
    <link rel="stylesheet" href="css/color.css">
    <link rel="stylesheet" href="css/normalize.css">
    <script src="js/jquery-1.11.1.min.js" type="text/javascript" charset="utf-8"></script> 
    
    <link rel="stylesheet" href="css/jquery-ui.css">
    <script src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.timepicker.js"></script>
    <link rel="stylesheet" type="text/css" href="css/jquery.timepicker.css" />

    <script src="js/funciones.js" type="text/javascript" charset="utf-8" ></script> 
    <script src="js/prefixfree.min.js" type="text/javascript" charset="utf-8"></script> 

</head>
<body>

<div id="manager">
    <div class="header_bar">
        <div class="btn_mng">
            <div class="btn-Re">
                <a href=""><span class="icon">K</span>Reunion</a>
            </div>
             <div id="show_act" class="btn-Ac">
                 <a href="#"><span class="icon">Ñ</span>Actividades</a>
            </div>
         </div>
        <div class="loger">
        <?php if ($_SESSION['logge'] == true) {
            ?>
                <div class="session">
                    <label for=""><?php echo $_SESSION['nombre'];?></label>
                    <input type="hidden" id="idus" value="<?php echo $_SESSION['iduser'];?>">
                    <input type="button" value="salir" id="logend" onclick="logend();">
                </div>
            <?php
        }else {?>
            <form action="index.php" method="post" id="logform">
                <label for="">usuario:</label><input type="text" id="usuario" size="10" name="usuario">
                <label for="">Contrasena:</label><input type="password" id="pass" size="10" name="pass">
                <input type="button" value="Entrar" id="logint" onclick="loger();">
            </form>
        <?php }?>
        </div>
        <hr>
        <?php if ($_SESSION['logge'] == true) {
            ?>
        <div class="new_meeting" >
            <div id="N_meeting" class="N-Reu"><span class="icon ">]</span>Nueva Reunion</div>
            <div id="Nw_tareas"class="N-Tar"><span class="icon ">Ü</span>Nueva Tarea</div>
            <div class="share"><span class="icon">z</span><input type="text" onkeyup="busquedaSimpleSearch(this.value);" name="" value="" placeholder="Escribe aqui"></div>
        </div>
        <?php }?>
    </div> 
        <?php if ($_SESSION['logge'] == true) {
            ?>
      <div class="main-home"> 
        <div class="meeting_left" id="reunionesOk">
            <h3>Nuevas Reuniones</h3>
            <div  id="showTopic"  class="conten-reuniones">

            </div>   
        </div>
        <div class="meeting_rigth" id="reunionespas">
          <h3>Antiguas Reuniones</h3>
            <div id="showlisendreuniones"class="conten-reuniones">
            </div>  
        </div>
      </div>
<?php } else{?>
<div>
    <label for="">JARBOSS REUNIONES <p>un lugar para organizarte.</p></label>
</div>

<?php }?>
    <div class="meeting_new" style="display:none">
        <div class="form_reun">
            <form action="index_submit" id="form_reunion_new" method="post" accept-charset="utf-8">
                <input type="text" name="nom_reunion" class="meetingTitulo" value="" placeholder="Escribe el nombre de la reunion">
                <div id="meetingShow"></div>
              <h4>Nueva Reunion</h4>
                <label><p>Etiquetas:</p><input type="text" name="etiquetas" id="jb_etiqueta_reun" value="" placeholder="Escribe las etiquetas"></label><!--<span id="tagNew" >Nueva Etiqueta</span>-->
                        <div id="jb_etiquetas"class="list-share list-meeting" style="display: none; z-index: 2;">
                           
                            <div>
                                <label id="tagNew-n" >Crear Etiqueta</label><br />
                                <label for="">Admin. Etiqueta</label>
                            </div>
                        </div>
                        <div class="listaUsuarios" id="jb_lista_tag_click_re" style="display: none;"></div>
                        <label><p>Lugar:</p><input type="text" name="lugar" value="" placeholder="Escribe el lugar del evento"></label>
                        <label><p>Participantes:</p><input type="text" id="meeting-user-share" name="participantes" value="" placeholder="Escribe el nombre de los participantes"></label>
                        <div id="jb_list_user" class="list-share list-meeting" style="display: block; z-index: 1;"></div>
                        <div class="listaUsuarios" id="jb_lista_usuarios_click_re" style="display: block;"></div>
                <div class="meeting_time">
                    <label><p>Fecha Inicio:</p><input type="text" id="datepicker" name="fecha_in" ></label>
                    <label><p>Hora:</p><input id="basicExample" type="text" name="horaint" class="time"></label><br>
                    <label><p>Fecha Fin:</p><input type="text" id="datepicker2" name="fecha_out"></label>
                    <label><p>Hora:</p><input id="basicExample2" name="horaout" type="text" class="time"></label><br>
                </div>
                <input type="button" value="Guardar" id="new_save_meeting">
            </form>
            <div id="newtopic" class="topicAgregar">
                <div id="topiclayer" style="display:none">
                <h3>Temas a tratar</h3>
                    <form action="">
                        <ul>
                            <li>
                                <textarea id="tiTuloTopic" name="tituloTopic" class="Titulo-topic" type="text" placeholder="Escriba el titulo de su tema" rows="1"></textarea>
                            </li>
                        </ul>
                        <input type="button" value="Guardar"  id="SaveTopicNew">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="capatrans" class="capaover">
        <div id="contenUpop"><div id="closeUpop">X</div>
            <div class="etiquetas">
                 <div class="head_etique">
                    <h3>Administrador de  <span>Etiquetas,</span><span>Departamentos,</span><span>Proyectos.</span></h3>    
                 </div>
                 <div class="cuerpo_tag">
                    <div class="menu_tag">
                        <ul>
                            <li onclick="tag_sel(1);">Etiquetas</li>
                            <li onclick="tag_sel(2);">Departamentos</li>
                            <li onclick="tag_sel(3);">Proyectos</li>
                        </ul>
                    </div>
                     <div class="tag_izq">
                        <div class="tag_new_tag" >
                            <label for=""><a id="tagselec" onclick="tagNewclik();">Nueva Etiqueta</a></label>
                        </div>
                        <div class="tag_izq_depa"  id="listEtiqueta_depa" style="display: none">
                            <label for="">Departamentos</label>
                        </div>
                        <div class="tag_izq_proy"  id="listEtiqueta_proy" style="display: none">
                            <label for="">Proyectos</label>
                        </div>
                        <div class="tag_izq_tag" id="listEtiqueta" style="display: block">
                            <label for="">Etiquetas</label>
                            
                        </div>
                     </div>
                     <div class="tag_der">
                          <div id="tag_etiqueta"  style="display:block" >
                             <form action="#" >
                                 <div><label for="">Titulo:</label> <input type="text" name="tituloTag" id="nombreTag"></div>
                                 <div><label for="">Tipo de Etiqueta:</label>
                                     <select id="tipoEtiqueta">
                                        <option value="Normal">Normal</option>
                                        <option value="Departamento">Departamento</option>
                                        <option value="Proyecto">Proyecto</option>
                                    </select>
                                 </div>
                                <input type="button" value="Guardar" onclick="savetag();" id="saveEtiqueta">
                             </form>
                         </div>
                         <div id="tag_departamentos" style="display:none" >
                             <form action="#" method="post" id="formdepa">
                                 <div><label for="">Titulo:</label> <input type="text" name="nombreDepa" id="nombreDepa" style="width: 45%;"></div>
                                 <div><label for="">Miembros:</label> <input type="text" name="miembros" id="miembros" style="width: 45%;" onkeyup="busqueda_usuarios_depyproy(this.value,1);"></div>

                        <div id="jb_list_user_departamentos" class="list-share list-usr-depa" style="display: block; z-index: 2;"></div>
                        <div class="listaUsuarios" id="jb_lista_usuarios_click_depa" style="display: block;"></div>
                                <input type="button" onclick="savedepa();" value="Guardar" id="saveDepa">
                             </form>
                         </div>
                         <div id="tag_proyectos" style="display:none">
                             <form action="#" method="post" id="formproy" >
                                 <div><label for="">Titulo:</label> <input type="text" name="nombreProy" id="nombreProy"  style="width: 45%;"></div>
                                 <div><label for="">Miembros:</label> <input type="text" name="miembros" id="miembrosproy"onkeyup="busqueda_usuarios_depyproy(this.value,2);"  style="width: 45%;" ></div>
                                 <div id="jb_list_user_proyect" class="list-share list-usr-depa" style="display: block; z-index: 1;"></div>
                                <div class="listaUsuarios" id="jb_lista_usuarios_click_proyect" style="display: block;"></div>
                                <input type="button" onclick="saveproy();" value="Guardar" id="saveProy">
                             </form>
                         </div>
                     </div>
                 </div>
            </div>

        </div>
    </div>
<?php if ($_SESSION['logge'] == true){ ?>


<div class="tareas" style="display: none;">

    <div class="cuerpo-tareas" style="display:block">
        <div class="tareasIdeas">
            <div class="head-w"><h3><span class="icon">Û</span>Tareas(Ideas por Realizar)</h3></div>
            <div id="incl_list_tareas"> 
               <div class="post-w">
               
                </div>
               
            </div>
        </div>
        <div class="tareasPend">
            <div class="head-w"><h3><span class="icon">Ñ</span>Actividades por Realizar</h3></div>
            <div id="incl_list_act"> 
                 <div class="post-w">
                    
                </div>
            </div>
        </div>
        <div class="tareasCompletas">         
            <div class="head-w"><h3><span class="icon">x</span>Tareas Completadas</h3></div>
            <div id="incl_list_Wcomplet"> 
                <div class="post-w">
                  
                </div>
            </div>
        </div>
    </div>
    <div class="new-w"  style="display:none;">
        <div class="head-w">
            <h3>Nueva Tarea</h3>
        </div>
        <div>
            <form id="form-w" action="" style="padding-left: 0.5em; padding-bottom: 1em;">
                <textarea name="titulo-w" class="Titulo-topic titulo-w" placeholder="Titulo de la Tarea"></textarea>
                <div class="w-cuerpo-main">
                    <label for="">Propietario:</label>
                    <input type="text" name="propietario" value="<? echo $_SESSION['nombre']?>"placeholder="El propietario">
                    <div class="chkmail-w">
                        <label for="">mail:</label>  
                        <div class="slideThree">  
                             <input type="checkbox" id="slideThree" name="mailsend" value="1" />
                             <label for="slideThree"></label>
                         </div>
                    </div><br>
                    <label id="w-adduser" class="up-archivo" style="cursor:pointer">Asignar Tarea</label>
                    <input type="text" id="adduser-w" name="tareausuarios" placeholder="Agrega el Usuario" style="display:none;transition: all 0.4s ease;">
                    <div id="jb_list_user"class="list-share list-meeting" style="display:none;">
  
                    </div>
                    <div class="listaUsuarios" id="jb_lista_usuarios_click" style="display: block;"></div>
                    <br>
                    <label for="">Fecha limite:</label>
                    <input type="text" id="datepicker3" name="fecha_limite" placeholder="fecha limite"><br>
                    <label for="">Proyectos / Etiquetas:</label>
                    <input name="etiquetas" id="w-addtag"type="text" placeholder="Agrega las etiquetas">    
                        <div id="jb_etiquetas" class="list-share list-w" style="display: block; z-index: 2;">
                            <div>
                                <label id="tagNew" for="">Crear Etiqueta</label><br />
                                <label for="">Admin. Etiqueta</label>
                            </div>
                        </div>
                    
                    <div class="listaUsuarios" id="jb_lista_tag_click" style="display: block; z-index: 1;"></div>

                    <br>
                    <label for="">Notas:</label>
                    <input name="notas" id="notas-w" type="text" placeholder="Escribir alguna nota sobre la actividad"><br>
                    <form  enctype="multipart/form-data" id="arch_upw" action="" method="post" accept-charset="utf-8">
                        
                    <label class="up-archivo">Agregar archivo<input name="archivo" type="file" id="archivo_meeting_act" class="up_acrh"/></label><span id="arch_reunAct" class="icon" onclick="uparchivo(2);">n</span>
                    
                    </form>
                    <div class="mensaje" style="position: relative; font-size: 0.81em; top: 2em; margin-top: 1em;"></div>
                    <div class="showImage" style="width: 31%; height: 150px; top: -3em;"></div>
                    <input type="button" name="guardar" id="save-w" value="Guardar">
                </div>
            </form>
        </div>
    </div>

</div>
<div id="jb_result_tags" style="display:none;"></div>
<div id="jb_result_users" style="display:none;"></div>
<div id="jb_desplega_info"></div>
    
<?php } ?>
</div>
    
</body>
</html>