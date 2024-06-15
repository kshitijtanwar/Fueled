import React, { useState } from "react";

interface UtilityContextProps {
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
    isHost: boolean;
    setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UtilityContext = React.createContext<UtilityContextProps>({
    render: false,
    setRender: () => {},
    isHost: false,
    setIsHost: () => {},
});

export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [render, setRender] = useState<boolean>(false);
    const [isHost, setIsHost] = useState<boolean>(false);

    return (
        <UtilityContext.Provider
            value={{ render, setRender, isHost, setIsHost }}
        >
            {children}
        </UtilityContext.Provider>
    );
};
