<?
include 'acciones.php';


$selec = $_POST['selec'];
///guardamos la primer reunnion
if ($selec == 1){
     $id_reun    = trim($_POST['idre']);
     $tituloRe   = trim(stripslashes($_POST['nom_reunion']));
     $etiqeuta   = $_POST['etiquetas'];
     $lugar      = trim(stripslashes($_POST['lugar']));
     $iduser     = trim($_POST['iduser']);
     $fechain    = str_replace("%2F","-" , $_POST['fecha_in']);  
     $dia1       = substr($fechain, 0, 2);  
     $mes1       = substr($fechain, 3,2);
     $year1      = substr($fechain,-4); 
     $fechain    = $year1.'-'.$mes1.'-'.$dia1;
     $fechaout   = str_replace("%2F","-" , $_POST['fecha_out']);    
     $dia2       = substr($fechaout, 0, 2);  
     $mes2       = substr($fechaout, 3,2);
     $year2      = substr($fechaout,-4); 
     $fechaout    = $year2.'-'.$mes2.'-'.$dia2;
     $horain     = str_replace("%3A",":" , $_POST['horaint']);    
     $horaout    = str_replace("%3A",":" , $_POST['horaout']); 
     $idetag    = trim($_POST['idt']);
     $ideusuarios = trim($_POST['usrdi']);

        $dbreg = new Registros;

        if ($id_reun != ""||$id_reun != 0)
        {
            $reunion = $dbreg->re_update($tituloRe,$lugar,$iduser,$id_reun);
            $fecha = $dbreg->re_update_fecha($id_reun ,$fechain,$fechaout,$horain,$horaout);
              if ($reunion == 1 && $fecha == 1) {
                   // echo "Se actualizo la Reunion";
                }  
        }
        else
        {
            echo $idreunion = $dbreg->regreunion($tituloRe,$lugar,$iduser);
            $idfech = $dbreg->regfechareu($idreunion,$fechain,$fechaout,$horain,$horaout);
            $dbreg->updatereunion($idreunion,"id_fecha_re",$idfech);
            $dbreg->re_participantesRe($idreunion,$iduser);
            
            $numtag = explode(",",$idetag);
            for ($i=0; $i < count($numtag) ; $i++) { 
                if ($numtag[$i]!=0 ) {
                $dbreg->re_etiquetasRe($idreunion,$numtag[$i]);
                }
            }


            $numuser = explode(",",$ideusuarios);
            for ($i=0; $i < count($numuser) ; $i++) { 
                if ($numuser[$i]!=0 && $numuser[$i]!=$iduser ) {
                  $dbreg->re_participantesRe($idreunion,$numuser[$i]);
                }
            }
            ///$idetiqueta = $dbreg->updatereunion($idreunion,"id_etiqueta",$idetiqueta);
        }

}

//visualisamos la lista de reuniones
if ($selec == 2) {
    header('Content-type: application/json harset=utf-8');
    $server = array();

    $idusuario = trim($_POST['idusua']);
    $val = 1;
    $dbchk = new Reunioneschk;
    $server = $dbchk->chkreunion($idusuario,$val);

   
    $myjson =json_encode($server);
    //$myjson = stripslashes($myjson);
    echo $myjson;
    //echo json_decode($myjson,true);
    //echo json_last_error_msg();

}

//visualisamos lista de reuniones pasadas o terminadas
if ($selec == 12)
{
    header('Content-type: application/json');
    $server = array();

    $idusuario = trim($_POST['idusua']);
    $val = 0;
    $dbchk = new Reunioneschk;
    $server = $dbchk->chkreunion($idusuario,$val);

    //$server = utf8_decode($server);
    $myjson = json_encode($server);
    $myjson = stripslashes($myjson);
    echo $myjson;

}

