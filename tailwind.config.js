module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#570DF8",
                    secondary: "#E74C3C",
                    accent: "#17202A",
                    neutral: "#3D4451",
                    "base-100": "#FFFFFF",
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FFC300",
                    error: "#F87272",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
