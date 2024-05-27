"use client";

import React, { useState } from "react";

export const FormComponent = () => {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [lavagem, setLavagem] = useState("Completa");
  const [pagamento, setPagamento] = useState(13);
  const [gorjeta, setGorjeta] = useState(0);
  const [foiPago, setFoiPago] = useState(false);

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
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPagamento(value);
    } else {
      return;
    }
  };

  const handleGorjetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setGorjeta(value);
    } else {
      return;
    }
  };

  const handleFoiPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoiPago(e.target.checked);
  };

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
                className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8 w-72"
                type="number"
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
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Gorjeta:</label>
            <input
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="number"
              value={gorjeta}
              onChange={handleGorjetaChange}
            />
          </div>
        </form>
      </div>
    </>
  );
};