//registramos las etiquetas
if ($selec == 3) {
    
    $idusua = trim($_POST['idus']);
    $nombre = trim($_POST['ti']);
    $tipo   = trim($_POST['tipo']);

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chketiqueta_espe($nombre,$idusua,$tipo);

    if($datos == 1 )
    {
        echo "ok";
    }else
    {
      $dbreg = new Registros;
      $dato  = $dbreg->regetiqueta($nombre,$tipo,$idusua);
      echo $dato;    
    }
}
///se mueve la reunion a la seccion de finalizadas
if ($selec == 4) {
    
    $idusua = trim($_POST['idus']);
    $idreunion = trim($_POST['id']);
    $valor = trim($_POST['val']);

    $dbupReunion = new Registros;
    $result = $dbupReunion->upReunionFinalizada($valor,$idreunion,$idusua);
    echo $result;

}

//registramos los topicos de la reunion
if ($selec == 5) {
    header('Content-type: application/json charset=utf-8');
    $id = trim($_POST['id']);
    $nombre = trim($_POST['ti']);
    $idus = trim($_POST['idus']);

    $dbreg = new Registros;
    $dato  = $dbreg->regtopico($nombre,$id);
    if($dato != "")
    {
      $dbchk = new Reunioneschk;
      $valor = $dbchk->listadotopic($id,$dato);
      echo json_encode($valor);
    }
}

///busqueda de usuarios
if($selec == 6)
{
    header('Content-type: application/json charset=utf-8');
    $server = array();
    //$plaza = $_POST['place'];

    $dbsha = new Busquedasdb();

     $server = $dbsha->usuariobusqueda();
     echo json_encode($server);
}

//registro de tareas
if($selec == 7)
{
    $titulo = trim($_POST['titulo-w']);
    $mail   = trim($_POST['mailsend']);
    if($mail != 1){$mail = 0;}
    $fecha    = str_replace("%2F","-" , $_POST['fecha_limite']);  
     $dia1       = substr($fecha, 0, 2);  
     $mes1       = substr($fecha, 3,2);
     $year1      = substr($fecha,-4);
     $fechafin    = $year1.'-'.$mes1.'-'.$dia1;
    $etiquetas = trim($_POST['idt']);
    $participant = trim($_POST['idp']);
    $notas = trim($_POST['notas']);
    $iduser = trim($_POST['id']);
    $files = trim($_POST['files']);
    $extension = trim($_POST['extension']);
    $idcom = 0;
    $addusertarea = $_POST['tareausuarios'];

    $regW= new Registros;
    $reg1= $regW->regtareasActv($titulo,$fechafin,$notas,$mail,$iduser);///registramos los datos de la actividad
    $regW->reg_usrasing($reg1,$iduser);//registramos los usuarios asignados
   $arch= $regW->regarch_actividares($extension,$files,$iduser,$reg1,$idcom);

    ///registramos los tag
    if ($etiquetas!="") {  
        $numtag = explode(",",$etiquetas);
            for ($i=0; $i < count($numtag) ; $i++) { 
                if ($numtag[$i]!=0) {
                $regW->reg_tagW($reg1,$numtag[$i]);
                }
            }
    }
      $numuser = explode(",",$participant);
            for ($i=0; $i < count($numuser) ; $i++) { 
                if ($numuser[$i]!=0) {
                $regW->reg_usrasing($reg1,$numuser[$i]);
                }
            }

    echo $arch;

}

//registro de comentarios en las tareas
if($selec == 8)
{
//registramos tareas asignadas por medio de reuniones
    $titulo = trim($_POST['titulo-w']);
   
    $mail   = trim($_POST['mailsend']);
    if($mail != 1){$mail = 0;}
   
    $fecha    = trim($_POST['fecha']);  
     $dia1       = substr($fecha, 0, 2);  
     $mes1       = substr($fecha, 3,2);
     $year1      = substr($fecha,-4);
     $fechafin    = $year1.'-'.$mes1.'-'.$dia1;

    $participant = trim($_POST['idp']);
    $notas = trim($_POST['notas']);
    $iduser = trim($_POST['id']);
    $idtop = trim($_POST['idtop']);
    $idsubtop = trim($_POST['idsubtop']);
    $idre = trim($_POST['idre']);

    $regW= new Registros;
    $reg1= $regW->regtareasActv($titulo,$fechafin,$notas,$mail,$iduser);///registramos los datos de la actividad
    $regW->reg_usrasing($reg1,$iduser);//registramos los usuarios asignados
    
      $numuser = explode(",",$participant);
            for ($i=0; $i < count($numuser) ; $i++) { 
                if ($numuser[$i]!=0) {
               echo $s= $regW->reg_usrasing($reg1,$numuser[$i]);
                }
            }
     $relas = $regW->regreltareasreunionsub($idre,$idtop,$reg1,$idsubtop);

    echo $relas;
}


