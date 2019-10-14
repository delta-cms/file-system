import { PromiseOrType } from '@/types/PromiseOrType'
import { DirectoryInterface } from '../DirectoryInterface'

/**
 * HasParentDirectory interface.
 */
export interface HasParentDirectoryInterface {
  /**
   * Get the parent directory.
   */
  directory(): PromiseOrType<DirectoryInterface>
}
