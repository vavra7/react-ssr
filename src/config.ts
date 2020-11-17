class Config {
  public port = 4000;

  get baseUrl(): string {
    return `http://localhost:${this.port}`;
  }
}

export const config = new Config();
