import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen w-screen overflow-x-hidden lg:flex">
            <div className="flex">
                <div className="lg:w-[300px] hidden lg:flex">
                    <Sidebar />
                </div>
                <div className="lg:hidden w-full bg-gray-200 shadow-lg backdrop-blur-md">
                    <Navbar />
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-6 p-6">{children}</div>
        </main>
    );
}
