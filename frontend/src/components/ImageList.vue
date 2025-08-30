<template>
    <div class="list-container">
        <h2>Imagens Enviadas</h2>
        <div class="gallery">
            <div v-for="(img, index) in images" :key="index" class="image-card">
                <img :src="img.imgUrl" :alt="img.alt"/>
                <p class="desc">{{img.descricao}}</p>

                <div class="actions">
                    <button @click="deleteImage(img._id)" class="btn delete">Excluir</button>

                    <button @click="promptUp(img._id)" class="btn update">Atualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .image-card {
    border: 1px solid #ffffff;
    border-radius: 8px;
    padding: 10px;
    background: rgba(238, 237, 237, 0.459);
    color: #f7f4f4;
    text-align: center;
  }

  .image-card img {
    max-width: 150px; 
    margin: 10px;
    border-radius: 6px;
  }

  .desc {
    font-size: 14px;
    margin: 10px 0;
    max-height: 100px;
    overflow-y: auto;
    padding-right: 5px;
  }

  .actions {
    margin-top: auto;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }

  .delete {
    background: #f00a0a;
    color: white;
    transition: .4s;
  }

  .delete:hover {
    background: #a70303;
  }

  .update {
    background: #3498db;
    color: white;
    transition: .4s;
  }

  .update:hover {
    background: #035d99;
  }
  
</style>

<script>
import axios from 'axios';

export default {
  name: 'ImageList',
  data() {
    return {
      images: []
    };
  },
  methods: {
    async loadImages() {
      try {
        const response = await axios.get('https://imerssao-alura.onrender.com/posts');  // substitua pela a url local para testar a listagem de posts http://localhost:3000/posts
        
        this.images = response.data; // Supondo que o backend retorna uma lista de imagens
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    },
    async deleteImage(id) {
      try {
        await axios.delete(`https://imerssao-alura.onrender.com/delete/${id}`); // substitua pela a url local para realizar o delete de imagens http://localhost:3000/delete/:id
        this.loadImages(); // Recarrega a lista após a exclusão
      } catch (error) {
        console.error('Erro ao excluir imagem:', error);
      }
    },
    async atualizarImage(id, alt) {
      try {
        await axios.put(`https://imerssao-alura.onrender.com/upload/${id}`, {alt}); // substitua pela a url local para realizar o update de imagens http://localhost:3000/upload/:id
        
        this.loadImages(); // Recarrega a lista após a atualização
      } catch (error) {
        console.error('Erro ao atualizar imagem:', error);
      }
    },
    promptUp(id) {
      const alt = prompt("Digite um texto alternativo (alt) para essa imagem:");
      if (alt != null && alt.trim() !== "") {
        this.atualizarImage(id, alt);
      }
    },
  },
  mounted() {
    this.loadImages();
  }
}
</script>