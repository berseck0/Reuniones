<?
session_start();


       $id = $_SESSION['iduser'];
        // obtenemos los datos del archivo
       $archivo = trim($_FILES["archivo"]['name']);
       $tipo = trim($_FILES["archivo"]['type']);
       $archivo = limpia_espacios($archivo);
        if ($archivo != "")
        {
            $ds="../archivos/".$id;
            $f=date("m-d-y_H:i");
         
                @mkdir($ds, 0777);
            
           $archivo = $id."_".$f."_".$archivo;
           $destino = "../archivos/".$id."/".$archivo."";
            $temp_file = $_FILES['archivo']['tmp_name'];
         
                if(move_uploaded_file($temp_file,$destino))
                {
                    header('Content-type: application/json charset=utf-8');
                    sleep(3);
                    $file= explode("/",$destino);
                    //array_push($file,$tipo);
                    echo json_encode($file);
                }
        }
  
function limpia_espacios($cadena)
{
  $cadena = str_replace(' ','-',$cadena);
  return $cadena;
}