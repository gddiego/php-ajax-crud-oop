<?php
require_once('db.php');

class CRUD{
	private $connection;
	
	public function __construct(){
		$this->connection=new Db();
		$this->connection=$this->connection->getDb();
	}

	public function create($firstname,$lastname,$email){
		try{

		$query=$this->connection->prepare("INSERT INTO users(first_name,last_name,email)
		 VALUES (:first_name,:last_name,:email)");
		$query->bindParam(':first_name',$firstname,PDO::PARAM_STR);
		$query->bindParam(':last_name',$lastname,PDO::PARAM_STR);
		$query->bindParam(':email',$email,PDO::PARAM_STR);

		$query->execute();
		return $this->connection->lastInsertId();

		}catch(PDOException $e){
			echo $e->getMessage();
		}
	}

	public function read(){
		try{

		$query=$this->connection->prepare("SELECT * FROM users");
		$query->execute();
		return $query->fetchAll(PDO::FETCH_ASSOC);

		}catch(PDOException $e){
			echo $e->getMessage();
		}
	}

		public function update($first_name, $last_name, $email, $id){
		try{

		$query=$this->connection->prepare("UPDATE users SET
		 first_name=:first_name,last_name=:last_name,email=:email WHERE id=:id");
		$query->bindParam(':first_name',$first_name,PDO::PARAM_STR);
		$query->bindParam(':last_name',$last_name,PDO::PARAM_STR);
		$query->bindParam(':email',$email,PDO::PARAM_STR);
		 $query->bindParam(":id", $id, PDO::PARAM_STR);

		$query->execute();
		return $query->fetchAll(PDO::FETCH_ASSOC);

		}catch(PDOException $e){
			echo $e->getMessage();
		}
	}

	public function delete($user_id)
    {
    	try{
        $query = $this->connection->prepare("DELETE FROM users WHERE id = :id");
        $query->bindParam(":id", $user_id, PDO::PARAM_INT);
        $query->execute();

        	}catch(PDOException $e){
			echo $e->getMessage();
		}
	}

	public function Details($user_id)
    {
    	try{
        $query = $this->connection->prepare("SELECT * FROM users WHERE id = :id");
        $query->bindParam(":id", $user_id, PDO::PARAM_STR);
        $query->execute();
        return json_encode($query->fetch(PDO::FETCH_ASSOC));

        }catch(PDOException $e){
			echo $e->getMessage();
		}
    }
}
 