import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarPosts(req, res) {
    const newPost = req.body;
    try {
        const postCriado = await criarPost(newPost);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error": "Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCriado = await criarPost(newPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada)

        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error": "Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const desc = await gerarDescricaoGemini(imageBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: desc,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error": "Falha na requisição"})
    }
}