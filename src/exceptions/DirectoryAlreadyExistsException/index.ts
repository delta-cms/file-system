/**
 * DirectoryAlreadyExistsException.
 */
export class DirectoryAlreadyExistsException implements Error {
  /**
   * Name.
   */
  public name: string = 'DirectoryAlreadyExistsException'

  /**
   * Message.
   */
  public message: string

  /**
   * DirectoryAlreadyExistsException constructor.
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
