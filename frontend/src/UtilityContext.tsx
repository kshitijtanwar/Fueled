import React, { useState } from "react";
import { UserType } from "./definitions";
interface UtilityContextProps {
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
    isHost: boolean;
    setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: UserType | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export const UtilityContext = React.createContext<UtilityContextProps>({
    render: false,
    setRender: () => {},
    isHost: false,
    setIsHost: () => {},
    userInfo: null,
    setUserInfo: () => {},
});

export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [render, setRender] = useState<boolean>(false);
    const [isHost, setIsHost] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserType | null>(null);

    return (
        <UtilityContext.Provider
            value={{ render, setRender, isHost, setIsHost, userInfo , setUserInfo}}
        >
            {children}
        </UtilityContext.Provider>
    );
};
