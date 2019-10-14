import { FileInterface } from '@/interfaces/FileInterface'
import { DirectoryInterface } from '@/interfaces/DirectoryInterface'

/**
 * Directory element collection(array)
 */
export type DirectoryElementCollection = Array<
  FileInterface | DirectoryInterface
>
