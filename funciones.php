<?
include 'acciones.php';
header('Content-type: application/json');
$server = array();

$selec = $_POST['selec'];

if ($selec == 1)
{
     $id_reun    = $_POST['idre'];
     $tituloRe   = $_POST['nom_reunion'];
     $etiqeuta   = $_POST['etiquetas'];
     $lugar      = $_POST['lugar'];
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
            ///$idetiqueta = $dbreg->updatereunion($idreunion,"id_etiqueta",$idetiqueta);
        }

}

//visualisamos la lista de reuniones
if ($selec == 2)
 {
    $idusuario = $_POST['idusua'];
    $val = 1;
   $dbchk = new Reunioneschk;
    $datos = $dbchk->chkreunion($idusuario,$val);

    $count = count($datos);
    $datetime = date("Y-m-d");

 for ($i=0; $i <$count; $i++) {
    $fechadb =$datos[$i]['fecha'];
    $diasdif=$dbchk->chkfechadif($fechadb,$datetime);
    
    if ($diasdif <= 0){$clase = 'class="meeting_post timedead"'; $h = '<span class="alertDia"><span class="icon">8</span>Reunion Del Dia</span>'; } elseif($diasdif<=3 && $diasdif >0) {  $clase = 'class="meeting_post timeout"'; $h = '<span class="alertDia"><span class="icon">4</span>Reunion Proxima</span>';} else{$clase = 'class="meeting_post"'; $h='<span class="alertDia"><span class="icon normal">K</span></span>';}



      echo '  <div id="'.$datos[$i]['idre'].'" '.$clase.' >
            <img src="img/avatar_2x.png" alt="imagen_user" height="50" width="80">
            <div  class="meeting_head">
                <h4>'.$datos[$i]['nombre'].'</h4>'.$h.'
                <div class="meeting_date">'.$datos[$i]['fecha'].' '.utf8_decode($datos[$i]['hora']).'</div>
                <div class="meeting_user">'.$datos[$i]['usuario'].'</div>
            </div>
            <div class="btn_down" onclick="showtemasreunion('.$datos[$i]['idre'].',0)"><span  class="icon">:</span></div>
            <div class="btn_del" onclick="movListReunion('.$datos[$i]['idre'].','.$idusuario.')"><span class="icon">Â</span></div>
            <div id="list-'.$datos[$i]['idre'].'"class="meeting_topic">
                <ul>';
                 $list=$dbchk->chktopic($datos[$i]['idre']);
                 $con = count($list);
                 for ($l=0; $l < $con; $l++) { 
                            echo '<li id="topiclist"><span>'.$list[$l]["text"].'</span></li>';
                        }       
                echo'</ul>
            </div>
        </div> ';

    }
   
}

//visualisamos lista de reuniones pasadas o terminadas
if ($selec == 12)
{

    $idusuario = $_POST['idusua'];
    $val = 0;
    $dbchk = new Reunioneschk;
    $datos = $dbchk->chkreunion($idusuario,$val);

    $count = count($datos);

    for ($i=0; $i <$count; $i++) {

      echo '  <div id="'.$datos[$i]['idre'].'" class="meeting_end">
            <img src="img/avatar_2x.png" alt="imagen_user" height="50" width="80">
            <div  class="meeting_head">
                <h4>'.$datos[$i]['nombre'].'</h4><span class="alertDia"><span class="icon normal">Ë</span></span>
                <div class="meeting_date">'.$datos[$i]['fecha'].'  '.utf8_decode($datos[$i]['hora']).'</div>
                <div class="meeting_user">'.$datos[$i]['usuario'].'</div>
            </div>
            <div class="btn_down" onclick="showtemasreunion('.$datos[$i]['idre'].',0)"><span  class="icon">:</span></div>
            <div class="btn_del" onclick="movListReunion('.$datos[$i]['idre'].','.$idusuario.')"><span class="icon">Â</span></div>
            <div id="list-'.$datos[$i]['idre'].'"class="meeting_topic">
                <ul>';
                 $list=$dbchk->chktopic($datos[$i]['idre']);
                 $con = count($list);
                 for ($l=0; $l < $con; $l++) { 
                            echo '<li id="topiclist"><span>'.$list[$l]["text"].'</span></li>';
                        }       
                echo'</ul>
            </div>
        </div> ';

    }
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
    $plaza = $_POST['place'];

    $dbsha = new Busquedasdb();

     $server = $dbsha->usuariobusqueda($plaza);
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
    $archivoup = $_POST[''];

    $addusertarea = $_POST['tareausuarios'];

    $regW= new Registros;
    $reg1= $regW->regtareasActv($titulo,$fecha,$notas,$mail,$archivoup);
    //echo $reg1;
    $reg_act_asing= $regW->regactasignada($reg1,$iduser,$addusertarea);
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
    $idusuario = $_POST['idusua'];

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistarea($idusuario);

    $count = count($datos);

 for ($i=0; $i <$count; $i++) {


   echo '<div class="post-w">
                    <img src="" alt="una imagen" height="50" width="80">
                    <div class="post-w-head">
                         <h4>'.$datos[$i]['titulo'].'</h4>
                        <div class="post-w-date">'.$datos[$i]['fecha'].'</div>
                        <div class="post-w-user">'.$datos[$i]['usuario'].'</div>
                        <div class="notas-w">'.$datos[$i]['notas'].'</div>
                    </div>
                        <div class="btn_down"><span class="icon">:</span></div>
                        <div class="btn_del"><span class="icon">Â</span></div>
          </div>';
    }
}

//generamos la lista de actividades
if($selec == 10)
{
    $idusuario = $_POST['idusua'];

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistactividades($idusuario);

    $count = count($datos);

 for ($i=0; $i <$count; $i++) {

     echo '<div class="post-w">
                    <img src="" alt="una imagen" height="50" width="80">
                    <div class="post-w-head">
                         <h4>'.$datos[$i]['titulo'].'</h4>
                        <div class="post-w-date">'.$datos[$i]['fecha'].'</div>
                        <div class="post-w-user">'.$datos[$i]['usuario'].'</div>
                        <div class="notas-w">'.$datos[$i]['notas'].'</div>
                    </div>
                        <div class="btn_down"><span class="icon">:</span></div>
                        <div class="btn_del"><span class="icon">Â</span></div>
          </div>';

    }
}
//generamos las listas de actividades terminadas

if($selec == 11)
{
    $idusuario = $_POST['idusua'];

    $dbchk = new Reunioneschk;
    $datos = $dbchk->chklistend($idusuario);

    $count = count($datos);

     for ($i=0; $i <$count; $i++) {

      echo '<div class="post-w">
                    <img src="" alt="una imagen" height="50" width="80">
                    <div class="post-w-head">
                         <h4>'.$datos[$i]['titulo'].'</h4>
                        <div class="post-w-date">'.$datos[$i]['fecha'].'</div>
                        <div class="post-w-user">'.$datos[$i]['usuario'].'</div>
                        <div class="notas-w">'.$datos[$i]['notas'].'</div>
                    </div>
                        <div class="btn_down"><span class="icon">:</span></div>
                        <div class="btn_del"><span class="icon">Â</span></div>
          </div>';

    }

}