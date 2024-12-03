const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

// Configura o middleware CORS
app.use(
  cors({
    origin: 'http://127.0.0.1:5500', // Permite apenas requisições do frontend na origem especificada
  })
);

// Rota para criar QR Code estático
app.post('/api/criar-pagamento', async (req, res) => {
  // Substitua pela sua chave Pix configurada no Asaas (pode ser CPF, CNPJ, E-mail ou Chave Aleatória)
  const chavePix = '49130193842'; // Sua chave Pix correta

  const token =
    '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwOTU4MjA6OiRhYWNoXzM3ZDM5YTkxLTAzODItNDhjZS1hYTVlLTQwZmE4ZDQ2NmIyNA=='; // Seu token do Asaas

  try {
    const response = await axios.post(
      'https://sandbox.asaas.com/api/v3/pix/qrCodes/static',
      {
        value: req.body.value, // Valor recebido do frontend
        key: chavePix, // Chave Pix que você tem configurada no Asaas
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          access_token: token,
        },
      }
    );

    // Log da resposta da API para verificar o formato
    console.log('Resposta da API Asaas:', response.data);

    res.status(200).json(response.data); // Retorna a resposta para o frontend
  } catch (error) {
    console.error('Erro na API Asaas:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erro ao criar QR Code',
    });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
