require('dotenv').config();

const express = require('express');
const cors = require('cors');

const campingGearRoutes = require('./routes/campingGearRoutes');
const logger = require('./middlewares/logger');
const {
  errorHandler,
  notFound
} = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/camping-gears', campingGearRoutes);

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;