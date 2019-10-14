import { DirectoryInterface } from '@/interfaces/DirectoryInterface'
import { StorageInterface } from '@/interfaces/StorageInterface'
import { JoinPath } from '@/utilities'

/**
 * Directory class.
 */
export class Directory implements DirectoryInterface {
  private _path: string

  /**
   * @inheritdoc
   */
  get path() {
    return this._path
  }

  /**
   * @inheritdoc
   */
  get name() {
    const splited = this._path.split('/')
    return splited[splited.length - 1]
  }

  /**
   * @inheritdoc
   */
  get fullPath() {
    return this.storage.fullPath(this._path)
  }

  private get asDirectoryInterface() {
    return (this as unknown) as DirectoryInterface
  }

  /**
   * Directory constructor.
   *
   * @param storage
   * @param path
   */
  constructor(private storage: StorageInterface, path: string) {
    this._path = path
  }

  /**
   * @inheritdoc
   */
  isFile() {
    return false
  }

  /**
   * @inheritdoc
   */
  isDirectory() {
    return true
  }

  /**
   * @inheritdoc
   */
  async directory() {
    return this.storage.getDirectory(await this.storage.dirname(this.fullPath))
  }

  /**
   * @inheritdoc
   */
  async files() {
    return await this.storage.getFiles(this._path)
  }

  /**
   * @inheritdoc
   */
  async rename(newName: string) {
    await this.storage.rename(this.path, newName)
    this._path = newName
    return this.asDirectoryInterface
  }

  /**
   * @inheritdoc
   */
  async moveTo(directoryPathOrDirectory: string | DirectoryInterface) {
    if (typeof directoryPathOrDirectory === 'string') {
      return await this.moveToDirectoryPath(directoryPathOrDirectory)
    } else {
      return await this.moveToDirectory(directoryPathOrDirectory)
    }
  }

  /**
   * Move to directory path.
   *
   * @param path
   */
  async moveToDirectoryPath(path: string) {
    await this.rename(JoinPath(path, this.name))
    return this.asDirectoryInterface
  }

  /**
   * Move to directory(class).
   *
   * @param directory
   */
  async moveToDirectory(directory: DirectoryInterface) {
    await this.moveToDirectoryPath(directory.path)
    return this.asDirectoryInterface
  }

  /**
   * @inheritdoc
   */
  async delete() {
    await this.storage.deleteDirectory(this.path)
  }
}