//generamos la lista de tareas
if($selec == 9 )
{
    header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = trim($_POST['idusua']);

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistarea($idusuario);
    echo json_encode($datos);

}

//generamos la lista de actividades
if($selec == 10)
{
    header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = trim($_POST['idusua']);

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistactividades($idusuario);
    echo json_encode($datos);

}
//generamos las listas de actividades terminadas

if($selec == 11)
{
   header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = trim($_POST['idusua']);

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistend($idusuario);
    echo json_encode($datos);


}


//visualisamos la reunion activa 
if($selec == 13)
{
    header('Content-type: application/json charset=utf-8');
    $server = array();

    $idusuario = trim($_POST['idusua']);
    $idre = trim($_POST['id']);
    $val = 1;
    $dbchk = new Reunioneschk;
    $server = $dbchk->chkreunionactiva($idusuario,$val,$idre);

    //$server = utf8_decode($server);
    $myjson = json_encode($server);
    $myjson = stripslashes($myjson);
    echo $myjson;
}


//registramos las notas o comentarios en la reunion activa 
if($selec == 14)
{

     $id= trim($_POST['id']);
     $idre= trim($_POST['idre']);
     $idus= trim($_POST['idus']);
     $tipo= trim($_POST['tipo']);
     $texto= trim($_POST['text']);

    $dbreg = new Registros;
    $dato  = $dbreg->regNotasLitsReuniones($id,$texto,$tipo);
    if($dato != 0)
    {
      header('Content-type: application/json charset=utf-8');
      $server = array();
      $dbchk = new Reunioneschk;
      $server = $dbchk->chktopic_espe($idre,$idus,$id);

      $myjson = json_encode($server);
      $myjson = stripslashes($myjson);
      echo $myjson;
    }
}

//generamos la busqueda de etiquetas
if ($selec == 15) {
    header('Content-type: application/json charset=utf-8');
    $server = array();
    $flag= 1;    
    $idus= trim($_POST['id']);

    $dbshar= new Busquedasdb;
    $server = $dbshar->busEtique($idus);
    $server2 = $dbshar->busqdepa($idus,$flag);
    $server3 = $dbshar->busqproy($idus,$flag);
    //array_push($server,$server2);
    //array_push($server,$server3);
    echo json_encode($server);
    
}
/////damos de baja una tarea o actividad

if($selec == 16)
{
  $idactv   = trim($_POST['idw']);
  $idusr    = trim($_POST['id']);
  $valor    = 0;

    $dbreg = new Registros;
    $dato  = $dbreg->workfin($valor,$idactv,$idusr);
    echo $dato;
}
//$selec=$_POST['selec'];
///eliminamos los participantes de la reunion guardada
if ($selec == 17) 
{
  $idre = trim($_POST['idre']);
  $idpart = trim($_POST['idp']);

  $dbDell = new Jbdelldb;
  $res = $dbDell->eliminaparticipante($idpart,$idre);
  echo $res;
}
///eliminamos las etiqeutas de la reunion guardada
if ($selec == 18) 
{
  $idre = trim($_POST['idre']);
  $idtag = trim($_POST['idt']);

  $dbDell = new Jbdelldb;
  $res = $dbDell->eliminatagreun($idtag,$idre);
  echo $res;
}


if($selec == 19)
{
  header('Content-type: application/json charset=utf-8');
  $server = array();

  $id= trim($_POST['id']);

  $dbchk= new Reunioneschk;
  $server=$dbchk->chklistactividades($id);
  echo json_encode($server);
}


