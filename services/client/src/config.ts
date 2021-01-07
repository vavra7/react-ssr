class Config {
  public port = 3000;

  get baseUrl(): string {
    return `http://localhost:${this.port}`;
  }
}

export const config = new Config();
