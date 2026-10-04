# Tugas 1 RESTful API Express

## Identitas

Nama: Jassen Nova Tabalujan

NPM: 2428240026

Topik 6: Rental Alat Kemah - Peralatan Kemah

Endpoint: /camping-gears

## Deskripsi

RESTful API untuk mengelola data peralatan kemah yang dapat disewa.

API ini menyediakan fitur:
- Menampilkan seluruh data peralatan kemah
- Menampilkan data berdasarkan ID
- Menambahkan data peralatan kemah
- Mengubah data peralatan kemah
- Menghapus data peralatan kemah
- Filter data berdasarkan kategori

## Endpoint

### GET /camping-gears

Menampilkan seluruh data peralatan kemah.

### GET /camping-gears/:id

Menampilkan data peralatan berdasarkan ID.

Contoh:

/camping-gears/1

### GET /camping-gears?kategori=tenda

Menampilkan data berdasarkan kategori.

Contoh:

/camping-gears?kategori=tenda

### POST /camping-gears

Menambahkan data peralatan kemah.

Contoh request:

{
  "namaAlat": "Tenda Dome 4 Orang",
  "kategori": "tenda",
  "kapasitas": 4,
  "hargaSewaPerHari": 50000,
  "stok": 6
}

### PUT /camping-gears/:id

Mengubah data peralatan kemah berdasarkan ID.

### DELETE /camping-gears/:id

Menghapus data peralatan kemah berdasarkan ID.

## Field Data

| Field | Tipe | Keterangan |
|---|---|---|
| namaAlat | string | Nama alat kemah |
| kategori | string | tenda, tas, masak, penerangan |
| kapasitas | number | Kapasitas alat |
| hargaSewaPerHari | number | Harga sewa per hari |
| stok | number | Jumlah stok |

## Menjalankan Project

Install dependency:

npm install

Menjalankan server:

npm start

Server berjalan pada:

http://localhost:3000

## Repository

Repository GitHub:

https://github.com/jassengeren/tugas1-restful-2428240026

## Deployment

Link deployment Vercel akan ditambahkan setelah proses deployment selesai.