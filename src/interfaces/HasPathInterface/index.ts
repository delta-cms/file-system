/**
 * HasPath interface.
 */
export interface HasPathInterface {
  /**
   * Path.
   */
  readonly path: string

  /**
   * Full path.
   */
  readonly fullPath: string

  /**
   * Name.
   */
  readonly name: string

  /**
   * Set path.
   *
   * @param path
   */
  setPath(path: string)
}
