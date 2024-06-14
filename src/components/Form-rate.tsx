import React, { useState, useEffect } from "react";
import { listarValores, gerarRelatorio } from "@/services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormRate = () => {
    const [totalPagamento, setTotalPagamento] = useState<number>(0);
    const [totalGorjeta, setTotalGorjeta] = useState<number>(0);
    const [dataSelecionada, setDataSelecionada] = useState<string>(new Date().toISOString().split('T')[0]);

    const fetchData = async (data: string) => {
        try {
            const itens = await listarValores(data);

            const totalPagamento = itens.reduce((total: number, item: any) => total + parseFloat(item.pagamento), 0);
            const totalGorjeta = itens.reduce((total: number, item: any) => total + parseFloat(item.gorjeta), 0);

            setTotalPagamento(totalPagamento);
            setTotalGorjeta(totalGorjeta);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            toast.error("Erro ao buscar dados.");
        }
    };

    useEffect(() => {
        fetchData(dataSelecionada);
    }, [dataSelecionada]);

    const generateRate = async () => {
        try {
            const blob = await gerarRelatorio(dataSelecionada);
            const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Relatorio_${dataSelecionada}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao baixar relatório:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center p-4 mb-20 font-bold mt-4">
                <p className="text-lg">
                    Total Caixa:
                    <span className="text-[#EA642D] text-xl"> €{totalPagamento.toFixed(2)}</span>
                </p>
                <p className="text-lg">
                    Total Gorjeta:
                    <span className="text-[#EA642D] text-xl"> €{totalGorjeta.toFixed(2)}</span>
                </p>
                <input
                    type="date"
                    value={dataSelecionada}
                    onChange={(e) => setDataSelecionada(e.target.value)}
                    className="mt-4 p-2 border rounded"
                />
            </div>
            <div className="flex justify-center">
                <button
                    onClick={generateRate}
                    className="bg-[#EA642D] p-2 w-80 rounded-full text-white font-bold mb-20"
                >
                    Criar Relatório do Dia
                </button>
            </div>
            <ToastContainer />
        </>
    );
};

export default FormRate;
