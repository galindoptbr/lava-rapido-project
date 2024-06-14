"use client";

import React, { useState } from "react";
import { adicionarValor } from "@/services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormRate from "./Form-rate";

const defaultObj = {
  marca: "",
  matricula: "",
  lavagem: "",
  pagamento: 0,
  gorjeta: 0,
  foiPago: false,
};

export const FormComponent = () => {
  const [data, setData] = useState(defaultObj);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const salvarLavagem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validateFields()) {
        return;
      }
      await adicionarValor(data);
      toast.success("Lavagem adicionada com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setData(defaultObj);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erro ao adicionar lavagem: ", error);
      toast.error("Erro ao adicionar lavagem.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const validateFields = () => {
    if (
      !data.marca ||
      !data.matricula ||
      !data.lavagem ||
      !data.pagamento ||
      !data.gorjeta
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setError(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <div>
        <form onSubmit={salvarLavagem}>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Marca/Modelo:</label>
            <input
              name="marca"
              value={data.marca}
              placeholder="Mercedes, Bmw, Tesla, Toyota..."
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Matrícula:</label>
            <input
              name="matricula"
              value={data.matricula}
              placeholder="Matrícula do carro..."
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Lavagem:</label>
            <input
              name="lavagem"
              value={data.lavagem}
              placeholder="Completa, Fora..."
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center px-2 gap-3">
            <div className="flex flex-col">
              <label className="font-semibold text-[#EA642D]">Valor:</label>
              <input
                name="pagamento"
                value={data.pagamento}
                className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8 w-64"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2 mr-4 mt-5">
              <label className="font-bold text-[#EA642D]">Pago</label>
              <input
                name="foiPago"
                checked={data.foiPago}
                type="checkbox"
                onChange={handleChange}
                className="w-6 h-6"
              />
            </div>
          </div>
          <div className="flex flex-col px-2">
            <label className="font-semibold text-[#EA642D]">Gorjeta:</label>
            <input
              name="gorjeta"
              value={data.gorjeta}
              className="border border-gray-300 focus:border-2 focus:border-[#EA642D] focus:outline-none bg-[#403C3D] p-2 text-zinc-100 text-bold rounded h-8"
              type="number"
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-red-500 text-center mt-2">{errorMessage}</div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#EA642D] p-2 w-80 rounded-full mt-10 text-white font-bold"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />

      <FormRate />

    </>
  );
};
