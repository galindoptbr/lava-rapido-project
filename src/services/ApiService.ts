import axios from 'axios';

const API_URL = 'http://localhost:8080/api/itens';

export const gerarRelatorio = async (): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_URL}/relatorio-diario`, {
      responseType: 'blob', // Para receber o PDF como um blob
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};

export const adicionarValor = async () => {
  try {
    const response = await axios.post(`${API_URL}/adicionar`, {
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar:', error);
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