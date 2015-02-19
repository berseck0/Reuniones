<?
session_start();
//se comprueba que una peticion ajax

       $id = $_SESSION['iduser'];
        // obtenemos los datos del archivo
       $archivo = $_FILES["archivo"]['name'];
       $tipo = $_FILES["archivo"]['type'];
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
                    echo json_encode($file);
                }
        }
   