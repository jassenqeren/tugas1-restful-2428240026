
const CampingGear = require('../models/campingGearModel');
const Category = require('../models/categoryModel');

const kategoriValid = [
  'tenda',
  'tas',
  'masak',
  'penerangan'
];

const deskripsiKategori = {
  tenda: 'Peralatan tempat berlindung saat berkemah',
  tas: 'Peralatan untuk membawa perlengkapan kemah',
  masak: 'Peralatan memasak saat berkemah',
  penerangan: 'Peralatan penerangan saat berkemah'
};

// GET semua data + filtering, pagination, sorting, projection
const getAll = async (req, res, next) => {
  try {
    const {
      kategori,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'asc',
      fields
    } = req.query;

    const pageNumber = Math.max(1, parseInt(page) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit) || 10));

    const filter = {};

    if (kategori) {
      const category = await Category.findOne({
        namaKategori: kategori.toLowerCase()
      });

      if (!category) {
        return res.status(200).json({
          status: 'success',
          data: [],
          pagination: {
            page: pageNumber,
            limit: limitNumber,
            totalData: 0,
            totalPages: 0
          }
        });
      }

      filter.categoryId = category._id;
    }

    const allowedSort = [
      'namaAlat',
      'hargaSewaPerHari',
      'stok',
      'createdAt'
    ];

    const sortField = allowedSort.includes(sortBy)
      ? sortBy
      : 'createdAt';

    const sortOrder = order === 'desc' ? -1 : 1;

    const projection = fields
      ? fields.split(',').join(' ')
      : '';

    const totalData = await CampingGear.countDocuments(filter);

    const query = CampingGear.find(filter)
  .sort({ [sortField]: sortOrder })
  .skip((pageNumber - 1) * limitNumber)
  .limit(limitNumber);

if (fields) {
  query.select(projection);
} else {
  query.populate('categoryId');
}

const data = await query;

    res.status(200).json({
      status: 'success',
      data,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalData,
        totalPages: Math.ceil(totalData / limitNumber)
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET berdasarkan ID
const getById = async (req, res, next) => {
  try {
    const data = await CampingGear.findById(req.params.id)
      .populate('categoryId');

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Data tidak ditemukan',
        data: null
      });
    }

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    next(error);
  }
};

// POST tambah data
const create = async (req, res, next) => {
  try {
    const {
      namaAlat,
      kategori,
      kapasitas,
      satuanKapasitas,
      hargaSewaPerHari,
      stok
    } = req.body;

    if (!namaAlat || !kategori) {
      return res.status(400).json({
        status: 'error',
        message: 'Field namaAlat dan kategori wajib diisi'
      });
    }

    if (!kategoriValid.includes(kategori.toLowerCase())) {
      return res.status(400).json({
        status: 'error',
        message: 'Kategori harus tenda, tas, masak, atau penerangan'
      });
    }

    if (
      kapasitas === undefined ||
      !satuanKapasitas ||
      hargaSewaPerHari === undefined ||
      stok === undefined
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Kapasitas, satuanKapasitas, hargaSewaPerHari, dan stok wajib diisi'
      });
    }

    const namaKategori = kategori.toLowerCase();

    let category = await Category.findOne({
      namaKategori
    });

    if (!category) {
      category = await Category.create({
        namaKategori,
        deskripsi: deskripsiKategori[namaKategori]
      });
    }

    const dataBaru = await CampingGear.create({
      namaAlat,
      categoryId: category._id,
      detail: {
        kapasitas,
        satuanKapasitas
      },
      hargaSewaPerHari,
      stok
    });

    await dataBaru.populate('categoryId');

    res.status(201).json({
      status: 'success',
      message: 'Data peralatan kemah berhasil ditambahkan',
      data: dataBaru
    });
  } catch (error) {
    next(error);
  }
};

// PUT update data
const update = async (req, res, next) => {
  try {
    const {
      namaAlat,
      kategori,
      kapasitas,
      satuanKapasitas,
      hargaSewaPerHari,
      stok
    } = req.body;

    if (!namaAlat || !kategori) {
      return res.status(400).json({
        status: 'error',
        message: 'Field namaAlat dan kategori wajib diisi'
      });
    }

    if (!kategoriValid.includes(kategori.toLowerCase())) {
      return res.status(400).json({
        status: 'error',
        message: 'Kategori tidak valid'
      });
    }

    if (
      kapasitas === undefined ||
      !satuanKapasitas ||
      hargaSewaPerHari === undefined ||
      stok === undefined
    ) {
      return res.status(400).json({
        status: 'error',
        message: 'Semua field wajib diisi'
      });
    }

    const namaKategori = kategori.toLowerCase();

    let category = await Category.findOne({
      namaKategori
    });

    if (!category) {
      category = await Category.create({
        namaKategori,
        deskripsi: deskripsiKategori[namaKategori]
      });
    }

    const data = await CampingGear.findByIdAndUpdate(
      req.params.id,
      {
        namaAlat,
        categoryId: category._id,
        detail: {
          kapasitas,
          satuanKapasitas
        },
        hargaSewaPerHari,
        stok
      },
      {
        new: true,
        runValidators: true
      }
    ).populate('categoryId');

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Data tidak ditemukan',
        data: null
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Data peralatan kemah berhasil diperbarui',
      data
    });
  } catch (error) {
    next(error);
  }
};

// DELETE data
const remove = async (req, res, next) => {
  try {
    const data = await CampingGear.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Data tidak ditemukan',
        data: null
      });
    }

    res.status(204).send();
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
