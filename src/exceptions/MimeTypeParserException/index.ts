/**
 * MimeTypeParserException class.
 */
export class MimeTypeParserException implements Error {
  /**
   * Name.
   */
  public name: string = 'MimeTypeParserException'

  /**
   * Message.
   */
  public message: string

  /**
   * MimeTypeParserException constructor.
   *
   * @param target
   */
  constructor(target: string) {
    this.message = `[${this.name}] Parse failed(passed = ${target}).`
  }

  /**
   * Convert to string.
   */
  public toString() {
    return `${this.message}`
  }
}