//guardamos la ruata del archivo en la base dedatos
if ($selec == 20) {
  header('Content-type: application/json charset=utf-8');
  $server = array();
  
  $idtop= trim($_POST['id']);
  $idre= trim($_POST['idre']);
  $idus= trim($_POST['idus']);
  $dir= trim($_POST['dir']);
  $tipo= trim($_POST['tipo']);

  $dbregarch= new Registros;
  $server=$dbregarch->regArchReuniones($idtop,$idre,$idus,$dir,$tipo);
  echo json_encode($server);
}

/// funcion que muestra los comentarios y archivos de la reunion en un tema con el id especifico dle tema
if ($selec == 21) {
  header('Content-type: application/json charset=utf-8');
      $server = array();
     
     $id= trim($_POST['id']);
     $idre= trim($_POST['idre']);
     $idus= trim($_POST['idus']);
     $op= trim($_POST['op']);
     $idsub= trim($_POST['idsub']);

    $dbchk = new Reunioneschk;      
    $server = array();
    if ($op ==1) 
    {
      $server = $dbchk->chktopic_espe($idre,$idus,$id);
    }
    if ($op ==2) {
      $server = $dbchk->sublistadotopicesp($idre,$id);
    }
    
    $myjson = json_encode($server);
    $myjson = stripslashes($myjson);
    echo $myjson;
}

if($selec == 22)
{
  $comen = trim($_POST['comen']);
  $mail = trim($_POST['mail']);
  $idus = trim($_POST['idus']);
  $idw = trim($_POST['idw']);

  if ($mail =="") {
    $mail=0;
  }


  $dbregcomen = new Registros;
  $res=$dbregcomen->regcoment_w($comen,$mail,$idus,$idw);
  echo $res;

  
}

//registramos tareas asignadas por medio de reuniones
if ($selec == 23) {

    $titulo = trim($_POST['titulo-w']);
   
    $mail   = trim($_POST['mailsend']);
    if($mail != 1){$mail = 0;}
   
    $fecha    = trim($_POST['fecha']);  
     $dia1       = substr($fecha, 0, 2);  
     $mes1       = substr($fecha, 3,2);
     $year1      = substr($fecha,-4);
     $fechafin    = $year1.'-'.$mes1.'-'.$dia1;

    $participant = trim($_POST['idp']);
    $notas = trim($_POST['notas']);
    $iduser = trim($_POST['id']);
    $idtop = trim($_POST['idtop']);
    $idre = trim($_POST['idre']);

    $regW= new Registros;
    $reg1= $regW->regtareasActv($titulo,$fechafin,$notas,$mail,$iduser);///registramos los datos de la actividad
    $regW->reg_usrasing($reg1,$iduser);//registramos los usuarios asignados
    
      $numuser = explode(",",$participant);
            for ($i=0; $i < count($numuser) ; $i++) { 
                if ($numuser[$i]!=0) {
               echo $s= $regW->reg_usrasing($reg1,$numuser[$i]);
                }
            }
     $relas = $regW->regreltareasreunion($idre,$idtop,$reg1);

    echo $relas;

}
//generamos la lista de comentarios o etiquetas para  actividades especifica para  cara actividad
if($selec == 24 )
{
    header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = trim($_POST['idusua']);
    $idw= trim($_POST['idw']);

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistareaesp($idusuario,$idw);
    echo json_encode($datos);

}

//generamos la lista de comentarios o etiquetas para  actividades especifica para  cara actividad
if($selec == 25)
{
    header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = trim($_POST['idusua']);
    $idw = trim($_POST['idw']);

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistactividadesp($idusuario,$idw);
    echo json_encode($datos);

}

if($selec == 26)
{
    $iduser = trim($_POST['id']);
    $idw = trim($_POST['idw']);
    $files = trim($_POST['file']);
    $extension = trim($_POST['extension']);
    $idcom = 0;
  $regW= new Registros;
  $arch= $regW->regarch_actividares($extension,$files,$iduser,$idw,$idcom);
  echo $arch;
}


//registramos los topicos de la reunion
if ($selec == 27) {

    $id = trim($_POST['id']);
    $nombre = trim($_POST['ti']);

    $dbreg = new Registros;
    echo $dato  = $dbreg->regtopico($nombre,$id);
  
}


