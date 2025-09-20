import Image from "next/image";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-screen h-screen">
            <div className="w-full h-full flex justify-between max-lg:justify-center items-center">
                <div className="w-[50%] max-lg:w-full h-full">{children}</div>
                <div className="w-[50%] h-full shadow-lg backdrop-blur-md max-lg:hidden fixed right-0 left-[50%]">
                    <img src="/AuthImage.webp" alt="auth-image" className="w-full h-full object-cover" />
                </div>
            </div>
        </main>
    );
}
