var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public"));//подключается к папке паблик

app.get("/", function (req, res) {//определяют конкретные адреса (конечные точки), в которых могут быть созданы запросы
    res.sendFile(__dirname + "/index.html");//Передает файл в указанный путь
});

app.get("/help", function (req, res) {//определяют конкретные адреса (конечные точки), в которых могут быть созданы запросы
    res.json("Оно работает");//Передает файл в указанный путь
});

io.on("connection", function (socket) {//Начать прослушивание событий сокета от Sails с указанным подключением
    socket.on("send message", function (msg) {// получаем данные от клиента
        io.emit("receive message", msg);//генерирует событие
    });
});

http.listen(3000, function () {//Метод http.listen создает прослушиватель на порту 3000.
    console.log("listening on *:3000");
});