//registramos los sub temas de la  reunion 
if($selec == 28)
{
$texto = trim($_POST['tes']);
$idtopic = trim($_POST['topic']);
$idre = trim($_POST['idre']);
$idus = trim($_POST['idus']);

$dbreg = new Registros;
$datos= $dbreg->regsubtopico($texto,$idre,$idtopic);

  if($datos != "")
  {
     header('Content-type: application/json charset=utf-8');
     $dbchk = new Reunioneschk;
     $valor = $dbchk->sublistadotopic($idre,$idtopic);
     //chktopic($idre,$idus,$id);
      echo json_encode($valor);
  }

}

if($selec == 29)
{
     $id=trim($_POST['id']);
     $idre=trim($_POST['idre']);
     $idus=trim($_POST['idus']);
     $tipo=trim($_POST['tipo']);
     $texto=trim($_POST['text']);

    $dbreg = new Registros;
    $dato  = $dbreg->regsubNotasLitsReuniones($id,$texto,$tipo);
    
    if($dato != "")
    {
      header('Content-type: application/json charset=utf-8');

      $server = array();
      $dbchk = new Reunioneschk;

      $server = $dbchk->sublistadotopicesp($idre,$id);
                        //chksubtopic($id,$idus,$idtop)
      
      $myjson = json_encode($server);
     // $myjson = stripslashes($myjson);
      echo $myjson;
    }
}


if ($selec == 30) 
{
  header('Content-type: application/json charset=utf-8');
  $server = array();
  
  $idtop= trim($_POST['id']);
  //$idsubtop= $_POST['idsub'];
  $idre= trim($_POST['idre']);
  $idus= trim($_POST['idus']);
  $dir= trim($_POST['dir']);
  $tipo= trim($_POST['tipo']);

  $dbregarch= new Registros;
  $server=$dbregarch->regArchReunionessub($idtop,$idre,$idus,$dir,$tipo);
  echo json_encode($server);

}


////registramos los usuarios del departamento 

if ($selec == 31) {

  header('Content-type: application/json charset=utf-8');
  $server = array();
  
  $miembros= trim($_POST['miembros']);
  $idus= trim($_POST['idus']);
  $titulo= trim($_POST['ti']);
  $flag=1;

  $dbchk = new Reunioneschk;
  $rev = $dbchk->chkdepa($titulo,$idus,$flag);

  if($rev == 1)
  {
    echo "ok";
  }
  if($rev != 1)
  {
        $dbregarch= new Registros;
        $dato=$dbregarch->regdepartamento($idus,$titulo);
        if($dato !=""){
          $num_mien = explode(",",$miembros);
                  for ($i=0; $i < count($num_mien) ; $i++) { 
                      if ($num_mien[$i]!=0) {
                      $server=$dbregarch->regdepa_miembros($dato,$num_mien[$i]);
                      }
                  }
        }
        echo $dato;
  }
  
}


/////registramos los usuarios del proyecto

if ($selec == 32) {

header('Content-type: application/json charset=utf-8');
  $server = array();
  
  $miembros= trim($_POST['miembros']);
  $idus= trim($_POST['idus']);
  $titulo= trim($_POST['ti']);
  //$tipo= $_POST['tipo'];
  $flag=1;
  $dbchk = new Reunioneschk;
  $rev = $dbchk->chkproy($titulo,$idus,$flag);

  if($rev == 1)
  {
    echo "ok";
  }
  if($rev != 1)
  {
      $dbregarch= new Registros;
      $dato=$dbregarch->regproyecto($idus,$titulo);
      if($dato !=""){
        $num_mien = explode(",",$miembros);
                for ($i=0; $i < count($num_mien) ; $i++) { 
                    if ($num_mien[$i]!=0) {
                    $server=$dbregarch->regproy_miembros($dato,$num_mien[$i]);
                    }
                }
      }
      echo $dato;
  }
  
}

if ($selec == 33) {

  header('Content-type: application/json charset=utf-8');
  $server = array();


  $iddep = $_POST['dep'];
  $idus = $_POST['us'];
  $flag = 1;
  $dbchk = new Reunioneschk;
  $server = $dbchk->busqdepaesp($idus,$flag,$iddep);

  echo json_encode($server);

  
}