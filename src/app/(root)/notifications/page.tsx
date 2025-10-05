"use client";

import HeaderBox from "@/components/HeaderBox";
import {useUserStore} from "@/stores/useUserStore";
import React from "react";

const Notifications = () => {
    // @ts-ignore
    const {user} = useUserStore();

    return (
        <div className="w-full flex flex-col">
            <HeaderBox
                type="title"
                title="Notifications"
                subtext="View all your notifications in one place."
                user={{name: `${user?.firstName} ${user?.lastName}`, email: user?.email}}
            />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    // @ts-ignore
                    user?.notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="w-full h-40 p-2 bg-gray-200 rounded-lg shadow-md flex flex-col justify-center items-center gap-2"
                        >
                            <h1 className="text-lg font-bold text-gray-600">
                                {notification.title || "New Notification"}
                            </h1>
                            <p className="text-sm text-gray-600 text-center">{notification.message}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Notifications;
