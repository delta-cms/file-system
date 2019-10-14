/**
 * FileAlreadyExistsException class.
 */
export class FileAlreadyExistsException implements Error {
  /**
   * Name.
   */
  public name: string = 'FileAlreadyExistsException'

  /**
   * Message.
   */
  public message: string

  /**
   * FileAlreadyExistsException constructor.
   *
   * @param path
   */
  constructor(private path: string) {
    this.message = `[${this.name}] The ${path} is already exists.`
  }

  /**
   * Convert to string.
   */
  public toString() {
    return `${this.message}`
  }
}
