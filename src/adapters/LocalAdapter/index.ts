import { AdapterInterface } from '@/interfaces/AdapterInterface'
import * as fs from 'fs'
import * as nativePath from 'path'
import { promisify } from 'util'
import * as fileType from 'file-type'
import * as readChunk from 'read-chunk'
import * as rmdirRecursive from 'rmdir-recursive'
import { FileType } from '@/types/FileType'
import { FileAlreadyExistsException } from '@/exceptions/FileAlreadyExistsException'
import { FileNotExistsException } from '@/exceptions/FileNotExistsException'
import { DirectoryNotExistsException } from '@/exceptions/DirectoryNotExistsException'
import { DirectoryAlreadyExistsException } from '@/exceptions/DirectoryAlreadyExistsException'

/**
 * LocalAdapter(Node.js(fs)) class.
 */
export class LocalAdapter implements AdapterInterface {
  /**
   * @inheritdoc
   */
  has(path: string) {
    return promisify(fs.exists)(path)
  }

  /**
   * @inheritdoc
   */
  async read(path: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    return new Promise<string>(resolve => {
      fs.readFile(
        path,
        {
          encoding: 'utf8'
        },
        (error, data) => {
          resolve(data)
        }
      )
    })
  }

  /**
   * @inheritdoc
   */
  async readChunk(path: string, startPosition: number, length?: number) {
    if (length === undefined) {
      return await this.readChunk(path, 0, startPosition)
    }
    const chunk = await readChunk(path, startPosition, length)
    return chunk.toString()
  }

  /**
   * @inheritdoc
   */
  readStream(path: string) {
    return fs.createReadStream(path, 'utf8')
  }

  /**
   * @inheritdoc
   */
  async readDirectory(directoryName: string) {
    if (!(await this.has(directoryName)))
      throw new DirectoryNotExistsException(directoryName)
    const directory = await promisify(fs.readdir)(directoryName, {
      withFileTypes: true
    })

    return directory
  }

  /**
   * @inheritdoc
   */
  statsFile(path: string) {
    return promisify(fs.stat)(path)
  }

  /**
   * @inheritdoc
   */
  async getSize(path: string) {
    const { size } = await this.statsFile(path)
    return size
  }

  /**
   * @inheritdoc
   */
  async getMimeType(path: string) {
    const { mimeType } = await this.getFileType(path)
    return mimeType
  }

  /**
   * @inheritdoc
   */
  async getFileType(path: string) {
    const buffer = await readChunk(path, 0, fileType.minimumBytes)
    const file = fileType(buffer) || { ext: 'txt', mime: 'text/plain' }
    const type: FileType = {
      extension: file.ext,
      mimeType: file.mime
    }

    return type
  }

  /**
   * @inheritdoc
   */
  async write(path: string, contents: string) {
    if (await this.has(path)) throw new FileAlreadyExistsException(path)
    await promisify(fs.writeFile)(path, contents)
  }

  /**
   * @inheritdoc
   */
  writeStream(path: string) {
    return fs.createWriteStream(path)
  }

  /**
   * @inheritdoc
   */
  async update(path: string, contents: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    await promisify(fs.writeFile)(path, contents)
  }

  /**
   * @inheritdoc
   */
  async put(path: string, contents: string) {
    await promisify(fs.writeFile)(path, contents)
  }

  /**
   * @inheritdoc
   */
  async prepend(path: string, contents: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    const file = await this.read(path)
    await promisify(fs.writeFile)(path, contents + file)
  }

  /**
   * @inheritdoc
   */
  async append(path: string, contents: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    await promisify(fs.appendFile)(path, contents)
  }

  /**
   * @inheritdoc
   */
  async rename(path: string, newPath: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    await promisify(fs.rename)(path, newPath)
  }

  /**
   * @inheritdoc
   */
  async copy(path: string, toPath: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    await promisify(fs.copyFile)(path, toPath)
  }

  /**
   * @inheritdoc
   */
  async delete(path: string) {
    if (!(await this.has(path))) throw new FileNotExistsException(path)
    await promisify(fs.unlink)(path)
  }

  /**
   * @inheritdoc
   */
  async deleteDirectory(directoryName: string) {
    if (!(await this.has(directoryName)))
      throw new DirectoryNotExistsException(directoryName)
    await promisify(rmdirRecursive)(directoryName)
  }

  /**
   * @inheritdoc
   */
  async createDirectory(directoryName: string) {
    if (await this.has(directoryName))
      throw new DirectoryAlreadyExistsException(directoryName)
    await promisify(fs.mkdir)(directoryName, { recursive: true })
  }

  /**
   * @inheritdoc
   */
  dirname(path: string) {
    return nativePath.dirname(path)
  }
}
