const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                "grey-primary": "#BFC1C0",
                "grey-secondary": "#565B5E",
                "grey-tertiary": "#24292C",
                "indigo-primary": "#595fb2",
                "indigo-secondary": "#292E6D",
                "indigo-tertiary": "#181B40",
            },
            fontFamily: {
                caveat: ["Caveat", "cursive"],
            },
        },
    },
    plugins: [flowbite.plugin()],
};
