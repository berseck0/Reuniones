<?
include_once('conexion.php');

 $op = $_POST['op'];

//seccion para hacer login
if ($op == 1) 
{
    $usuario = stripcslashes($_POST['use']);
    $pass = md5(stripcslashes($_POST['pas'])); 

    class loger
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
            
            function login($user,$pass)
            {
                $mysqli = $this->conexion();
                $sql = " SELECT ID_EMPLEADO, NICK FROM jb_empleado_login where USUARIO=? and PASSWORD=?; ";
                $lista = array();
              if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("ss",$user,$pass);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2);

                        while ($data->fetch()) {
                            $registro['id']=$col1;
                            $registro['nombre']=$col2;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                    return $lista;
                } 
            }
        }


    $db = new loger;
    $res = $db->login($usuario,$pass);

    if ($res != "") {
        session_start();
        //echo json_encode($res);
        $_SESSION['nombre']= $res[0]['nombre'];
        $_SESSION['iduser']= $res[0]['id'];
        $_SESSION['logge']= true;    
        echo true;
    }
    else
    {
        echo "Error en los datos, verifica";
    }
    
}

//seccion para cerrar sesion
if ( $op == 2) {
    session_start(); 
    session_destroy(); 
    echo true;
}

//seccion de listas de etiquetas 
if($op == 3)
{
    $ideti = $_POST['id'];
    $tabla = $_POST['tab'];
    if($tabla ==1){$tabla="jb_etiquetas";}
    $idcam = $_POST['idcam'];
    if($idcam ==1){$idcam="id_usuario";}

    class Listadotag
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

            function listadostag($id,$tab,$idcam)
            {
                $mysqli=$this->conexion();
                $sql="SELECT nombre,id_etiqueta,tipo FROM $tab where $idcam=?";
                $lista=array();
                if ($data=$mysqli->prepare($sql)) {
                     $data->bind_param("i",$id);
                     if($data->execute())
                     {
                        $data->bind_result($col1,$col2,$col3);

                        while ($data->fetch()) {
                            $registro['nombre']=$col1;
                            $registro['id']=$col2;
                            $registro['tip']=$col3;
                            $registro['idcamp']=$id;
                            $lista[] = $registro;
                        }

                        $data->free_result();
                        $data->close();
                        return $lista;
                    }
                }return $lista;
            }     
    }

    header('Content-type: application/json');
   // $server = array();

    $lis = new Listadotag;
    $valor = $lis->listadostag($ideti,$tabla,$idcam);
    echo json_encode($valor);
}


//generamos las listas detopicos en la reunion

if($op == 4)
{
 /// espacio libre 

}

//eliminamos las etiquetas
if($op == 5)
{
    $iduser = $_POST['id'];
    $tabla = $_POST['tab'];
    if($tabla ==2){$tabla="jb_etiquetas";}
    $idcam = $_POST['idcam'];
    if($idcam ==2){$idcam="id_usuario";$idcamp2="id_etiqueta";}
    $id = $_POST['ids'];

    class Delltag
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

            function eliminatag($iduser,$tab,$idcam,$id,$idcamp2)
            {
                $mysqli=$this->conexion();
                $sql="DELETE FROM $tab where $idcam=? AND  $idcamp2=?";
                if ($data=$mysqli->prepare($sql))
                {
                     $data->bind_param("ii",$iduser,$id);
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

    $lis = new Delltag;
    echo $valor = $lis->eliminatag($iduser,$tabla,$idcam,$id,$idcamp2);
}
