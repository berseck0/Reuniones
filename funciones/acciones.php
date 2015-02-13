<?
include 'conexion.php';

$server = array();

$op = $_POST['op'];

if ($op == 1) {
    
    class Reunioneschk
    {  
        var $conec;
        function __construct()
        {
            $this->conec = new Conexion();
        }

        function conexion(){
           $db= $this->conec;
           $mysqli=$db->conect();
           return $mysqli;
        }
        
        function chkreunion($iduser,$valor)
        {
            header('Content-type: application/json');
            
            $mysqli = $this->conexion();
            $sql = "SELECT reun.id_reunion, reun.nombre_reunion, fecha.fecha_in, fecha.hora_in, reun.id_topic, reun.localizacion, emp.NOMBRES from jb_reunion_new reun, jb_fecha_reunion fecha,jb_empleado emp where reun.id_usuario=? and fecha.id_fecha_re=reun.id_fecha_re and emp.id_empleado=reun.id_usuario and reun.valor=? ORDER BY fecha.fecha_in ASC";
            $listados=array();
            $datetime = date("Y-m-d");
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("ii",$iduser,$valor);
                     if($data->execute())
                        $data->bind_result($col1,$col2,$col3,$col4,$col5,$col6,$col7);

                        while ($data->fetch()) {
                            $registro['idre']=$col1;
                            $registro['nombre']=$col2;
                            $registro['fecha']=$col3;
                            $registro['hora']=$col4;
                            $registro['topic']=$col5;
                            $registro['localizacion']=$col6;
                            $registro['iduser']=$iduser;
                            $registro['usuario']=$col7;
                            $registro['lista']=$this->chktopic($registro['idre']);
                            $registro['count_fecha']=$this->chkfechadif($registro['fecha'],$datetime);
                            $listados[] = $registro;
                        } 
                        $data->free_result();
                        $data->close();
                        return $listados;
                }
                 return $listados;
        }
        
        //funcion para reuniones activas y sus datos
        function chkreunionactiva($iduser,$valor,$idre)
        {
            header('Content-type: application/json');
            
            $mysqli = $this->conexion();
            $sql = "SELECT reun.id_reunion, reun.nombre_reunion, fecha.fecha_in, fecha.hora_in, reun.id_topic, reun.localizacion, emp.NOMBRES from jb_reunion_new reun, jb_fecha_reunion fecha,jb_empleado emp where reun.id_usuario=? and fecha.id_fecha_re=reun.id_fecha_re and emp.id_empleado=reun.id_usuario and reun.valor=?  and reun.id_reunion=? ";
            $listados=array();
            $datetime = date("Y-m-d");
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("iii",$iduser,$valor,$idre);
                     if($data->execute())
                        $data->bind_result($col1,$col2,$col3,$col4,$col5,$col6,$col7);

                        while ($data->fetch()) {
                            $registro['idre']=$col1;
                            $registro['nombre']=$col2;
                            $registro['fecha']=$col3;
                            $registro['hora']=$col4;
                            $registro['topic']=$col5;
                            $registro['localizacion']=$col6;
                            $registro['iduser']=$iduser;
                            $registro['usuario']=$col7;
                            $registro['lista']=$this->chktopic($registro['idre']);
                            $registro['count_fecha']=$this->chkfechadif($registro['fecha'],$datetime);
                            $registro['etiquetas']=$this->chketiquetasreunion($registro['idre']);
                            $registro['participantes']=$this->chkusuariosreunion($registro['idre']);
                            
                            $listados[] = $registro;
                        } 
                    
                        $data->free_result();
                        $data->close();
                        return $listados;
                }
                 return $listados;
        }


            ////////verificamos los usuarios de la reunion activa
        function chkusuariosreunion($idreunion)
        {
            $mysqli = $this->conexion();
            $sql = "SELECT emp.ID_EMPLEADO, emp.NOMBRES FROM jb_participantes_reunion parRe,jb_empleado emp where parRe.id_reunion=? and parRe.id_usuario=emp.ID_EMPLEADO;";
            $lista=array();

            if ($data=$mysqli->prepare($sql))
             {  
                $data->bind_param("i",$idreunion);
                if ($data->execute()) {
                    $data->bind_result($col1,$col2);

                    while ($data->fetch()) {
                        $registro['idEmp']=$col1;
                        $registro['nomEmp']=$col2;
                        $lista[]=$registro;
                    }
                }
                $data->free_result();
                $data->close();
                return $lista;   
            }
            return $lista;
        }

        //////////////////verificacmos las etiquetas de la reunion activa
        function chketiquetasreunion($idtag)
        {
            $mysqli = $this->conexion();
            $sql = "SELECT et.nombre,et.id_etiqueta FROM jb_rel_tag_reunion er, jb_etiquetas et where er.id_reunion=? AND er.id_etiqueta=et.id_etiqueta;";
            $lista=array();

            if ($data=$mysqli->prepare($sql))
             {  
                $data->bind_param("i",$idtag);
                if ($data->execute()) {
                    $data->bind_result($col1,$col2);

                    while ($data->fetch()) {
                        $registro['nomTag']=$col1;
                        $registro['idTag']=$col2;
                        $lista[]=$registro;
                    }
                }
                $data->free_result();
                $data->close();
                return $lista;   
            }
            return $lista;
        }
 ///////////////extraemos los temas de la reunion          
        function chktopic($id)
            {
                $mysqli=$this->conexion();

                $sql = "SELECT texto,id_topic FROM jb_topic_reunion where id_reunion=?";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$id);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2);

                        while ($data->fetch()) {
                            $registro['texts']=$col1;
                            $registro['ids']=$col2;
                            $registro['resoluciones']=$this->chknotaListReuniones($registro['ids']);
                            $registro['archivos']=$this->chkarchListReuniones($registro['ids']);
                            $lista[] = $registro;
                        }
                    }
                        $data->free_result();
                        $data->close();
                        return $lista;
                }
                  return $lista;
            } 
            //extraemos los datos de las respuesta alos temas y archivos
            function chknotaListReuniones($idtopic)
            {
                $mysqli=$this->conexion();
                $sql="SELECT id_notas_topic,texto,tipo,archivo from jb_notas_topic where id_topic=?";
                $lista=array();
                if($data=$mysqli->prepare($sql))
                {
                    $data->bind_param("i",$idtopic);
                    if($data->execute())
                    {
                        $data->bind_result($col1,$col2,$col3,$col4);

                        while ($data->fetch())
                        {
                            $registro['idnota']=$col1;
                            $registro['texto']=$col2;
                            $registro['tipo']=$col3;
                            $lista[]=$registro;
                        }
                    }
                        $data->free_result();
                        $data->close();
                        return $lista;
                }
                return $lista;
            }
        function chkarchListReuniones($idtopic)
        {
            $mysqli=$this->conexion();
            $sql="SELECT archivo,tipo from jb_arch_reunion where id_topico_reunion=?";
            $lista=array();
            if($data=$mysqli->prepare($sql))
            {
                $data->bind_param("i",$idtopic);
                if($data->execute())
                {
                    $data->bind_result($col1,$col2);

                    while ($data->fetch())
                    {
                        $registro['liga']=$col1;
                        $registro['tipo']=$col2;
                        $lista[]=$registro;
                    }
                    
                }
                    $data->free_result();
                    $data->close();
                    return $lista;
            }
            return $lista;
        }


        function chksubtopic($idtopic)
        {
            $mysqli = $this->conexion();
            $sql = "SELECT texto FROM jb_sub_topic WHERE id_topic='$idtopic';";

            if ($dato = $mysqli->query($sql)) 
            {
                $datos = $dato->fetch_array();
                return $datos['texto'];
                mysqli_free_result($dato);
            }
        }

        function chkfechare($idfecha)
        {
            $mysqli = $this->conexion();
            $sql = "SELECT * FROM jb_fecha_reunion where  id_fecha_re='$idfecha';";

            if ($dato = $mysqli->query($sql)) 
            {
                $datos = $dato->fetch_array();
                return $datos;
                mysqli_free_result($dato);
            }
        }   

        //verifica que la etiqueta ya se encunetre
        function chketiqueta($etiqueta,$idusuario)
        {
            $mysqli =$this->conexion();
            $sql = "SELECT count(id_etiqueta) FROM jb_etiquetas where nombre=? and id_usuario=?;";
            $lista=array();
              

            if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("si",$etiqueta,$idusuario);
                     if($data->execute())
                     {
                        $data->bind_result($col1);
                        while ($data->fetch()) {
                            $registro['id']=$col1;
                            $lista[] = $registro;
                        }
                        $data->free_result();
                        $data->close();
                        return $lista;

                     }
             }
        }


        ////genera la busqueda para la lista de tareas
        function chklistarea($iduser)
        {
            $mysqli=$this->conexion();

                $sql = "SELECT tarActv.nombre, tarActv.fecha, tarActv.nota, tarActv.mail, jbemp.NOMBRES, tarActv.id_actividades FROM jb_tareas_actividades tarActv, jb_empleado jbemp WHERE tarActv.id_propietario =?  AND tarActv.flag=1   AND jbemp.ID_EMPLEADO = tarActv.id_propietario ORDER BY tarActv.fecha ASC";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$iduser);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4,$col5,$col6);

                        while ($data->fetch()) {
                            $registro['titulo']=$col1;
                            $registro['fecha']=$col2;
                            $registro['nota']=$col3;
                            $registro['mail']=$col4;
                            $registro['usuario']=$col5;
                            $registro['idactw']=$col6;
                            $registro['tagW']=$this->rel_tag_tareas($registro['idactw'],$iduser);
                            $registro['usrAsing']=$this->rel_usr_tarea($registro['idactw']);
                            $registro['archivos']=$this->chkarchivos_tareas($registro['idactw']);
                            $registro['comentarios']=$this->comentarios_tareas($registro['idactw']);
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                }

        }
        //genera lalista de las actividades asignadas por otros usuarios
        function chklistactividades($iduser)
        {
            $mysqli=$this->conexion();

                $sql = "SELECT tarActv.nombre, tarActv.fecha, tarActv.nota, tarActv.mail, jbemp.NOMBRES ,tarActv.id_actividades,tarActv.id_propietario  FROM jb_tareas_actividades tarActv, jb_empleado jbemp, jb_user_asignadosw userasign WHERE userasign.id_useradd =? AND userasign.id_tarea = tarActv.id_actividades AND tarActv.flag =1 AND jbemp.ID_EMPLEADO = tarActv.id_propietario";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$iduser);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4,$col5,$col6,$col7);

                        while ($data->fetch()) {
                            $registro['titulo']=$col1;
                            $registro['fecha']=$col2;
                            $registro['nota']=$col3;
                            $registro['mail']=$col4;
                            $registro['usuario']=$col5;
                            $registro['idw']=$col6;
                            $registro['idprop']=$col7;
                            $registro['tagW']=$this->rel_tag_tareas($registro['idw'],$iduser);
                            $registro['usrAsing']=$this->rel_usr_tarea($registro['idw']);
                            $registro['archivos']=$this->chkarchivos_tareas($registro['idw']);
                            $registro['comentarios']=$this->comentarios_tareas($registro['idw']);
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                    return $lista;
                }

        }

        //generamos la lista de tareas terminadas 
        function chklistend($iduser)
        {
            $mysqli=$this->conexion();

                $sql = "SELECT tarActv.nombre, tarActv.fecha, tarActv.nota, tarActv.mail, jbemp.NOMBRES, tarActv.id_actividades FROM jb_tareas_actividades tarActv, jb_empleado jbemp, jb_user_asignadosw userasign WHERE userasign.id_useradd =? AND userasign.id_tarea = tarActv.id_actividades AND tarActv.flag =0 AND jbemp.ID_EMPLEADO = tarActv.id_propietario";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$iduser);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4,$col5,$col6);

                        while ($data->fetch()) {
                            $registro['titulo']=$col1;
                            $registro['fecha']=$col2;
                            $registro['nota']=$col3;
                            $registro['mail']=$col4;
                            $registro['usuario']=$col5;
                            $registro['idw']=$col6;
                            $registro['tagW']=$this->rel_tag_tareas($registro['idw'],$iduser);
                            $registro['usrAsing']=$this->rel_usr_tarea($registro['idw']);
                            $registro['archivos']=$this->chkarchivos_tareas($registro['idw']);
                            $registro['comentarios']=$this->comentarios_tareas($registro['idw']);
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                    return $lista;
                }
        } 
        function rel_tag_tareas($idWork,$idusr)
        {
            $mysqli=$this->conexion();

                $sql = "SELECT tag.nombre, tag.tipo,tag.id_etiqueta  FROM jb_rel_tag_tareas tgw,jb_etiquetas tag WHERE tgw.id_tareas=? and tag.id_etiqueta=tgw.id_tag";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$idWork);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3);

                        while ($data->fetch()) {
                            $registro['tagName']=$col1;
                            $registro['tagTipo']=$col2;
                            $registro['idTag']=$col3;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                    return $lista;
                }
        }

        function rel_usr_tarea($idWork)
        {
            $mysqli=$this->conexion();

                $sql = "SELECT emp.NOMBRES, emp.ID_EMPLEADO  FROM jb_user_asignadosw usAs, jb_empleado emp WHERE usAs.id_tarea=? and usAs.id_useradd=emp.ID_EMPLEADO";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$idWork);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2);

                        while ($data->fetch()) {
                            $registro['nombreEmp']=$col1;
                            $registro['idEmp']=$col2;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                    return $lista;
                }
        }

        function chkarchivos_tareas($idactw){
            $mysqli=$this->conexion();

                $sql = "SELECT arch.tipo, arch.archivo,emp.NOMBRES FROM jb_arch_actividades arch, jb_empleado emp WHERE arch.id_actividad=? and arch.id_usuario=emp.ID_EMPLEADO";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$idactw);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3);

                        while ($data->fetch()) {
                            $registro['tipo']=$col1;
                            $registro['liga']=$col2;
                            $registro['nomusr']=$col3;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                    return $lista;
                }
        }
        /// buscamos los comentarios 
        function comentarios_tareas($idactw){
                $mysqli=$this->conexion();

                $sql = "SELECT comen.texto, comen.id_comentario, comen.fecha, emp.NOMBRES FROM jb_comentarios_w comen, jb_empleado emp WHERE comen.id_tarea=? and comen.id_usuario=emp.ID_EMPLEADO";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$idactw);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4);

                        while ($data->fetch()) {
                            $registro['texto']=$col1;
                            $registro['idcom']=$col2;
                            $registro['fecha']=$col3;
                            $registro['nomusr']=$col4;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                }
        }

        function chkfechadif($fecha1,$fecha2)
        {
            //defino fecha 1
              $primera= explode('-',$fecha1);
                $year1 = $primera[0];
                $mes1 = $primera[1];
                $dia1 = $primera[2];

                //defino fecha 2
              $segunda= explode('-',$fecha2);
                $year2 = $segunda[0];
                $mes2 = $segunda[1];
                $dia2 = $segunda[2];

                //calculo timestam de las dos fechas
                $timestamp1 = mktime(0,0,0,$mes1,$dia1,$year1);
                $timestamp2 = mktime(0,0,0,$mes2,$dia2,$year2);

                //resto a una fecha la otra
                $segundos_diferencia = $timestamp1 - $timestamp2;
                //echo $segundos_diferencia;

                //convierto segundos en días
                $dias_diferencia = $segundos_diferencia / (60 * 60 * 24);

                //obtengo el valor absoulto de los días (quito el posible signo negativo)
               // $dias_diferencia = abs($dias_diferencia);

                //quito los decimales a los días de diferencia
                $dias_diferencia = floor($dias_diferencia);

                return$dias_diferencia; 
        }   



    }
}
// seccion para hacer registros o actualizaciones  
if ($op  == 2) {

    class Registros
    {
        var $conec;
        function __construct()
        {
            $this->conec = new Conexion();
        }

        function conexion(){
           $db= $this->conec;
           $mysqli=$db->conect();
           return $mysqli;
        }

        //registra una nueva reunion y nos da el id
        function regreunion($nomreu,$localiza,$iduser)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_reunion_new(id_usuario,nombre_reunion,localizacion) VALUES(?,?,?);";
            
            if ($data = $mysqli->prepare($sql)) 
            {
                $data->bind_param("iss",$iduser,$nomreu,$localiza); 

                if ($data->execute())
                 {
                    return $data->insert_id;
                    return true;
                }
                else
                 {
                    $data->close();
                    return false;
                }   
            }
        }
        /// actualiza la reunion con el id de la misma regresa 1
        function re_update($nomreu,$localiza,$iduser,$idreun)
        {
            $mysqli = $this->conexion();
            $sql = "UPDATE jb_reunion_new SET nombre_reunion=?, localizacion =? where id_usuario =? and id_reunion=?;";
            
            if ($data = $mysqli->query($sql)) {
                 $data->bind_param("ssii",$nomreu,$localiza,$iduser,$idreun);
                 if($data->execute())
                 {
                    if($data->affected_rows)
                    {
                        return true;
                    }
                    $data->close();              
                 }
                 $data->free_result();
                $data->close();
            }
        }

        function re_participantesRe($idreun,$iduser){

            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_participantes_reunion(id_reunion,id_usuario) VALUES(?,?);";
            
            if ($data = $mysqli->prepare($sql)) 
            {
                $data->bind_param("ii",$idreun,$iduser); 

                if ($data->execute())
                 {
                    return $data->insert_id;
                    return true;
                }
                else
                 {
                    $data->close();
                    return false;
                }   
            }

        }
          function re_etiquetasRe($idreun,$idtag){

            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_rel_tag_reunion(id_reunion,id_etiqueta) VALUES(?,?);";
            
            if ($data = $mysqli->prepare($sql)) 
            {
                $data->bind_param("ii",$idreun,$idtag); 

                if ($data->execute())
                 {
                    return $data->insert_id;
                    return true;
                }
                else
                 {
                    $data->close();
                    return false;
                }   
            }

        }
        // actualiza la fecha con el id de la reunion regresa 1
        function re_update_fecha($idreunion,$fechain,$fechaout,$horain,$horaout)
        {
            $mysqli = $this->conexion();
            $sql = "UPDATE jb_fecha_reunion SET  fecha_in =?, fecha_out=?, hora_in=?, hora_out=? where id_reunion=?;";
            
            if ($data = $mysqli->prepare($sql)) {
                $data->bind_param("ssssi",$fechain,$fechaout,$horain,$horaout,$idreunion);
                if($data->execute())
                {
                    if($data->affected_rows)
                    {
                        return true;
                    }
                    $data->close();              
                }
                $data->free_result();
                $data->close();
            }
        }
        // registra la fecha con el id re lareunion nos regresa el id
       function regfechareu($idreunion,$fechain,$fechaout,$horain,$horaout)
        {
            $mysqli = $this->conexion();
            $sql ="INSERT INTO jb_fecha_reunion(id_reunion,fecha_in,fecha_out,hora_in,hora_out) VALUES(?,?,?,?,?);";

            if ($data = $mysqli->prepare($sql)) 
            {
                $data->bind_param("issss",$idreunion,$fechain,$fechaout,$horain,$horaout); 

                if ($data->execute())
                 {
                    return $data->insert_id;
                    return true;
                   
                }
                else
                 {
                    $data->close();
                    return false;
                }
                $data->free_result();
                $data->close();   
            }
        }

        function updatereunion($idreunion,$campoup,$valor)
        {
            $mysqli = $this->conexion();
            $sql = "UPDATE jb_reunion_new SET $campoup='$valor' where id_reunion = '$idreunion';";
            
            if ($data = $mysqli->query($sql)) {
                    return true;              
            }
        }

        function upReunionFinalizada($valor,$idreunion,$idusuario)
        {
            $mysqli = $this->conexion();
            $sql = "UPDATE jb_reunion_new SET valor=?  where id_reunion=? and id_usuario=?;";
            if ($data = $mysqli->prepare($sql)) 
            {
                $data->bind_param("iii",$valor,$idreunion,$idusuario); 
                 if($data->execute())
                {
                    if($data->affected_rows)
                    {
                        return true;
                    }
                    $data->close();              
                }
                $data->free_result();
                $data->close();
            }
        }

        function regetiqueta($titulo,$tipo,$idus)
        {
            $mysqli = $this->conexion();

            $sql = "INSERT INTO jb_etiquetas(nombre,tipo,id_usuario) VALUES(?,?,?)";
            if ($data = $mysqli->prepare($sql))
            {
                $data->bind_param("ssi",$titulo,$tipo,$idus);
                 if ($data->execute()) 
                 {
                    return $data->insert_id;
                    return true;
                 }
                 else
                 {
                    $data->close();
                    return false;
                 }
             } 

        }

        function chketiqueta($etiqueta,$idusuario,$tipo)
        {
            $mysqli = $this->conexion();
            $sql = "SELECT count(id_etiqueta) FROM jb_etiquetas where nombre=? and id_usuario=? AND tipo=?;";
              
            if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("sis",$etiqueta,$idusuario,$tipo);
                     if($data->execute())
                     {
                        $data->bind_result($col1);

                        if($data->fetch()) {
                            $registro=$col1;
                        }
                        $data->free_result();
                        $data->close();
                        return $registro;
                     }
             }
        }
        //registro de temas en la reunion
        function regtopico($titulo,$id)
        {
            $mysqli = $this->conexion();

            $sql = "INSERT INTO jb_topic_reunion(id_reunion,texto) VALUES(?,?)";
            if ($data = $mysqli->prepare($sql))
            {
                $data->bind_param("is",$id,$titulo);
                 if ($data->execute()) 
                 {
                    return $data->insert_id;
                    return true;
                 }
                 else
                 {
                    $data->close();
                    return false;
                 }
             } 
        }

        //// registramos las actividades para el usuario
        function regtareasActv($titulo,$fecha,$nota,$mail,$idus)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_tareas_actividades(nombre,fecha,nota,mail,id_propietario) VALUES(?,?,?,?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("sssii",$titulo,$fecha,$nota,$mail,$idus);
                if($data->execute())
                {
                    return $data->insert_id;
                    return true;
                }
                else
                {
                    $data->close();
                    return false;
                }
            }
        }

        //registro de archivos de las tareas
        function regarch_actividares($extension,$files,$iduser,$reg1,$idcom){
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_arch_actividades(tipo,archivo,id_usuario,id_actividad,id_comentario) VALUES(?,?,?,?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("ssiii",$extension,$files,$iduser,$reg1,$idcom);
                if($data->execute())
                {
                    return $data->insert_id;
                    return true;
                }
                else
                {
                    $data->close();
                    return false;
                }
            }
        }
         function regcoment_w($comen,$mail,$idus,$idw)
         {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_comentarios_w(texto,mail,id_usuario,id_tarea) VALUES(?,?,?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("siii",$comen,$mail,$idus,$idw);
                if($data->execute())
                {
                    return $data->insert_id;
                    return true;
                }
                else
                {
                    $data->close();
                    return false;
                }
            }
         }
        //// tarea o actividad finalizada
        function workfin($valor,$iadctw,$idusr){

            $mysqli = $this->conexion();
            $sql = "UPDATE jb_tareas_actividades SET flag=?  where id_actividades=? and id_propietario=?;";
            if ($data = $mysqli->prepare($sql)) 
            {
                $data->bind_param("iii",$valor,$iadctw,$idusr); 
                 if($data->execute())
                {
                    if($data->affected_rows)
                    {
                        return true;
                    }
                    $data->close();              
                }
                $data->free_result();
                $data->close();
            }
        }
    /// registramos  los uusarioas asigandos 
        function reg_usrasing($idtarea,$iduse)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_user_asignadosw(id_tarea,id_useradd) VALUES(?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("ii",$idtarea,$iduse);
                if($data->execute())
                {
                    return $data->insert_id;
                    return true;
                }
                else
                {
                    $data->close();
                    return false;
                }
            }

        }
        ////reg de etiquetas en las tareas
            /// registramos  los uusarioas asigandos 
        function reg_tagW($idtarea,$idtag)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_rel_tag_tareas(id_tareas,id_tag) VALUES(?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("ii",$idtarea,$idtag);
                if($data->execute())
                {
                    return $data->insert_id;
                    return true;
                }
                else
                {
                    $data->close();
                    return false;
                }
            }

        }

        
        ///////////////seccion de las notas en el listados de as tareas
        function  regNotasLitsReuniones($id,$texto,$tipo){
            $mysqli= $this->conexion();
            $sql="INSERT into jb_notas_topic(id_topic,texto,tipo) VALUES(?,?,?)";

            if($datos = $mysqli->prepare($sql))
            {
                $datos->bind_param("iss",$id,$texto,$tipo);
                if($datos->execute())
                {
                    return $datos->insert_id;
                    return true;
                }
                else
                {
                    $datos->close();
                    return false;
                }

            }

        }



       function chknotaListReuniones($idtopic)
        {
            $mysqli=$this->conexion();
            $sql="SELECT id_notas_topic,texto,tipo from jb_notas_topic where id_topic=?";
            $lista=array();
            if($data=$mysqli->prepare($sql))
            {
                $data->bind_param("i",$idtopic);
                if($data->execute())
                {
                    $data->bind_result($col1,$col2,$col3);

                    while ($data->fetch())
                    {
                        $registro['idnota']=$col1;
                        $registro['texto']=$col2;
                        $registro['tipo']=$col3;
                        $lista[]=$registro;
                    }
                    
                }
                    $data->free_result();
                    $data->close();
                    return $lista;
            }
            return $lista;
        }
        function chkarchListReuniones($idtopic)
        {
            $mysqli=$this->conexion();
            $sql="SELECT archivo from jb_arch_reunion where id_topico_reunion=?";
            $lista=array();
            if($data=$mysqli->prepare($sql))
            {
                $data->bind_param("i",$idtopic);
                if($data->execute())
                {
                    $data->bind_result($col1);

                    while ($data->fetch())
                    {
                        $registro['liga']=$col1;
                        $lista[]=$registro;
                    }
                    
                }
                    $data->free_result();
                    $data->close();
                    return $lista;
            }
            return $lista;
        }

        function regArchReuniones($idtop,$idre,$idus,$dir,$tipo)
        {
            $mysqli= $this->conexion();
            $sql="INSERT into jb_arch_reunion(id_topico_reunion,id_reunion,id_usuario,archivo,tipo) VALUES(?,?,?,?,?)";

            if($datos = $mysqli->prepare($sql))
            {
                $datos->bind_param("iiiss",$idtop,$idre,$idus,$dir,$tipo);
                if($datos->execute())
                {
                    return $datos->insert_id;
                    return true;
                }
                else
                {
                    $datos->close();
                    return false;
                }

            }
        }

    }
}


