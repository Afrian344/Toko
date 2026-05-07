<?php
include "koneksi.php";

// Set header agar output berupa JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Ambil data JSON yang dikirim melalui body request
$data = json_decode(file_get_contents("php://input"), true);

// Pastikan data tidak kosong
if (
    !empty($data['id']) &&
    !empty($data['nama_barang']) &&
    isset($data['harga']) &&
    isset($data['stok'])
) {
    // Sanitasi data
    $id = mysqli_real_escape_string($koneksi, $data['id']);
    $nama_barang = mysqli_real_escape_string($koneksi, $data['nama_barang']);
    $harga = mysqli_real_escape_string($koneksi, $data['harga']);
    $stok = mysqli_real_escape_string($koneksi, $data['stok']);

    // Query untuk update data
    $sql = "UPDATE barang SET nama_barang='$nama_barang', harga='$harga', stok='$stok' WHERE id='$id'";

    if (mysqli_query($koneksi, $sql)) {
        // Berhasil
        echo json_encode([
            "success" => true,
            "message" => "Data barang berhasil diubah!"
        ]);
    } else {
        // Gagal Query
        echo json_encode([
            "success" => false,
            "message" => "Gagal mengubah data: " . mysqli_error($koneksi)
        ]);
    }
} else {
    // Data tidak lengkap
    echo json_encode([
        "success" => false,
        "message" => "Data tidak lengkap. Pastikan Nama, Harga, dan Stok terisi."
    ]);
}

mysqli_close($koneksi);
?>
