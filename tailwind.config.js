/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.scss", "./src/**/*.css"],
    theme: {
        colors: {
            white: "var(--white)",
            black: "var(--black)",
            dark: "var(--dark)",
            darkPressed: "var(--dark-pressed)",
            green: "var(--green)",
            greenDark: "var(--green-dark)",
            orange: "var(--orange)",
            red: "var(--red)",
            blue: "var(--blue)",
            veryLightBlue: "var(--very-light-blue)",
            lightBlue: "var(--light-blue)",
            gray: "var(--gray)",
            grayTwo: "var(--gray-two)",
            grayLight: "var(--gray-light)"
        },
        fontFamily: {
            Manrope: ["Manrope", "sans-serif"],
            Inter: ["Inter", "sans-serif"]
        },
        extend: {
            screens: {
                md1: { max: "1296px" },
                md2: { max: "799px" },
                md3: { max: "599px" },
                md4: { max: "399px" },
                md5: { max: "359px" },

                mmd1: { min: "1296px" },
                mmd2: { min: "800px" },
                mmd3: { min: "600px" },
                mmd4: { max: "400px" }
            }
        }
    },
    plugins: []
};
