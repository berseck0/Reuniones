<?php 
//cambiar el nombre de la base de datos y el pass 
class Conexion
{
    private $conn;

     function conect(){
        $this->conn = new mysqli("localhost","root","mahoromatic","jarbossdb");
        if ($this->conn->connect_errno)
        {
            $this->conn->autocommit(FALSE);
            return false;
            exit();
        }else
        {
            //$this->conn->autocommit(FALSE);//no va no deja registrar nada
            return $this->conn;
            //return true;
        }
    }

    function close(){
        mysqli_close($this->conn);
    }

    function rollback(){
        mysqli_rollback($this->conn);
    }

    function commit(){
        mysqli_commit($this->conn);
    }

    function free_result()
    {
        mysqli_free_result($this->conn);
    }
}

?>