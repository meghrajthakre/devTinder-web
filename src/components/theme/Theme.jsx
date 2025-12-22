import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const Theme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "valentine"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "luxury" ? "valentine" : "luxury"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-xl bg-base-300 border border-2 border-base-100 hover:bg-base-200 transition-all duration-200 shadow-sm active:scale-105"
        >
            {theme === "luxury" ? (
                <Sun size={18} className="transition-transform  active:rotate-45" />
            ) : (
                <Moon size={18} className="transition-transform text-primary active:rotate-45" />
            )}
        </button>
    );
};

export default Theme;
