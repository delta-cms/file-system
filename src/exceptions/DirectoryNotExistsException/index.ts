/**
 * DirectoryNotExistsException class.
 */
export class DirectoryNotExistsException implements Error {
  /**
   * Name.
   */
  public name: string = 'DirectoryNotExistsException'

  /**
   * Message.
   */
  public message: string

  /**
   * DirectoryNotExistsException constructor.
   * @param path
   */
  constructor(private path: string) {
    this.message = `[${this.name}] The ${path} is not exists.`
  }

  /**
   * Convert to string.
   */
  public toString() {
    return `${this.message}`
  }
}
