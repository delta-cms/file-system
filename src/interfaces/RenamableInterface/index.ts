/**
 * Renamable interface.
 */
export interface RenamableInterface<ReturnType = void> {
  /**
   * Rename.
   *
   * @param newName
   */
  rename(newName: string): ReturnType
}
