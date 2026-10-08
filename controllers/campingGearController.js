const campingGearModel = require('../models/campingGearModel');

const getAll = (req, res, next) => {
  try {
    const { kategori } = req.query;

    const data = campingGearModel.getAll(kategori);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const data = campingGearModel.getById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
        data: null
      });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const create = (req, res, next) => {
  try {
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

    if (!campingGearModel.kategoriValid.includes(kategori)) {
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

    const dataBaru = campingGearModel.create({
      namaAlat,
      kategori,
      kapasitas,
      hargaSewaPerHari,
      stok
    });

    res.status(201).json({
      status: "success",
      message: "Data peralatan kemah berhasil ditambahkan",
      data: dataBaru
    });
  } catch (error) {
    next(error);
  }
};

const update = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

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

    if (!campingGearModel.kategoriValid.includes(kategori)) {
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

    const data = campingGearModel.update(id, {
      namaAlat,
      kategori,
      kapasitas,
      hargaSewaPerHari,
      stok
    });

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
        data: null
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data peralatan kemah berhasil diperbarui",
      data
    });
  } catch (error) {
    next(error);
  }
};

const remove = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const dataDihapus = campingGearModel.remove(id);

    if (!dataDihapus) {
      return res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan",
        data: null
      });
    }

    return res.status(204).send();
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};