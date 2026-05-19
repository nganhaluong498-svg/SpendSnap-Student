export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                momo: {
                    primary: "rgb(var(--momo-primary-rgb) / <alpha-value>)",
                    pink: "rgb(var(--momo-pink-alt-rgb) / <alpha-value>)",
                    magenta: "rgb(var(--momo-magenta-rgb) / <alpha-value>)",
                    violet: "rgb(var(--momo-violet-rgb) / <alpha-value>)",
                    soft: "rgb(var(--momo-soft-pink-rgb) / <alpha-value>)",
                    surface: "rgb(var(--momo-surface-rgb) / <alpha-value>)",
                    border: "rgb(var(--momo-border-rgb) / <alpha-value>)",
                    text: "rgb(var(--momo-text-rgb) / <alpha-value>)",
                    muted: "rgb(var(--momo-muted-rgb) / <alpha-value>)",
                    success: "rgb(var(--momo-success-rgb) / <alpha-value>)",
                    warning: "rgb(var(--momo-warning-rgb) / <alpha-value>)",
                },
            },
            boxShadow: {
                card: "0 12px 32px rgba(17, 24, 39, 0.06)",
                lift: "0 16px 30px rgba(17, 24, 39, 0.10)",
                pink: "0 12px 26px rgba(229, 0, 126, 0.16)",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [],
};