// busqueda de usuarios y etiquetas
if($op == 3)
{
    class Busquedasdb
    {  
        var $conec;
        function __construct()
        {
            $this->conec = new Conexion();
        }

        function conexion(){
           $db= $this->conec;
           $mysqli=$db->conect();
           return $mysqli;
        }

        function usuariobusqueda()
        {
            header('Content-type: application/json');

            $mysqli = $this->conexion();
            $listado = array();
            $query = "SELECT jb_empleado.NOMBRES,jb_empleado.ID_EMPLEADO, jb_plaza.NOMBRE_PLAZA FROM jb_empleado, jb_plaza where jb_plaza.id=jb_empleado.ID_EMPLEADO ";
              
                if ($stmt=$mysqli->prepare($query))
                {
                    //$stmt->bind_param('s',$plaza);
                     if($stmt->execute())
                        $stmt->bind_result($col1,$col2,$col3);
                        
                        while ($stmt->fetch()) {

                            $registro['nombre']=$col1;
                            $registro['id']=$col2;
                            $registro['plaza']=$col3;
                            $listado[] = $registro;
                        }

                        $stmt->free_result();
                        $stmt->close();
                        return $listado; 
                }
                return $listado;
        }

        function busEtique($idus)
        {
            $mysqli=$this->conexion();
            $sql="SELECT id_etiqueta,nombre,tipo FROM jb_etiquetas WHERE id_usuario=?";
            $listado = array();
            if ($data = $mysqli->prepare($sql)) {
                $data->bind_param("i",$idus);

                if($data->execute())
                    $data->bind_result($col1,$col2,$col3);

                    while ($data->fetch()){
                        $registro['idTag']=$col1;
                        $registro['nombre']=$col2;
                        $registro['tipo']=$col3;
                        $listado[]=$registro;
                    }
                $data->free_result();
                $data->close();
                return $listado;
            }
            return $listado;
        }
    }  

}

