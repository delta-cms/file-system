import { FileOrDirectoryInterface } from '../FileOrDirectoryInterface'
import { PromiseOrType } from '@/types/PromiseOrType'
import { DeletableInterface } from '../DeletableInterface'
import { HasPathInterface } from '../HasPathInterface'
import { MovableInterface } from '../MovableInterface'
import { RenamableInterface } from '../RenamableInterface'
import { HasParentDirectoryInterface } from '../HasParentDirectoryInterface'
import { HasContentsInterface } from '../HasContentsInterface'

/**
 * File interface.
 */
export interface FileInterface
  extends FileOrDirectoryInterface,
    DeletableInterface,
    HasPathInterface,
    MovableInterface<PromiseOrType<FileInterface>>,
    RenamableInterface<PromiseOrType<FileInterface>>,
    HasParentDirectoryInterface,
    HasContentsInterface<PromiseOrType<string>, PromiseOrType<FileInterface>> {}
