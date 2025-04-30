aconst express = require('express');
const connectDB = require('./utils/connectDB');
const cors = require('cors');
require('dotenv').config();
const corsOptions = require('./constants/config');
const cookieParser = require('cookie-parser');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Mongo URI
const mongoURI = process.env.MONGO_URI;

// Async function to connect DB and start server
(async () => {
  try {
    await connectDB(mongoURI);
    console.log('Connected to MongoDB');

    // Routes
    const authRoutes = require('./routes/auth.routes');
    const taskRoutes = require('./routes/task.routes');
    app.use('/api/auth', authRoutes);
    app.use('/api/tasks', taskRoutes);

    // Basic route
    app.get('/', (req, res) => {
      res.send('Hello from Node server!');
    });

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('DB Connection Error:', error.message);
  }
})();
