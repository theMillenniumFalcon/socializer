declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CORS_ORIGIN: string;
      JWT_SECRET: string;
      DATABASE_URI: string;
    }
  }
}

export {}
