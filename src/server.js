const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// PORT from environment variables or default to 30000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
