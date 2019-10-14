import { WriteStream } from 'fs'

export interface WriteInterface {
  /**
   * Write a new file.
   *
   * @param path
   * @param contents
   */
  write(path: string, contents: string)

  /**
   * Create file write stream.
   *
   * @param path
   */
  writeStream(path): WriteStream

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
  put(path: string, contents: string)

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
}
