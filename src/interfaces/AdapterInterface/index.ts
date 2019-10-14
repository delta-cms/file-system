import { ReadInterface } from '../ReadInterface'
import { WriteInterface } from '../WriteInterface'
import { PromiseOrType } from '@/types/PromiseOrType'

/**
 * Adapter interface.
 */
export interface AdapterInterface extends ReadInterface, WriteInterface {
  /**
   * Rename a file.
   *
   * @param path
   * @param newPath
   */
  rename(path: string, newPath: string)

  /**
   * Copy a file.
   *
   * @param path
   * @param toPath
   */
  copy(path: string, toPath: string)

  /**
   * Delete a file.
   *
   * @param path
   */
  delete(path: string)

  /**
   * Delete a directory.
   *
   * @param directoryName
   */
  deleteDirectory(directoryName: string)

  /**
   * Create a directory
   *
   * @param directoryName
   */
  createDirectory(directoryName: string)

  /**
   * Parent directory path of the file or directory.
   *
   * @param path
   */
  dirname(path: string): PromiseOrType<string>
}
