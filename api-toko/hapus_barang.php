<?php
include "koneksi.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id']) && $data['id'] !== '') {
    $id = mysqli_real_escape_string($koneksi, $data['id']);

    $sql = "DELETE FROM barang WHERE id = '$id'";

    if (mysqli_query($koneksi, $sql)) {
        echo json_encode([
            "success" => true,
            "message" => "Barang berhasil dihapus!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Gagal menghapus barang: " . mysqli_error($koneksi)
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "ID tidak ditemukan. Gagal menghapus."
    ]);
}

mysqli_close($koneksi);
?>
