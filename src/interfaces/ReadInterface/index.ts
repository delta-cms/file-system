import { PromiseOrType } from '@/types/PromiseOrType'
import { Stats, Dirent, ReadStream } from 'fs'
import { FileType } from '@/types/FileType'

/**
 * Read interface.
 */
export interface ReadInterface {
  /**
   * Check whether a file exists.
   *
   * @param path
   */
  has(path: string): PromiseOrType<boolean>

  /**
   * Read a file.
   *
   * @param path
   */
  read(path: string): PromiseOrType<string>

  /**
   * Read a file chunk.
   *
   * @param path
   * @param startPosition
   * @param length
   */
  readChunk(
    path: string,
    startPosition: number,
    length: number
  ): PromiseOrType<string>

  /**
   * Read a file chunk
   *
   * @param path
   * @param startPosition
   */
  readChunk(path: string, length: number): PromiseOrType<string>

  /**
   * Create file read stream.
   *
   * @param path
   */
  readStream(path: string): ReadStream

  /**
   * List dirent of a directory.
   *
   * @param directoryName
   */
  readDirectory(directoryName: string): PromiseOrType<Dirent[]>

  /**
   * Get the file stats.
   *
   * @param path
   */
  statsFile(path: string): PromiseOrType<Stats>

  /**
   * Get the file size.
   *
   * @param path
   */
  getSize(path: string): PromiseOrType<number>

  /**
   * Get the file mimetype.
   *
   * @param path
   */
  getMimeType(path: string): PromiseOrType<string>

  /**
   * Get the file type.
   *
   * @param path
   */
  getFileType(path: string): PromiseOrType<FileType>
}
