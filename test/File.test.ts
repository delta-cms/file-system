import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import * as fs from 'fs'
import { sync as rmdir } from 'rmdir-recursive'
import { Storage, LocalAdapter, Directory, File } from '../src'

describe('File test', async () => {
  const TestStoragePath = `${__dirname}/test-storage`
  const storage = new Storage(new LocalAdapter(), {
    basePath: TestStoragePath
  })
  let file: File

  beforeEach(async () => {
    rmdir(TestStoragePath)
    fs.mkdirSync(TestStoragePath)
    await storage.write('test.txt', '')
    file = await storage.getFile('test.txt')
  })

  it('path should be file path', () => {
    expect(file.path).to.equal('test.txt')
  })

  it('name should be file name', () => {
    expect(file.name).to.equal('test.txt')
  })

  it('fullPath should be full file path', () => {
    expect(file.fullPath).to.equal(`${__dirname}/test-storage/test.txt`)
  })

  it('isFile should return true', () => {
    expect(file.isFile()).to.be.true
  })

  it('isDirectory should return false', () => {
    expect(file.isDirectory()).to.be.false
  })

  it('get should return file contents', async () => {
    await storage.update('test.txt', 'hello')
    expect(await file.get()).to.equal('hello')
  })

  it('directory should return parent directory instance', async () => {
    expect(await file.directory()).to.be.an.instanceOf(Directory)
  })

  it('put should put contents to the file', async () => {
    await file.put('hello world')
    expect(await file.get()).to.equal('hello world')
  })

  it('prepend should prepend contents to the file', async () => {
    await file.put('world')
    await file.prepend('hello ')
    expect(await file.get()).to.equal('hello world')
  })

  it('append should prepend contents to the file', async () => {
    await file.put('hello')
    await file.append(' world')
    expect(await file.get()).to.equal('hello world')
  })

  it('rename should rename the file', async () => {
    await file.rename('hello.txt')
    expect(file.name).to.equal('hello.txt')
    expect(file.path).to.equal('hello.txt')
    expect(file.fullPath).to.equal(`${__dirname}/test-storage/hello.txt`)
  })

  it('moveTo should move file to the directory path', async () => {
    await storage.createDirectory('test/')
    await file.moveTo('test/')
    expect(await storage.has('test.txt')).to.be.false
    expect(file.path).to.equal('test/test.txt')
  })

  it('moveTo should move file to the directory', async () => {
    await storage.createDirectory('test-dir')
    await file.moveTo(storage.getDirectory('test-dir'))
    expect(await storage.has('test.txt')).to.be.false
    expect(file.path).to.equal('test-dir/test.txt')
  })

  it('delete should delete the file', async () => {
    await file.delete()
    expect(await storage.has('test.txt')).to.be.false
  })
})
