import React, { useState, useEffect } from "react";
import { listarValores, gerarRelatorio } from "@/services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormRate = () => {
    const [totalPagamento, setTotalPagamento] = useState<number>(0);
    const [totalGorjeta, setTotalGorjeta] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itens = await listarValores();

                // Calcular o total de pagamento convertendo para número
                const totalPagamento = itens.reduce((total: number, item: any) => total + parseFloat(item.pagamento), 0);

                // Calcular o total de gorjeta convertendo para número
                const totalGorjeta = itens.reduce((total: number, item: any) => total + parseFloat(item.gorjeta), 0);

                setTotalPagamento(totalPagamento);
                setTotalGorjeta(totalGorjeta);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                toast.error("Erro ao buscar dados.");
            }
        };

        fetchData();
    }, []);

    const generatePDF = async () => {
        try {
            const blobData = await gerarRelatorio();
            const url = window.URL.createObjectURL(new Blob([blobData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Relatorio_${new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            // Tratar o erro conforme necessário
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
            </div>
            <div className="flex justify-center">
                <button
                    onClick={generatePDF}
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
