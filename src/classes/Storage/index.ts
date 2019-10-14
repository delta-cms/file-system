import { AdapterInterface } from '@/interfaces/AdapterInterface'
import { StorageInterface } from '@/interfaces/StorageInterface'
import { HasBasePath } from '@/abstracts/HasBasePath'
import { StorageOptions } from '@/types/StorageOptions'
import { ReadStream, Stats, Dirent } from 'fs'
import { PromiseOrType } from '@/types/PromiseOrType'
import { Directory } from '../Directory'
import { File } from '../File'
import { DirectoryElementCollection } from '../DirectoryElementCollection'
import { MimeType } from '../MimeType'

/**
 * Storage class.
 */
export class Storage extends HasBasePath implements StorageInterface {
  /**
   * Storage constructor.
   *
   * @param adapter
   * @param options
   */
  constructor(
    protected adapter: AdapterInterface,
    protected options: StorageOptions
  ) {
    super(options.basePath)
  }

  private get asStorageInterface() {
    return (this as unknown) as StorageInterface
  }

  /**
   * @inheritdoc
   */
  has(path: string): PromiseOrType<boolean> {
    return this.adapter.has(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  read(path: string): PromiseOrType<string> {
    return this.adapter.read(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  readStream(path: string): ReadStream {
    return this.adapter.readStream(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  readChunk(
    path: string,
    startPosition: number,
    length?: number
  ): PromiseOrType<string> {
    return this.adapter.readChunk(this.resolvePath(path), startPosition, length)
  }

  /**
   * @inheritdoc
   */
  readDirectory(directoryName: string): PromiseOrType<Dirent[]> {
    return this.adapter.readDirectory(this.resolvePath(directoryName))
  }

  /**
   * @inheritdoc
   */
  fullPath(path: string) {
    return this.resolvePath(path)
  }

  /**
   * @inheritdoc
   */
  statsFile(path: string): PromiseOrType<Stats> {
    return this.adapter.statsFile(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  getSize(path: string) {
    return this.adapter.getSize(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  getMimeType(path: string) {
    return this.adapter.getMimeType(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  getFileType(path: string) {
    return this.adapter.getFileType(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  async write(path: string, contents: string) {
    await this.adapter.write(this.resolvePath(path), contents)
    return this.getFile(path)
  }

  /**
   * @inheritdoc
   */
  writeStream(path: string) {
    return this.adapter.writeStream(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  update(path: string, contents: string) {
    return this.adapter.update(this.resolvePath(path), contents)
  }

  /**
   * @inheritdoc
   */
  async put(path: string, contents: string) {
    await this.adapter.put(this.resolvePath(path), contents)
    return this.getFile(path)
  }

  /**
   * @inheritdoc
   */
  prepend(path: string, contents: string) {
    return this.adapter.prepend(this.resolvePath(path), contents)
  }

  /**
   * @inheritdoc
   */
  append(path: string, contents: string) {
    return this.adapter.append(this.resolvePath(path), contents)
  }

  /**
   * @inheritdoc
   */
  async rename(path: string, newPath: string) {
    await this.adapter.rename(this.resolvePath(path), this.resolvePath(newPath))
    return newPath
  }

  /**
   * @inheritdoc
   */
  copy(path: string, toPath: string) {
    return this.adapter.copy(this.resolvePath(path), this.resolvePath(toPath))
  }

  /**
   * @inheritdoc
   */
  delete(path: string) {
    return this.adapter.delete(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  deleteDirectory(path: string) {
    return this.adapter.deleteDirectory(this.resolvePath(path))
  }

  /**
   * @inheritdoc
   */
  async createDirectory(directoryName: string) {
    await this.adapter.createDirectory(this.resolvePath(directoryName))
    return this.getDirectory(directoryName)
  }

  /**
   * @inheritdoc
   */
  getFile(path: string) {
    return new File(this.asStorageInterface, path)
  }

  /**
   * @inheritdoc
   */
  getDirectory(directoryName: string) {
    return new Directory(this.asStorageInterface, directoryName)
  }

  /**
   * @inheritdoc
   */
  async getFiles(directoryName: string) {
    const elements = await this.readDirectory(directoryName)
    const collection: DirectoryElementCollection = []

    for (const element of elements) {
      if (element.isDirectory()) {
        collection.push(
          this.getDirectory(this.resolvePath(directoryName, element.name))
        )
      } else {
        collection.push(
          this.getFile(this.resolvePath(directoryName, element.name))
        )
      }
    }

    return collection
  }

  /**
   * @inheritdoc
   */
  async getMimeTypeInstance(path: string) {
    return MimeType.Parse(await this.getMimeType(path))
  }

  /**
   * @inheritdoc
   */
  async dirname(path: string) {
    return await this.adapter.dirname(path)
  }
}
