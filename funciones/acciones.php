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
                            $listados[] = $registro;
                        } 
                    
                        $data->free_result();
                        $data->close();
                        return $listados;
                }
                 return $listados;
        }



            /* function chkusuariosreunion($idreunion,$idusuario)
        {
            $mysqli = $this->conexion();
            $sql = "SELECT jbpartRe.id_participante_re, jbemp.ID_EMPLEADO, jbemp.NOMBRES, jbemp.A_PATERNO, jbemp.A_MATERNO FROM jb_participantes_reunion jbpartRe,jb_empleado jbemp where jbpartRe.id_usuario ='$idusuario' and jbpartRe.id_reunion='$idreunion' and jbpartRe.id_participante_re=jbemp.ID_EMPLEADO;";

            if ($dato=$mysqli->query($sql))
             {
                $datos = $dato->fetch_array();
                return $datos;
                mysqli_free_result($dato);
            }
        }
            */
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
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                }


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

                $sql = "SELECT tarActv.nombre, tarActv.fecha, tarActv.nota, tarActv.mail, jbemp.NOMBRES AS nombreuser FROM jb_tareas_asignadas tarAsing, jb_tareas_actividades tarActv, jb_empleado jbemp WHERE tarAsing.id_propietario =?  AND tarAsing.flag=1  AND tarAsing.id_tarea = tarActv.id_actividades AND jbemp.ID_EMPLEADO = tarAsing.id_propietario ORDER BY tarActv.fecha ASC";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$iduser);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4,$col5);

                        while ($data->fetch()) {
                            $registro['titulo']=$col1;
                            $registro['fecha']=$col2;
                            $registro['nota']=$col3;
                            $registro['mail']=$col4;
                            $registro['usuario']=$col5;
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

                $sql = "SELECT tarActv.nombre, tarActv.fecha, tarActv.nota, tarActv.mail, jbemp.NOMBRES AS nombreuser FROM jb_tareas_asignadas tarAsing, jb_tareas_actividades tarActv, jb_empleado jbemp, jb_user_asignadosw userasign WHERE userasign.id_useradd =? AND userasign.id_tarea = tarAsing.id_tarea AND tarAsing.flag =1 AND tarAsing.id_tarea = tarActv.id_actividades AND jbemp.ID_EMPLEADO = tarAsing.id_propietario";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$iduser);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4,$col5);

                        while ($data->fetch()) {
                            $registro['titulo']=$col1;
                            $registro['fecha']=$col2;
                            $registro['nota']=$col3;
                            $registro['mail']=$col4;
                            $registro['usuario']=$col5;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                }

        }

        //generamos la lista de tareas terminadas 
        function chklistend($iduser)
        {
            $mysqli=$this->conexion();

                $sql = "SELECT tarActv.nombre, tarActv.fecha, tarActv.nota, tarActv.mail, jbemp.NOMBRES AS nombreuser FROM jb_tareas_asignadas tarAsing, jb_tareas_actividades tarActv, jb_empleado jbemp, jb_user_asignadosw userasign WHERE userasign.id_useradd =? AND userasign.id_tarea = tarAsing.id_tarea AND tarAsing.flag =0 AND tarAsing.id_tarea = tarActv.id_actividades AND jbemp.ID_EMPLEADO = tarAsing.id_propietario";
                $lista=array();
              
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$iduser);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3,$col4,$col5);

                        while ($data->fetch()) {
                            $registro['titulo']=$col1;
                            $registro['fecha']=$col2;
                            $registro['nota']=$col3;
                            $registro['mail']=$col4;
                            $registro['usuario']=$col5;
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

        function regtareasActv($titulo,$fecha,$nota,$mail,$archivoup)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_tareas_actividades(nombre,fecha,nota,mail,archivo) VALUES(?,?,?,?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("sssis",$titulo,$fecha,$nota,$mail,$archivoup);
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

        function regactasignada($idtarea,$idpro,$id_usadd)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_tareas_asignadas(id_tarea,id_propietario,id_useradd) VALUES(?,?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("iii",$idtarea,$idpro,$id_usadd);
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

        function reguseradd($idtarea,$id_usadd)
        {
            $mysqli = $this->conexion();
            $sql = "INSERT INTO jb_tareas_asignadas(id_tarea,id_propietario,id_useradd) VALUES(?,?,?)";

            if($data = $mysqli->prepare($sql))
            {
                $data->bind_param("iii",$idtarea,$idpro,$id_usadd);
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

        function usuariobusqueda($plaza)
        {
            header('Content-type: application/json');

            $mysqli = $this->conexion();
            $listado = array();
            $query = "SELECT jb_empleado.NOMBRES,jb_empleado.ID_EMPLEADO, jb_plaza.NOMBRE_PLAZA FROM jb_empleado, jb_plaza where jb_plaza.id=jb_empleado.ID_EMPLEADO and jb_plaza.NOMBRE_PLAZA=?";
              
                if ($stmt=$mysqli->prepare($query))
                {
                    $stmt->bind_param('s',$plaza);
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
    }  

}

