<?php
require "DataBase.php";
$db = new DataBase();
if (isset($_POST['email']) && isset($_POST['password'])) {
    if ($db->dbConnect()) {
        if ($db->logIn("users", $_POST['email'], $_POST['password'])) {
            echo "Login Success";
            header('Location: ' . $_SERVER['_self']);
        } else
            echo "email or Password wrong";
    } else
        echo "Error: Database connection";
} else
    echo "All fields are required";
?>