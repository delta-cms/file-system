import { PromiseOrType } from '@/types/PromiseOrType'
import { DirectoryElementCollection } from '@/types/DirectoryElementCollection'

/**
 * HasChildFiles interface.
 */
export interface HasChildFilesInterface {
  /**
   * Get the child files and directories.
   */
  files(): PromiseOrType<DirectoryElementCollection>
}
