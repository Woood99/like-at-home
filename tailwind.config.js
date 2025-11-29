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
            yellow: "var(--yellow)",
            blue: "var(--blue)",
            purple: "var(--purple)",
            purpleSecond: "var(--purple-second)",
            veryLightBlue: "var(--very-light-blue)",
            lightBlue: "var(--light-blue)",
            bluePale: "var(--blue-pale)",
            cyan: "var(--cyan)",
            lightCyan: "var(--light-cyan)",
            darkCyan: "var(--dark-cyan)",
            gray: "var(--gray)",
            grayTwo: "var(--gray-two)",
            grayLight: "var(--gray-light)",
            grayDark: "var(--gray-dark)",
            grayMedium: "var(--gray-medium)",
            hoverPrimary: "var(--hover-primary)"
        },
        fontFamily: {
            Manrope: ["Manrope", "sans-serif"]
        },
        extend: {
            borderRadius: {
                32: "2rem",
                20: "1.25rem"
            },
            spacing: {
                "7-5": "1.875rem"
            },
            width: {
                25: "1.5625rem"
            },
            height: {
                25: "1.5625rem"
            },
            screens: {
                md1: { max: "1296px" },
                md1_5: { max: "899px" },
                md2: { max: "799px" },
                md3: { max: "599px" },
                md4: { max: "399px" },
                md5: { max: "359px" },

                mmd1: { min: "1296px" },
                mmd1_5: { min: "900px" },
                mmd2: { min: "800px" },
                mmd3: { min: "600px" },
                mmd4: { max: "400px" }
            }
        }
    },
    plugins: []
};
