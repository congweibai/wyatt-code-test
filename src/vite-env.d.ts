/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OMD_API_KEY: string;
  readonly VITE_OMD_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
