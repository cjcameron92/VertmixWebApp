import Head from 'next/head'
import { Inter } from 'next/font/google'
import FileUpload from "@/pages/converter";
import Navbar from "@/components/Navbar";
import MinecraftHeader from "@/components/MinecraftHeader";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Team Stellar</title>
                <meta name="description" content="We dev for you"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="flex flex-col items-center justify-center min-h-screen-3/4 bg-gray-100">
                <div className="container mx-auto px-4">
                    <Navbar />
                    <MinecraftHeader />
                    <div className="my-16">
                        <FileUpload />
                    </div>
                </div>
            </div>
        </div>
    )
}
