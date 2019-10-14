import { PromiseOrType } from '@/types/PromiseOrType'
import { Stream } from 'stream'
import { Dirent, Stats } from 'fs'
import { FileType } from '@/types/FileType'
import { DirectoryInterface } from '../DirectoryInterface'
import { FileInterface } from '../FileInterface'
import { DirectoryElementCollection } from '@/classes/DirectoryElementCollection'
import { MimeType } from '@/classes/MimeType'
import { WriteStream } from 'fs'

/**
 * Storage interface.
 */
export interface StorageInterface {
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
   * Read a file chunk.
   *
   * @param path
   * @param length
   */
  readChunk(path: string, length: number): PromiseOrType<string>

  /**
   * Read a file as Stream.
   *
   * @param path
   */
  readStream(path: string): Stream

  /**
   * List dirent of a directory.
   *
   * @param directoryName
   */
  readDirectory(directoryName: string): PromiseOrType<Dirent[]>

  /**
   * Return full path.
   */
  fullPath(path: string): string

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

  /**
   * Write a new file.
   *
   * @param path
   * @param contents
   */
  write(path: string, contents: string): PromiseOrType<FileInterface>

  /**
   * Write a file as Stream.
   *
   * @param path
   */
  writeStream(path: string): PromiseOrType<WriteStream>

  /**
   * Update a file.
   *
   * @param path
   * @param contents
   */
  update(path: string, contents: string)

  /**
   * Put contents to the file. If the file is not exists, create new file and put contents.
   *
   * @param path
   * @param contents
   */
  put(path: string, contents: string): PromiseOrType<FileInterface>

  /**
   * Prepend contents to the file.
   *
   * @param path
   * @param contents
   */
  prepend(path: string, contents: string)

  /**
   * Append contents to the file.
   *
   * @param path
   * @param contents
   */
  append(path: string, contents: string)

  /**
   * Rename a file.
   *
   * @param path
   * @param newPath
   */
  rename(path: string, newPath: string): PromiseOrType<string>

  /**
   * Copy a file.
   *
   * @param path
   * @param toPath
   */
  copy(path: string, toPath: string)

  /**
   * Delete a file.
   *
   * @param path
   */
  delete(path: string)

  /**
   * Delete a directory.
   *
   * @param directoryName
   */
  deleteDirectory(directoryName: string)

  /**
   * Create a directory
   *
   * @param directoryName
   */
  createDirectory(directoryName: string): PromiseOrType<DirectoryInterface>

  /**
   * Get file instance.
   *
   * @param directoryName
   */
  getFile(directoryName: string): FileInterface

  /**
   * Get directory instance.
   *
   * @param directoryName
   */
  getDirectory(directoryName: string): DirectoryInterface

  /**
   * Get child files and directories instance collection.
   *
   * @param directoryName
   */
  getFiles(directoryName: string): PromiseOrType<DirectoryElementCollection>

  /**
   * Get the file MimeType instance.
   *
   * @param path
   */
  getMimeTypeInstance(path: string): PromiseOrType<MimeType>

  /**
   * Parent directory path of the file or directory.
   *
   * @param path
   */
  dirname(path: string): PromiseOrType<string>
}
