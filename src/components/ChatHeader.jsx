import React from 'react'
import Back from './buttons/Back';

const ChatHeader = ({ partner }) => {
    /* ----------------- Utilities ----------------- */
    const formatLastSeen = (date) => {
        if (!date) return "";

        const lastSeen = new Date(date);
        const now = new Date();

        const isToday =
            lastSeen.getDate() === now.getDate() &&
            lastSeen.getMonth() === now.getMonth() &&
            lastSeen.getFullYear() === now.getFullYear();

        const isYesterday =
            lastSeen.getDate() === now.getDate() - 1 &&
            lastSeen.getMonth() === now.getMonth() &&
            lastSeen.getFullYear() === now.getFullYear();

        const time = lastSeen.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        if (isToday) return `Last seen today at ${time}`;
        if (isYesterday) return `Last seen yesterday at ${time}`;

        const dateStr = lastSeen.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return `Last seen ${dateStr} at ${time}`;
    };
    return (
        <div className="flex items-center justify-between gap-2 px-4 border-b bg-base-100 shadow sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <img
                    src={partner?.photourl || "https://i.pravatar.cc/40"}
                    className="h-9 w-9 rounded-full"
                    alt="avatar"
                />
                <div className="flex flex-col">
                    <div className="font-semibold">
                        {partner?.firstName} {partner?.lastName}
                    </div>
                    <div
                        className={`text-xs ${partner?.isOnline ? "text-green-500" : "text-gray-500"
                            }`}
                    >
                        {partner?.isOnline
                            ? "Online"
                            : partner?.lastSeen
                                ? formatLastSeen(partner.lastSeen)
                                : ""}
                    </div>
                </div>
            </div>
            <Back />
        </div>
    );
};


export default ChatHeader
