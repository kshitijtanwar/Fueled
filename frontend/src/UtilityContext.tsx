import React, { useState } from "react";

interface UtilityContextProps {
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UtilityContext = React.createContext<UtilityContextProps>({
    render: false,
    setRender: () => {},
});

export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [render, setRender] = useState<boolean>(false);

    return (
        <UtilityContext.Provider value={{ render, setRender }}>
            {children}
        </UtilityContext.Provider>
    );
};
