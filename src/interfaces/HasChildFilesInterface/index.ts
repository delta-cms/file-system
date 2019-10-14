import { PromiseOrType } from '@/types/PromiseOrType'
import { DirectoryElementCollection } from '@/classes/DirectoryElementCollection'

/**
 * HasChildFiles interface.
 */
export interface HasChildFilesInterface {
  /**
   * Get the child files and directories.
   */
  files(): PromiseOrType<DirectoryElementCollection>
}
