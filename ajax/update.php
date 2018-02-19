<?php
 
if (isset($_POST)) {
require_once('../inc/crud.php');
 
    $id = $_POST['id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
 
    $object = new CRUD();
 
    $object->update($first_name, $last_name, $email, $id);
}