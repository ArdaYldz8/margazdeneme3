import app from './app';
import dotenv from 'dotenv';
import { SerialService } from './services/serial.service';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize Services
new SerialService();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
