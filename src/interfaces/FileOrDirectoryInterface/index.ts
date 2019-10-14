import { FileInterface } from '../FileInterface'
import { DirectoryInterface } from '../DirectoryInterface'

/**
 * FileOrDirectory interface.
 */
export interface FileOrDirectoryInterface {
  /**
   * Check is this a file.
   */
  isFile(): this is FileInterface

  /**
   * Check is this a directory.
   */
  isDirectory(): this is DirectoryInterface
}
