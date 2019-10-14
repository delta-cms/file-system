/**
 * FileNotExistsException class.
 */
export class FileNotExistsException implements Error {
  /**
   * Name.
   */
  public name: string = 'FileNotExistsException'

  /**
   * Message.
   */
  public message: string

  /**
   * FileNotExistsException constructor.
   *
   * @param path
   */
  constructor(private path: string) {
    this.message = `[${this.name}] The ${path} is not exists.`
  }

  /**
   * Covnert to string.
   */
  public toString() {
    return `${this.message}`
  }
}
