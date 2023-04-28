import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Message-Contact</title>
      </Head>
      <Sidebar />
    </div>
  );
}
