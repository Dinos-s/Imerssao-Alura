import express from 'express';
import routes from './src/routes/postsRoutes.js';

// usa o express e converte os dados para serem lidos em json
const app = express();
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => {
    console.log('Server online...');
});

