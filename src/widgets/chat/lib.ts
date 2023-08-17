export class Iterator {
  public static async *fromStream<T>(stream: ReadableStream<T>) {
    const reader = stream.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          return;
        }

        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export class TextParser {
  private static readonly regex = /{"status":"[^"]+","value":"[^"]+"}/g;

  public static parse(text: string) {
    return text.match(this.regex);
  }
}

export class ChunkParser {
  public static parse(chunk: string) {
    return JSON.parse(chunk) as
      | { status: 'content'; value: string }
      | { status: 'done'; value: null };
  }
}
