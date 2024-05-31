"use client";

import Image from "next/image";

import logo from "@/assets/logo-galp.png";
import logoLavagem from "@/assets/logo-lavagem-auto.png";
import logoGalindo from "@/assets/logo-galindo.png";
import { CalendarComponent } from "@/components/CalendarComponent";
import { FormComponent } from "@/components/FormComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-start items-center h-16 border-b-2 border-gray-300 ">
        <Image className="w-32" src={logo} alt="Logo Galp Viatodos" />
        <Image className="w-32" src={logoLavagem} alt="Logo Lavagem Auto" />
        <Link href="https://www.linkedin.com/in/galindoptbr/" target="_blank">
          <Image className="w-32" src={logoGalindo} alt="Logo Galindo" />
        </Link>
      </div>
      <CalendarComponent />
      <FormComponent />
    </>
  );
}
