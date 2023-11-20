export interface Env {
  APP_PORT: number;
  APP_HOST: string;
  APP_BASE_URL: string;

  JWT_SECRET: string; // please use `openssl rand -base64 172 | tr -d '\n'` to generate a random string

  PG_USERNAME: string;
  PG_PASSWORD: string;
  PG_HOST: string;
  PG_PORT: string;
  PG_DATABASE: string;
  PG_SCHEMA: string;
  PG_SSL_CERT: string;

  SMTP2GO_FROM_STR: string;
  SMTP2GO_API_KEY: string;
}
