<?php
include "koneksi.php";

$kueri = "SELECT * FROM barang ORDER BY id ASC";
$hasil = mysqli_query($koneksi, $kueri);

$data_barang = array();
if ($hasil) {
    while($baris = mysqli_fetch_assoc($hasil)){
        $data_barang[] = $baris;
    }

    $respon = [
        'status' => 'success',
        'message' => 'Data berhasil diambil',
        'data' => $data_barang
    ];
} else {
    $respon = [
        'status' => 'error',
        'message' => 'Data gagal diambil',
        'data' => array()
    ];
}

echo json_encode($respon);
?>
