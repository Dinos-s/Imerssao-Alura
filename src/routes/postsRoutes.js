import express from 'express';
import multer from 'multer';
import { atualizarNovoPost, listarPosts, postarPosts, uploadImagem, deletarPost } from '../controllers/postsController.js';
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    opitionsSuccessStatus: 200
}

// configuração de salvamento de imagem no windos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// milddlewere para incluir imagem
const upload = multer({dest:"./uploads", storage});

// para linux / mac:
// const upload = multer({dest:"./uploads"});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions))
    
    // Rota de buscar todos os posts na url '/posts
    app.get('/posts', listarPosts);

    // Rota para criar um post
    app.post('/posts', postarPosts);
    // Rota para subir uma imagem
    app.post('/upload', upload.single("imagem"), uploadImagem)

    // Rota para atualizar registro
    app.put('/upload/:id', atualizarNovoPost)

    //Rota para deleta uma registro
    app.delete('/delete/:id', deletarPost)
}

export default routes;