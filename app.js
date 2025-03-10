const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { consumeMessages } = require("./config/rabbitmq");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const usersRouters = require('./routes/usersRoutes');
app.use('/api/users', usersRouters);

const aboutRouters = require('./routes/aboutRoutes')
app.use('/api/profile', aboutRouters)

const messageRouters = require("./routes/messageRoutes");
app.use("/api/message", messageRouters);

// Connect to database
connectDB();

// Consume messages from RabbitMQ
consumeMessages((message) => {
    if (message) {
        console.log(`Notifikasi: ${message.sender} mengirim pesan ke ${message.receiver}`);
    } else {
        console.log("Tidak ada pesan diterima");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
