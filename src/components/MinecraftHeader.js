import React from "react";

const MinecraftHeader = () => {
    return (
        <section className="bg-gray-100">
            <div className="container mx-auto p-8 flex justify-center ">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <p className="text-xl font-semibold mb-4">Convert Minecraft textures and models</p>
                    <p className="text-gray-500 mb-4">Use this tool to convert Minecraft textures and models from the Java Edition to the Bedrock Edition. Simply select the file you want to convert and click Upload.</p>
                    <p className="text-gray-500">The conversion process may take a few minutes, depending on the size of the file.</p>
                </div>
            </div>
        </section>
    );
};

export default MinecraftHeader;
