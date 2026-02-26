const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-twin-x', { useNewUrlParser: true, useUnifiedTopology: true, })
.then(() => { console.log('MongoDB connected'); })
.catch((err) => { console.error('MongoDB error:', err); process.exit(1); });
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/twins', require('./routes/twin.routes'));
app.use('/api/chat', require('./routes/chat.routes'));
app.use('/api/voice', require('./routes/voice.routes'));
app.use('/api/avatar', require('./routes/avatar.routes'));
app.use('/api/forwarding', require('./routes/forwarding.routes'));
app.get('/health', (req, res) => { res.json({ status: 'Server running' }); });
app.use((req, res) => { res.status(404).json({ message: 'Not found' }); });
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: 'Server error' }); });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
module.exports = app;