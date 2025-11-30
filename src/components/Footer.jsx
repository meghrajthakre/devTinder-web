import React from "react";
import { Mail, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content items-center p-4 fixed bottom-0 left-0 w-full shadow-md">
            
            <aside className="grid-flow-col items-center">
                <p>
                    Copyright © {new Date().getFullYear()} — All rights
                    reserved
                </p>
            </aside>

            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">

                {/* X / Twitter */}
                <a
                    href="https://x.com"
                    target="_blank"
                    className="cursor-pointer hover:opacity-70 transition"
                >
                    <Twitter size={24} className="text-base-content" />
                </a>

                {/* Gmail */}
                <a
                    href="mailto:meghrajthakre444@gmail.com"
                    className="cursor-pointer hover:opacity-70 transition"
                >
                    <Mail size={24} className="text-base-content" />
                </a>

            </nav>
        </footer>
    );
};

export default Footer;
