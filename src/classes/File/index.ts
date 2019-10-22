import { FileInterface } from '@/interfaces/FileInterface'
import { StorageInterface } from '@/interfaces/StorageInterface'
import { DirectoryInterface } from '@/interfaces/DirectoryInterface'
import { JoinPath } from '@/utilities'

/**
 * File class.
 */
export class File implements FileInterface {
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

  private get asFileInterface() {
    return (this as unknown) as FileInterface
  }

  /**
   * File constructor.
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
    return true
  }

  /**
   * @inheritdoc
   */
  isDirectory() {
    return false
  }

  /**
   * @inheritdoc
   */
  async get() {
    return await this.storage.read(this.path)
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
  async put(contents: string) {
    await this.storage.put(this.path, contents)
    return this.asFileInterface
  }

  /**
   * @inheritdoc
   */
  async prepend(contents: string) {
    await this.storage.prepend(this.path, contents)
    return this.asFileInterface
  }

  /**
   * @inheritdoc
   */
  async append(contents: string) {
    await this.storage.append(this.path, contents)
    return this.asFileInterface
  }

  /**
   * @inheritdoc
   */
  async rename(newName: string) {
    const newPath = await this.storage.rename(this.path, newName)
    this._path = newPath
    return this.asFileInterface
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
    return this.asFileInterface
  }

  /**
   * Move to directory(class).
   *
   * @param directory
   */
  async moveToDirectory(directory: DirectoryInterface) {
    await this.moveToDirectoryPath(directory.path)
    return this.asFileInterface
  }

  /**
   * @inheritdoc
   */
  async delete() {
    await this.storage.delete(this.path)
  }

  /**
   * @inheritdoc
   */
  setPath(path: string) {
    this._path = path
  }
}
