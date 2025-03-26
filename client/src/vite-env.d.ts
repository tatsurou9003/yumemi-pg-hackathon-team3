/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_WS_APP_URL: string;
  readonly VITE_API_CLIENT_ID: string;
  readonly VITE_API_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
