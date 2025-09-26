/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.scss", "./src/**/*.css"],
    theme: {
        colors: {
            white: "var(--white)",
            black: "var(--black)",
            dark: "var(--dark)",
            green: "var(--green)",
            orange: "var(--orange)",
            blue: "var(--blue)",
            gray: "var(--gray)",
            grayLight: "var(--gray-light)"
        },
        fontFamily: {
            Manrope: ["Manrope", "sans-serif"],
            Inter: ["Inter", "sans-serif"]
        },
        extend: {
            screens: {
                md1: { max: "1222px" },
                md2: { max: "799px" },
                md3: { max: "599px" },

                mmd1: { min: "1222px" },
                mmd2: { min: "799px" },
                mmd3: { min: "599px" }
            }
        }
    },
    plugins: []
};
