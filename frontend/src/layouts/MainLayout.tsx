

import { ReactNode, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface Props {
    children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className="flex min-w-0 flex-1 flex-col lg:ml-0">
                <Navbar setMobileOpen={setMobileOpen} />

                {/* <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </main> */}
                <div className="flex flex-1 flex-col bg-slate-50">

                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>

                    <Footer />

                </div>
            </div>
        </div>
    );
};

export default MainLayout;