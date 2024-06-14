import axios from 'axios';

const API_URL = 'http://localhost:8080/api/itens';

export const gerarRelatorio = async (): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_URL}/gerar-relatorio-pdf`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};

export const adicionarValor = async (payload: any) => {
  try {
    // Certifique-se de que o endpoint está correto
    const response = await axios.post(`${API_URL}/adicionar`, payload);
    return response.data;
  } catch (error) {
    console.log("Erro ao adicionar:", error);
    throw error;
  }
};


export const listarValores = async () => {
  try {
    const response = await axios.get(`${API_URL}/listar`, {
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao listar valores anteriores:', error);
    throw error;
  }
};