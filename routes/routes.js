const { Router } = require('express');
const router = Router();
const fs = require('fs');

const celularesFile = fs.readFileSync("./celulares.json", "utf8");
let celulares = JSON.parse(celularesFile);

router.get("/", (req, res) => {
    res.json("Bienvenido a mi API");
});

router.get("/celulares", (req, res) => {
    res.status(200).json(celulares);
});

router.post("/celulares", (req, res) => {

    const { marca, modelo, capacidad, fechadelanzamiento } = req.body;

    if (!marca || !modelo || !capacidad || !fechadelanzamiento) {
        res.status(401).json({ error: "Por favor, diligencie todos los datos" });
    } else {

        const id = celulares.length + 1;

        let newCelular = {
            id,
            marca,
            modelo,
            capacidad,
            fechadelanzamiento
        };

        celulares.push(newCelular);
        const json_celulares = JSON.stringify(celulares);

        fs.writeFileSync("./celulares.json", json_celulares, "utf-8");

        res.status(200).json(celulares);
    }
});

router.put("/celulares/:id", (req, res) => {

    const { marca, modelo, capacidad, fechadelanzamiento } = req.body;
    const id = req.params.id;

    if (!marca || !modelo || !capacidad || !fechadelanzamiento || !id) {
        res.status(401).json({ error: "Debe completar los datos y especificar el id." });
    } else {

        celulares.filter((celular) => {
            if (celular.id == id) {
                celular.marca = marca;
                celular.modelo = modelo;
                celular.capacidad = capacidad;
                celular.fechadelanzamiento = fechadelanzamiento;

            };
        });

        const json_celulares = JSON.stringify(celulares);
        fs.writeFileSync("./celulares.json", json_celulares, "utf-8");

        res.status(200).json(celulares);
    }

});


router.delete("/celulares/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ error: "Especifique un id" });
    } else {
        const indexCelular = celulares.findIndex((celular) => celular.id === id);
        movies.splice(indexCelular, 1);

        const json_celulares = JSON.stringify(celulares);
        fs.writeFileSync("./celulares.json", json_celulares, "utf-8");

        res.status(200).json(celulares);
    }
});

module.exports = router;