<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost"; //sql101.infinityfree.com
$user = "root"; //if0_40374966
$pass = ""; //f70382506c3e
$db = "db_toko"; //if0_40374966_db_toko

$koneksi = mysqli_connect($host, $user, $pass, $db);

if(!$koneksi){
    header("Content-Type: application/json");
    echo json_encode(["success" => false, "message" => "Koneksi database gagal: " . mysqli_connect_error()]);
    exit;
}
?>