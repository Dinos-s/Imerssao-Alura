import { ObjectId } from "mongodb";
import conectarBanco from "../config/dbConfig.js";
import "dotenv/config";

// Importa o arquivo de conexão como o mongo usando a variável de ambiente
const conexao = await conectarBanco(process.env.STRING_CONEXAO); 

// Função que pega todos os posts do banco de forma assincrona
export async function getTodosPosts() {
    const db = conexao.db('Imerssao-Alura');
    const colecao = db.collection('posts');

    // retorna um array com todos os docuemtos da coleção
    return colecao.find().toArray();
}

// Função para cadastrar um post no banco
export async function criarPost(post){
    const db = conexao.db('Imerssao-Alura');
    const colecao = db.collection('posts');
    
    return colecao.insertOne(post);
}

// Função para editar/atualizar post pelo id
export async function atualizarPost(id, novoPost) {
    const db = conexao.db('Imerssao-Alura');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id)

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}