"use client";

import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Item {
  marca: string;
  modelo: string;
  lavagem: string;
  pagamento: number;
  gorjeta: string; // Tratando gorjeta como string
  foiPago: boolean;
}

export const FormComponent = () => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [lavagem, setLavagem] = useState("Completa");
  const [pagamento, setPagamento] = useState("13"); // Inicializa como string
  const [foiPago, setFoiPago] = useState(false);
  const [lista, setLista] = useState<Item[]>([]);

  const handleMarcaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarca(e.target.value);
  };
  const handleModeloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelo(e.target.value);
  };
  const handleLavagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLavagem(e.target.value);
  };
  const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagamento(e.target.value);
  };
  const handleFoiPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoiPago(e.target.checked);
  };

  const handleAdicionar = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newItem: Item = {
      marca,
      modelo,
      lavagem,
      pagamento: parseFloat(pagamento), // Converte para número ao adicionar
      gorjeta: "0", // Inicializa gorjeta como string
      foiPago,
    };
    setLista([...lista, newItem]);

    setMarca("");
    setModelo("");
    setLavagem("Completa");
    setPagamento("13"); // Reseta como string
    setFoiPago(false);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedLista = lista.map((item, idx) => {
      if (idx === index) {
        return { ...item, foiPago: !item.foiPago };
      }
      return item;
    });
    setLista(updatedLista);
  };

  const handleGorjetaChangeInList = (index: number, value: string) => {
    const updatedLista = [...lista];
    updatedLista[index].gorjeta = value; // Mantém como string
    setLista(updatedLista);
  };

  const handleRemover = (index: number) => {
    const updatedLista = lista.filter((_, idx) => idx !== index);
    setLista(updatedLista);
  };

  const totalPagamento = lista
    .filter((item) => item.foiPago)
    .reduce((total, item) => total + item.pagamento, 0);

  const totalGorjeta = lista.reduce((total, item) => total + parseFloat(item.gorjeta), 0); // Converte gorjeta para número

  return (
    <>
      <div>
        <form>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Marca:</label>
            <input
              placeholder="Mercedes, Bmw, Tesla, Toyota..."
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="text"
              value={marca}
              onChange={handleMarcaChange}
            />
          </div>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Modelo:</label>
            <input
              placeholder="Modelo do carro..."
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="text"
              value={modelo}
              onChange={handleModeloChange}
            />
          </div>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Lavagem:</label>
            <input
              placeholder="Completa, Fora..."
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="text"
              value={lavagem}
              onChange={handleLavagemChange}
            />
          </div>
          <div className="flex justify-between items-center px-2 gap-3">
            <div className="flex flex-col">
              <label className="font-semibold text-[#EA642D]">Valor:</label>
              <input
                className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8 w-64"
                type="text"
                value={pagamento}
                onChange={handlePagamentoChange}
              />
            </div>
            <div className="flex gap-2 mr-4 mt-5">
              <label className="font-bold text-[#EA642D]">Pago</label>
              <input
                type="checkbox"
                id="pagamento"
                checked={foiPago}
                onChange={handleFoiPagoChange}
                className="w-6 h-6"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAdicionar}
              className="bg-[#EA642D] p-2 w-96 rounded-full mt-4 text-white font-bold"
            >
              Adicionar
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="flex justify-center font-semibold text-xl text-[#EA642D] border-b border-gray-300">
            Lista de Lavagem
          </h2>
          {lista.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 font-semibold text-md gap-2 border-b border-gray-300 p-4 relative"
            >
              <p className="flex flex-col font-bold">
                Marca:
                <span className="font-semibold"> {item.marca}</span>
              </p>
              <p className="flex flex-col font-bold">
                Modelo:
                <span className="font-semibold"> {item.modelo}</span>{" "}
              </p>
              <p className="flex flex-col font-bold">
                Lavagem:
                <span className="font-semibold"> {item.lavagem}</span>
              </p>
              <p className="flex flex-col font-bold">
                Valor:
                <span className="font-semibold"> €{item.pagamento}</span>
              </p>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <label className="font-bold text-[#EA642D]">Gorjeta:</label>
                  <input
                    type="text"
                    value={item.gorjeta}
                    onChange={(e) =>
                      handleGorjetaChangeInList(
                        index,
                        e.target.value
                      )
                    }
                    className="h-8 w-16 border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="font-bold text-[#EA642D]">Pago</label>
                  <input
                    type="checkbox"
                    checked={item.foiPago}
                    onChange={() => handleCheckboxChange(index)}
                    className="w-6 h-6"
                  />
                </div>
                <button onClick={() => handleRemover(index)}>
                  <FaRegTrashAlt className="text-red-400 absolute right-0 top-3 mt-1 mr-3" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-center items-center p-4 mb-10 font-bold mt-4">
            <p className="text-lg">
              Total Caixa:
              <span className="text-[#EA642D] text-xl"> €{totalPagamento}</span>
            </p>
            <p className="text-lg">
              Total Gorjeta:
              <span className="text-[#EA642D] text-xl"> € {totalGorjeta}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
