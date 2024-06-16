import React, { useState } from "react";
import { UserType } from "./definitions";
interface UtilityContextProps {
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
    isHost: boolean;
    setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: UserType | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserType | null>>;
    eventName: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
}

export const UtilityContext = React.createContext<UtilityContextProps>({
    render: false,
    setRender: () => {},
    isHost: false,
    setIsHost: () => {},
    userInfo: null,
    setUserInfo: () => {},
    eventName: "",
    setEventName: () => {},
});

export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [render, setRender] = useState<boolean>(false);
    const [isHost, setIsHost] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserType | null>(null);
    const [eventName, setEventName] = useState<string>("");

    return (
        <UtilityContext.Provider
            value={{
                render,
                setRender,
                isHost,
                setIsHost,
                userInfo,
                setUserInfo,
                eventName,
                setEventName,
            }}
        >
            {children}
        </UtilityContext.Provider>
    );
};
