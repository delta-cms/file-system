/**
 * HasContents interface.
 */
export interface HasContentsInterface<ContentsType, ReturnType = void> {
  /**
   * Get content.
   */
  get(): ContentsType

  /**
   * Put contents.
   *
   * @param contents
   */
  put(contents: ContentsType): ReturnType

  /**
   * Prepend contents.
   *
   * @param contents
   */
  prepend(contents: ContentsType): ReturnType

  /**
   * Append contents.
   *
   * @param contents
   */
  append(contents: ContentsType): ReturnType
}
