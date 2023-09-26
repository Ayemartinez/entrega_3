import express from 'express';
import fs from 'fs';

const app = express();
const archivoJson = 'productos.json';

app.use(express.json());
app.get('/productos', (req, res) => {
    try {
        const data = fs.readFileSync(archivoJson, 'utf-8');
        const productos = JSON.parse(data);
        res.json(productos);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
    }
});

app.get('/productos/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const data = fs.readFileSync(archivoJson, 'utf-8');
        const productos = JSON.parse(data);
        const producto = productos.find((p) => p.id === productId);

        if (!producto) {
            console.log("Producto no encontrado.");
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.error("Error al obtener el producto.");
    }
});

app.listen(8080, () => {
    console.log('Servidor activo');
});
