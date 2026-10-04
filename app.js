require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let campingGears = [
  {
    id: 1,
    namaAlat: "Tenda Dome 4 Orang",
    kategori: "tenda",
    kapasitas: 4,
    hargaSewaPerHari: 50000,
    stok: 6
  },
  {
    id: 2,
    namaAlat: "Tas Carrier 60L",
    kategori: "tas",
    kapasitas: 60,
    hargaSewaPerHari: 40000,
    stok: 8
  },
  {
    id: 3,
    namaAlat: "Kompor Portable",
    kategori: "masak",
    kapasitas: 2,
    hargaSewaPerHari: 30000,
    stok: 5
  }
];

let nextId = 4;

const kategoriValid = [
  "tenda",
  "tas",
  "masak",
  "penerangan"
];

app.get('/camping-gears', (req, res) => {
  const { kategori } = req.query;

  let data = campingGears;

  if (kategori) {
    data = campingGears.filter(
      (item) => item.kategori === kategori
    );
  }

  res.status(200).json(data);
});

app.get('/camping-gears/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const data = campingGears.find(
    (item) => item.id === id
  );

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
      data: null
    });
  }

  res.status(200).json(data);
});

app.post('/camping-gears', (req, res) => {
  const {
    namaAlat,
    kategori,
    kapasitas,
    hargaSewaPerHari,
    stok
  } = req.body;


  if (!namaAlat) {
    return res.status(400).json({
      status: "error",
      message: "Field namaAlat wajib diisi",
      data: null
    });
  }

  if (!kategori) {
    return res.status(400).json({
      status: "error",
      message: "Field kategori wajib diisi",
      data: null
    });
  }

  if (!kategoriValid.includes(kategori)) {
    return res.status(400).json({
      status: "error",
      message: "Kategori harus tenda, tas, masak, atau penerangan",
      data: null
    });
  }

  if (
    hargaSewaPerHari === undefined ||
    hargaSewaPerHari === null
  ) {
    return res.status(400).json({
      status: "error",
      message: "Field hargaSewaPerHari wajib diisi",
      data: null
    });
  }

  if (stok === undefined || stok === null) {
    return res.status(400).json({
      status: "error",
      message: "Field stok wajib diisi",
      data: null
    });
  }

  const dataBaru = {
    id: nextId++,
    namaAlat,
    kategori,
    kapasitas,
    hargaSewaPerHari,
    stok
  };

  campingGears.push(dataBaru);

  res.status(201).json({
    status: "success",
    message: "Data peralatan kemah berhasil ditambahkan",
    data: dataBaru
  });
});

app.put('/camping-gears/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = campingGears.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
      data: null
    });
  }

  const {
    namaAlat,
    kategori,
    kapasitas,
    hargaSewaPerHari,
    stok
  } = req.body;

  if (!namaAlat) {
    return res.status(400).json({
      status: "error",
      message: "Field namaAlat wajib diisi",
      data: null
    });
  }

  if (!kategori) {
    return res.status(400).json({
      status: "error",
      message: "Field kategori wajib diisi",
      data: null
    });
  }

  if (!kategoriValid.includes(kategori)) {
    return res.status(400).json({
      status: "error",
      message: "Kategori harus tenda, tas, masak, atau penerangan",
      data: null
    });
  }

  if (
    hargaSewaPerHari === undefined ||
    hargaSewaPerHari === null
  ) {
    return res.status(400).json({
      status: "error",
      message: "Field hargaSewaPerHari wajib diisi",
      data: null
    });
  }

  if (stok === undefined || stok === null) {
    return res.status(400).json({
      status: "error",
      message: "Field stok wajib diisi",
      data: null
    });
  }

  campingGears[index] = {
    id,
    namaAlat,
    kategori,
    kapasitas,
    hargaSewaPerHari,
    stok
  };

  res.status(200).json({
    status: "success",
    message: "Data peralatan kemah berhasil diperbarui",
    data: campingGears[index]
  });
});

app.delete('/camping-gears/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = campingGears.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data tidak ditemukan",
      data: null
    });
  }

  const dataDihapus = campingGears.splice(index, 1);

  res.status(200).json({
    status: "success",
    message: "Data peralatan kemah berhasil dihapus",
    data: dataDihapus[0]
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null
  });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;