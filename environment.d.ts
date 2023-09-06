declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;

            NODE_ENV: "test" | "development" | "production";
            NODE_ENV: "test" | "development" | "production";

            // DATADOG
            DD_API_KEY: string = "";
        }
    }
}
export { }