//eliminamos usuarios y tag de reuniones y actividades 
if ($op ==4)
{
    class Jbdelldb
    {  
        var $conec;
        function __construct()
        {
            $this->conec = new Conexion();
        }

        function conexion(){
           $db= $this->conec;
           $mysqli=$db->conect();
           return $mysqli;
        }

        function eliminaparticipante($idus,$idreun)
        {
            $mysqli = $this->conexion();
            $sql = "DELETE FROM jb_participantes_reunion WHERE id_usuario=? AND id_reunion=?;";
            
            if ($data=$mysqli->prepare($sql))
                {
                     $data->bind_param("ii",$idus,$idreun);
                     if($data->execute())
                     {
                        if($data->affected_rows)
                        {
                          return true;
                        }
                        else
                        {
                          return false;
                        }
                        
                        $data->free_result();
                        $data->close();
                    }
                }
        }

        function eliminatagreun($idtag,$idre){
            $mysqli = $this->conexion();
            $sql = "DELETE FROM jb_rel_tag_reunion WHERE id_etiqueta=? AND id_reunion=?;";
            
            if ($data=$mysqli->prepare($sql))
                {
                     $data->bind_param("ii",$idtag,$idre);
                     if($data->execute())
                     {
                        if($data->affected_rows)
                        {
                          return true;
                        }
                        else
                        {
                          return false;
                        }
                        
                        $data->free_result();
                        $data->close();
                    }
                }
        }
    }  
}
