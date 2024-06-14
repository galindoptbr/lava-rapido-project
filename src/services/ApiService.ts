import axios from 'axios';

const API_URL = 'http://localhost:8080/api/itens';

export const gerarRelatorio = async (data: string): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_URL}/gerar-relatorio`, {
      params: { data },
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    throw error;
  }
};


export const adicionarValor = async (payload: any) => {
  try {
    const response = await axios.post(`${API_URL}/adicionar`, payload);
    return response.data;
  } catch (error) {
    console.log("Erro ao adicionar:", error);
    throw error;
  }
};


export const listarValores = async (data: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/listar`, {
      params: { data },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao listar valores:', error);
    throw error;
  }
};