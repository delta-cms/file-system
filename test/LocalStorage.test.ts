import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import * as fs from 'fs'
import { sync as rmdir } from 'rmdir-recursive'
import {
  Storage,
  LocalAdapter,
  FileAlreadyExistsException,
  FileNotExistsException,
  DirectoryAlreadyExistsException,
  DirectoryNotExistsException,
  File,
  Directory
} from '../src'

describe('LocalStorage test', () => {
  const TestStoragePath = `${__dirname}/test-storage`
  const storage = new Storage(new LocalAdapter(), {
    basePath: TestStoragePath
  })

  beforeEach(() => {
    rmdir(TestStoragePath)
    fs.mkdirSync(TestStoragePath)
  })

  it('write should create test.txt file', async () => {
    await storage.write('test.txt', 'hello')
    expect(await storage.read('test.txt')).to.equal('hello')
  })

  it('write should throw FileAlreadyExistsException if file already exists', async () => {
    await storage.write('test.txt', '')
    let catched = false
    try {
      await storage.write('test.txt', '')
    } catch (error) {
      if (error instanceof FileAlreadyExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('writeStream should return write stream of the file', async () => {
    await storage.write('test.txt', '')
    const stream: fs.WriteStream = storage.writeStream('test.txt')
    stream.write('test')
    expect(await storage.read('test.txt')).to.equal('test')
  })

  it('read should throw FileNotExistsException if file not exists', async () => {
    let catched = false
    try {
      await storage.read('test.txt')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('read should return file contents', async () => {
    await storage.write('test.txt', 'hello world')
    expect(await storage.read('test.txt')).to.equal('hello world')
  })

  it('has should return true if the file exists', async () => {
    expect(await storage.has('test.txt')).to.be.false
    await storage.write('test.txt', '')
    expect(await storage.has('test.txt')).to.be.true
  })

  it('read should return the file content', async () => {
    await storage.write('test.txt', 'hello')
    expect(await storage.read('test.txt')).to.equal('hello')
  })

  it('readStream should return read stream of the file', async () => {
    await storage.write('test.txt', 'hello')
    const stream = storage.readStream('test.txt')
    let data = ''

    await new Promise((resolve, reject) => {
      stream.on('data', chunk => (data += chunk))
      stream.on('end', resolve)
      stream.on('error', reject)
    })

    expect(data).to.equal('hello')
  })

  it('readChunk should return chunk of the file', async () => {
    await storage.write('test.txt', 'abcdefghijklmnopqrstuvwxyz')
    expect(await storage.readChunk('test.txt', 3)).to.equal('abc')
    expect(await storage.readChunk('test.txt', 4, 3)).to.equal('efg')
  })

  it('statsFile should return stats of the file', async () => {
    await storage.write('test.txt', 'hello world')
    const stats: fs.Stats = await storage.statsFile('test.txt')
    expect(stats.size).to.equal('hello world'.length)
  })

  it('getSize should return size of the file', async () => {
    await storage.write('test.txt', 'hello world')
    expect(await storage.getSize('test.txt')).to.equal('hello world'.length)
  })

  it('getMimeType should return mime type of the file', async () => {
    await storage.write('test', 'hello world')
    expect(await storage.getMimeType('test')).to.equal('text/plain')
  })

  it('getFileType should return file type', async () => {
    await storage.write('test', 'hello world')
    const type = await storage.getFileType('test')
    expect(type.extension).to.equal('txt')
    expect(type.mimeType).to.equal('text/plain')
  })

  it('update should throw FileNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.update('test.txt', '')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('update should update the file', async () => {
    await storage.write('test.txt', 'hello')
    await storage.update('test.txt', 'world')
    expect(await storage.read('test.txt')).to.equal('world')
  })

  it('put should create/update file', async () => {
    await storage.put('test.txt', 'hello')
    expect(await storage.read('test.txt')).to.equal('hello')
    await storage.put('test.txt', 'world')
    expect(await storage.read('test.txt')).to.equal('world')
  })

  it('prepend should throw FileNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.prepend('test.txt', '')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('prepend should prepend content to the file', async () => {
    await storage.write('test.txt', 'world')
    await storage.prepend('test.txt', 'hello ')
    expect(await storage.read('test.txt')).to.equal('hello world')
  })

  it('append should throw FileNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.append('test.txt', '')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('append should prepend content to the file', async () => {
    await storage.write('test.txt', 'hello')
    await storage.append('test.txt', ' world')
    expect(await storage.read('test.txt')).to.equal('hello world')
  })

  it('rename should throw FileNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.rename('test.txt', '')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('rename should rename the file', async () => {
    await storage.write('test.txt', 'hello')
    const newPath = await storage.rename('test.txt', 'hello.txt')
    expect(await storage.has('test.txt')).to.be.false
    expect(await storage.read('hello.txt')).to.equal('hello')
    expect(newPath).to.equal(`hello.txt`)
  })

  it('copy should throw FileNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.copy('test.txt', 'copy.txt')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('copy should copy the file', async () => {
    await storage.write('test.txt', 'hello')
    await storage.copy('test.txt', 'copy.txt')
    expect(await storage.read('copy.txt')).to.equal('hello')
  })

  it('delete should throw FileNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.delete('test.txt')
    } catch (error) {
      if (error instanceof FileNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('delete should delete the file', async () => {
    await storage.write('test.txt', '')
    await storage.delete('test.txt')
    expect(await storage.has('test.txt')).to.be.false
  })

  it('createDirectory should create directory', async () => {
    await storage.createDirectory('test')
    expect(await storage.has('test')).to.be.true
    await storage.write('test/test.txt', 'hello')
    expect(await storage.read('test/test.txt')).to.equal('hello')
  })

  it('createDirectory should throw DirectoryAlreadyExistsException if file not exists', async () => {
    await storage.createDirectory('test')
    let catched = false

    try {
      await storage.createDirectory('test')
    } catch (error) {
      if (error instanceof DirectoryAlreadyExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('deleteDirectory should throw DirectoryNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.deleteDirectory('test')
    } catch (error) {
      if (error instanceof DirectoryNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('deleteDirectory should delete the directory', async () => {
    await storage.createDirectory('test')
    await storage.deleteDirectory('test')
    expect(await storage.has('test'))
  })

  it('listContents should throw DirectoryNotExistsException if file not exists', async () => {
    let catched = false

    try {
      await storage.readDirectory('test')
    } catch (error) {
      if (error instanceof DirectoryNotExistsException) {
        catched = true
      }
    }
    expect(catched).to.be.true
  })

  it('listContents should return dirents of the directory', async () => {
    await storage.createDirectory('test')
    await storage.write('test/a.txt', 'a')

    const contents = await storage.readDirectory('test')
    expect(contents[0]).to.be.an.instanceOf(fs.Dirent)
  })

  it('dirname should return parent directory path', async () => {
    expect(await storage.dirname('test/test.txt')).to.equal('test')
    expect(await storage.dirname('nyan/test/test.txt')).to.equal('nyan/test')
    expect(await storage.dirname('test/test/test.txt')).to.equal('test/test')
  })

  it('getFiles should return files and directories instances', async () => {
    await storage.write('a.txt', '')
    await storage.write('b.txt', '')
    await storage.createDirectory('c')
    const files = await storage.getFiles('.')
    expect(files[0]).to.be.an.instanceOf(File)
    expect(files[1]).to.be.an.instanceOf(File)
    expect(files[2]).to.be.an.instanceOf(Directory)
  })

  it('DirectoryAlreadyExistsException.toString should return message', () => {
    expect(new DirectoryAlreadyExistsException('test').toString()).to.equal(
      '[DirectoryAlreadyExistsException] The test is already exists.'
    )
  })

  it('FileAlreadyExistsException.toString should return message', () => {
    expect(new FileAlreadyExistsException('test.txt').toString()).to.equal(
      '[FileAlreadyExistsException] The test.txt is already exists.'
    )
  })

  it('DirectoryNotExistsException.toString should return message', () => {
    expect(new DirectoryNotExistsException('test').toString()).to.equal(
      '[DirectoryNotExistsException] The test is not exists.'
    )
  })

  it('FileNotExistsException.toString should return message', () => {
    expect(new FileNotExistsException('test.txt').toString()).to.equal(
      '[FileNotExistsException] The test.txt is not exists.'
    )
  })

  it('fullPath should return full path', () => {
    expect(storage.fullPath('test.txt')).to.equal(
      `${__dirname}/test-storage/test.txt`
    )
  })

  it('getMimeTypeInstance should return file mime type instance', async () => {
    await storage.write('test.txt', 'nyan')
    const mime = await storage.getMimeTypeInstance('test.txt')

    expect(mime.is('text/plain')).to.be.true
  })
})
