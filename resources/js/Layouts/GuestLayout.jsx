import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-red-500 drop-shadow-[0_0_10px_red]" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-gray-800 shadow-lg rounded-lg neon-red">
                {children}
            </div>
        </div>
    );
}
