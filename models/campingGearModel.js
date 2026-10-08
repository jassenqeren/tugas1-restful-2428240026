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

const getAll = (kategori) => {
  if (kategori) {
    return campingGears.filter(
      (item) => item.kategori === kategori
    );
  }

  return campingGears;
};

const getById = (id) => {
  return campingGears.find(
    (item) => item.id === id
  );
};

const create = (data) => {
  const dataBaru = {
    id: nextId++,
    namaAlat: data.namaAlat,
    kategori: data.kategori,
    kapasitas: data.kapasitas,
    hargaSewaPerHari: data.hargaSewaPerHari,
    stok: data.stok
  };

  campingGears.push(dataBaru);

  return dataBaru;
};

const update = (id, data) => {
  const index = campingGears.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return null;
  }

  campingGears[index] = {
    id,
    namaAlat: data.namaAlat,
    kategori: data.kategori,
    kapasitas: data.kapasitas,
    hargaSewaPerHari: data.hargaSewaPerHari,
    stok: data.stok
  };

  return campingGears[index];
};

const remove = (id) => {
  const index = campingGears.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return null;
  }

  const dataDihapus = campingGears.splice(index, 1);

  return dataDihapus[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  kategoriValid
};