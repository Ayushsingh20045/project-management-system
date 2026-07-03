// // import { ReactNode } from "react";
// // import Sidebar from "../components/layout/Sidebar";
// // import Navbar from "../components/layout/Navbar";

// // interface Props {
// //     children: ReactNode;
// // }

// // const MainLayout = ({ children }: Props) => {
// //     return (
// //         <div className="flex">

// //             <Sidebar />

// //             <div className="flex flex-1 flex-col">

// //                 <Navbar />

// //                 <main className="flex-1 bg-slate-50 p-8">
// //                     {children}
// //                 </main>

// //             </div>

// //         </div>
// //     );
// // };

// // export default MainLayout;
// import { ReactNode } from "react";
// import Sidebar from "../components/layout/Sidebar";
// import Navbar from "../components/layout/Navbar";

// interface Props {
//     children: ReactNode;
// }

// const MainLayout = ({ children }: Props) => {
//     return (
//         <div className="flex min-h-screen bg-slate-100">
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Main Content */}
//             <div className="flex min-w-0 flex-1 flex-col">
//                 <Navbar />

//                 <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
//                     <div className="mx-auto w-full max-w-7xl">
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default MainLayout;

import { ReactNode, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

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

                <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;