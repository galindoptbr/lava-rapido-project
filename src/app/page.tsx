"use client";

import Image from "next/image";

import logo from "@/assets/logo-galp.png";
import { CalendarComponent } from "@/components/CalendarComponent";
import { FormComponent } from "@/components/FormComponent";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-16 border-b-2 border-[#403C3D] ">
        <Image className="w-32" src={logo} alt="Logo Galp Viatodos" />
      </div>
      <CalendarComponent />
      <FormComponent />
    </>
  );
}
