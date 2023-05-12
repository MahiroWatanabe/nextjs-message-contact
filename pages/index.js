import Sidebar from "@/components/Sidebar";
import { BooleanProvider } from "@/contexts/displayContext";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <BooleanProvider>
        <Head>
          <title>Message-Contact</title>
        </Head>
        <Sidebar />
      </BooleanProvider>
    </div>
  );
}
