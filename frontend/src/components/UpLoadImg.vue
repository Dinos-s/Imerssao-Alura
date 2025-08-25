<template>
  <div class="upload-container">
    <h1>Upload de Imagem</h1>
    <input type="file" @change="onFileChange"/>

    <button @click="uploadImage">
      Enviar
    </button>

    <div v-if="imageUrl" class="preview">
      <h2>Prévia da Imagem:</h2>
      <img :src="imageUrl" alt="Uploaded Image" style="max-width: 300px;"/>
    </div>

    <div v-if="uploadMsg" class="message">
      {{ uploadMsg }}
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #27ae60;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #1e8449;
}

.preview img {
  max-width: 100%;
  border-radius: 6px;
  margin-top: 8px;
}

.message {
  margin-top: 10px;
  font-weight: bold;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'UpLoadImg',
  emits: ['uploaded'],
  data() {
    return {
      selectedFile: null,
      imageUrl: null,
      uploadMsg: null
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    async uploadImage() {
      if (!this.selectedFile) {
        this.uploadMsg = 'Por favor, selecione um arquivo primeiro.';
        return;
      };

      try {
        const formData = new FormData();
        formData.append('image', this.selectedFile);

        await axios.post('https://imerssao-alura.onrender.com/upload', formData, { // substitua pela a url local para testar os upload http://localhost:3000/upload
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.uploadMsg = 'Imagem enviada com sucesso!';
        this.$emit('uploaded'); // Emite um evento para notificar o componente pai
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
        this.uploadMsg = 'Erro ao enviar a imagem.';
      }
    }
  }
}
</script>