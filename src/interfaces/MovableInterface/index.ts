/**?
 * Movable interface.
 */
export interface MovableInterface<ReturnType = void> {
  /**
   * Rename.
   *
   * @param newName
   */
  rename(newName: string): ReturnType

  /**
   * Move to the directory path.
   *
   * @param directoryPath
   */
  moveTo(directoryPath: string): ReturnType
}
