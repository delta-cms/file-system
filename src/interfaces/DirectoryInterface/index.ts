import { FileOrDirectoryInterface } from '../FileOrDirectoryInterface'
import { HasPathInterface } from '../HasPathInterface'
import { MovableInterface } from '../MovableInterface'
import { HasParentDirectoryInterface } from '../HasParentDirectoryInterface'
import { HasChildFilesInterface } from '../HasChildFilesInterface'
import { DeletableInterface } from '../DeletableInterface'
import { RenamableInterface } from '../RenamableInterface'
import { PromiseOrType } from '@/types/PromiseOrType'

/**
 * Directory interface.
 */
export interface DirectoryInterface
  extends FileOrDirectoryInterface,
    HasPathInterface,
    RenamableInterface<PromiseOrType<DirectoryInterface>>,
    MovableInterface<PromiseOrType<DirectoryInterface>>,
    HasParentDirectoryInterface,
    HasChildFilesInterface,
    DeletableInterface {}
