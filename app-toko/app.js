async function ambilDataBarang() {
    try {
        // Tambahkan timestamp (cache-busting) agar browser selalu mengambil data terbaru, bukan dari cache
        const response = await fetch('../api-toko/get_barang.php?t=' + new Date().getTime());
        const hasil = await response.json();

        if (hasil.status === 'success') {
            const tableBarang = document.getElementById('table-barang');
            const cardBarang = document.getElementById('card-barang');

            // Render ke tabel jika elemen table-barang ada (di index.html)
            if (tableBarang) {
                let barisHTML = '';
                hasil.data.forEach((data_barang, index) => {
                    barisHTML += `
                    <tr class="bg-white border-b text-center p-2 hover:bg-gray-50 transition-colors">
                        <td class="text-left pl-4 py-2">${index + 1}</td>
                        <td class="text-left pl-2 py-2 font-medium">${data_barang.nama_barang}</td>
                        <td class="text-center py-2 text-green-600">Rp ${data_barang.harga}</td>
                        <td class="text-center py-2">${data_barang.stok}</td>
                        <td class="text-center py-2">
                            <button onclick="hapusBarang(${data_barang.id})" class="px-3 py-1 bg-red-500 text-white text-xs rounded shadow hover:bg-red-600 transition-colors">
                                Hapus
                            </button>
                        </td>
                    </tr>
                    `;
                });
                tableBarang.innerHTML = barisHTML;
            }

            // Render ke card jika elemen card-barang ada (di index_card.html)
            if (cardBarang) {
                let cardHTML = '';
                hasil.data.forEach((data_barang, index) => {
                    cardHTML += `
                    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 w-full sm:w-64 border border-gray-100 flex flex-col">
                        <div class="flex-grow">
                            <h2 class="text-xl font-bold mb-2 text-gray-800 line-clamp-2">${data_barang.nama_barang}</h2>
                            <p class="text-xs text-gray-400 mb-4">No: ${index + 1}</p>
                        </div>
                        <div class="mt-auto border-t pt-4">
                            <p class="text-lg font-bold text-green-600 mb-1">Rp ${data_barang.harga}</p>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-500">Stok Tersedia</span>
                                <span class="font-semibold px-2 py-1 bg-orange-100 text-orange-800 rounded-md">${data_barang.stok}</span>
                            </div>
                        </div>
                    </div>
                    `;
                });
                cardBarang.innerHTML = cardHTML;
            }
        }
    }
    catch (error) {
        console.log('Gagal Mengambil Data', error);
    }
}

ambilDataBarang();

// Event Listener Submit untuk Tambah Barang (SPA Mode)
const formBarang = document.getElementById("form-barang");
if (formBarang) {
    formBarang.addEventListener("submit", async function (e) {
        e.preventDefault(); // Mencegah reload halaman

        const formData = new FormData(this);
        const payload = {
            nama_barang: formData.get("nama_barang"),
            harga: formData.get("harga"),
            stok: formData.get("stok")
        };

        try {
            const res = await fetch("../api-toko/tambah_barang.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (result.success) {
                alert(result.message);
                this.reset(); // Kosongkan form
                ambilDataBarang(); // Refresh data tanpa reload
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            alert("Gagal mengirim data. Pastikan koneksi server aktif.");
        }
    });
}

// Fungsi untuk menghapus barang
async function hapusBarang(id) {
    if (!confirm("Yakin ingin menghapus barang ini?")) return;

    try {
        const res = await fetch("../api-toko/hapus_barang.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        });

        const result = await res.json();
        if (result.success) {
            alert(result.message);
            ambilDataBarang(); // Refresh data tanpa reload
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal menghubungi server untuk menghapus data.");
    }
}
