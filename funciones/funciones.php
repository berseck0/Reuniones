<?
include 'acciones.php';


$selec = $_POST['selec'];

if ($selec == 1){
     $id_reun    = $_POST['idre'];
     $tituloRe   = utf8_encode($_POST['nom_reunion']);
     $etiqeuta   = $_POST['etiquetas'];
     $lugar      = utf8_encode($_POST['lugar']);
     $iduser     = $_POST['iduser'];
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
     //$idetiqueta =$_POST['idetiquetas'];
     //$idparticipante = $_POST['participantes'];

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
            ///$idetiqueta = $dbreg->updatereunion($idreunion,"id_etiqueta",$idetiqueta);
        }

}

//visualisamos la lista de reuniones
if ($selec == 2) {
    header('Content-type: application/json harset=utf-8');
    $server = array();

    $idusuario = $_POST['idusua'];
    $val = 1;
    $dbchk = new Reunioneschk;
    $server = $dbchk->chkreunion($idusuario,$val);

    //$server = utf8_decode($server);
    $myjson =json_encode($server, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    $myjson = utf8_encode(stripslashes($myjson));
    echo $myjson;
    //echo json_decode($myjson,true);
    //echo json_last_error_msg();

}

//visualisamos lista de reuniones pasadas o terminadas
if ($selec == 12)
{
    header('Content-type: application/json');
    $server = array();

    $idusuario = $_POST['idusua'];
    $val = 0;
    $dbchk = new Reunioneschk;
    $server = $dbchk->chkreunion($idusuario,$val);

    //$server = utf8_decode($server);
    $myjson = json_encode($server, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    $myjson = utf8_encode(stripslashes($myjson));
    echo $myjson;

}

//registramos las etiquetas
if ($selec == 3) {
    
    $idusua = $_POST['idus'];
    $nombre = $_POST['ti'];
    $tipo   = $_POST['tipo'];

    $dbreg = new Registros;
    $datos = $dbreg->chketiqueta($nombre,$idusua,$tipo);
    if($datos == 1 ){
        echo "ok";
    }else
    {
    $dato  = $dbreg->regetiqueta($nombre,$tipo,$idusua);
    echo $dato;    
    }
}
///se mueve la reunion a la seccion de finalizadas
if ($selec == 4) {
    
    $idusua = $_POST['idus'];
    $idreunion = $_POST['id'];
    $valor = $_POST['val'];

    $dbupReunion = new Registros;
    $result = $dbupReunion->upReunionFinalizada($valor,$idreunion,$idusua);
    echo $result;

}

//registramos los topicos de la reunion
if ($selec == 5) {

    $id = $_POST['id'];
    $nombre = $_POST['ti'];

    $dbreg = new Registros;
    $dato  = $dbreg->regtopico($nombre,$id);
    echo $dato;
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
    //$json = json_encode($server,JSON_UNESCAPED_UNICODE);

}

//registro de tareas
if($selec == 7)
{
    $titulo = $_POST['titulo-w'];
    $propietario = $_POST['propietario'];
    $mail   = $_POST['mailsend'];
    if($mail != 1){$mail = 0;}
    $fecha  = str_replace("%2F","-" , $_POST['fecha_limite']);  
    $fecha  = date("Y-m-d",strtotime($fecha));  
    $etiquetas = $_POST['etiqutas'];
    $notas = $_POST['notas'];
    $iduser = $_POST['id'];
   // $archivoup = $_POST[''];

    $addusertarea = $_POST['tareausuarios'];

    $regW= new Registros;
    $reg1= $regW->regtareasActv($titulo,$fecha,$notas,$mail,$archivoup);

    $reg_act_asing= $regW->regactasignada($reg1,$iduser);
    $regW->reg_usrasing($reg1,$iduser);
    echo $reg_act_asing;

    //seccion para registrar a los usuarios asignados a las actividades y tareas
    //
    /*
    for ($i=0; $i < ; $i++) { 
        $reguseradd = $regW->reguseradd($reg1,$addusertarea[$i]);
    }*/
}

//registro de comentarios en las tareas
if($selec == 8)
{

}

//generamos la lista de tareas
if($selec == 9 )
{
    header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = $_POST['idusua'];

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistarea($idusuario);
    echo json_encode($datos);

}

//generamos la lista de actividades
if($selec == 10)
{
    header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = $_POST['idusua'];

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistactividades($idusuario);
    echo json_encode($datos);

}
//generamos las listas de actividades terminadas

if($selec == 11)
{
   header('Content-type: application/json charset=utf-8');
    //$server = array();
    $idusuario = $_POST['idusua'];

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistend($idusuario);
    echo json_encode($datos);


}


//visualisamos la reunion activa 
if($selec == 13)
{
    header('Content-type: application/json charset=utf-8');
    $server = array();

    $idusuario = $_POST['idusua'];
    $idre = $_POST['id'];
    $val = 1;
    $dbchk = new Reunioneschk;
    $server = $dbchk->chkreunionactiva($idusuario,$val,$idre);

    //$server = utf8_decode($server);
    $myjson = json_encode($server, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    $myjson = utf8_encode(stripslashes($myjson));
    echo $myjson;
}


//registramos las notas o comentarios en la reunion activa 
if($selec == 14)
{

     $id=$_POST['id'];
     $tipo=utf8_encode($_POST['tipo']);
     $texto=utf8_encode($_POST['text']);

    $dbreg = new Registros;
    $dato  = $dbreg->regNotasLitsReuniones($id,$texto,$tipo);
    if($dato != 0)
    {

      header('Content-type: application/json charset=utf-8');
      $server = array();
      $server = $dbreg->chknotaListReuniones($id);

    //$server = utf8_decode($server);
    $myjson = json_encode($server, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    $myjson = utf8_encode(stripslashes($myjson));
    echo $myjson;

    }
}

//generamos la busqueda de etiquetas
if ($selec == 15) {
    header('Content-type: application/json charset=utf-8');
    $server = array();
    
    $idus= $_POST['id'];
    $dbshar= new Busquedasdb;
    $server = $dbshar->busEtique($idus);
    echo json_encode($server);
    
}
/////damos de baja una tarea o actividad

if($selec == 16)
{
  $idactv   = $_POST['idw'];
  $idusr    = $_POST['id'];
  $valor    = 0;

    $dbreg = new Registros;
    $dato  = $dbreg->workfin($valor,$idactv,$idusr);
    echo $dato;
}