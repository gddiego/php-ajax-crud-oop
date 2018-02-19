<?php
if (isset($_POST['id']) && isset($_POST['id']) != "") {
    require_once('../inc/crud.php');
    $user_id = $_POST['id'];

    $object = new CRUD();

    echo $object->details($user_id);
}
?>