import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import * as fs from 'fs'
import { sync as rmdir } from 'rmdir-recursive'
import { Storage, LocalAdapter, Directory, File } from '../src'

describe('Directory test', async () => {
  const TestStoragePath = `${__dirname}/test-storage`
  let storage: Storage
  let directory: Directory

  beforeEach(async () => {
    rmdir(TestStoragePath)
    fs.mkdirSync(TestStoragePath)
    storage = new Storage(new LocalAdapter(), {
      basePath: TestStoragePath
    })
    await storage.createDirectory('test')
    directory = await storage.getDirectory('test')
  })

  it('path should be file path', () => {
    expect(directory.path).to.equal('test')
  })

  it('name should be file name', () => {
    expect(directory.name).to.equal('test')
  })

  it('fullPath should be full file path', () => {
    expect(directory.fullPath).to.equal(`${__dirname}/test-storage/test`)
  })

  it('isFile should return false', () => {
    expect(directory.isFile()).to.be.false
  })

  it('isDirectory should return true', () => {
    expect(directory.isDirectory()).to.be.true
  })

  it('directory should return parent directory instance', async () => {
    expect(await directory.directory()).to.be.an.instanceOf(Directory)
  })

  it('rename should rename the directory', async () => {
    await directory.rename('hello')
    expect(directory.name).to.equal('hello')
    expect(directory.path).to.equal('hello')
    expect(directory.fullPath).to.equal(`${__dirname}/test-storage/hello`)
  })

  it('rename should rename child files', async () => {
    const a = await storage.write('test/a.txt', '')
    const b = await storage.write('test/b.txt', '')
    await directory.rename('dir')
    expect(a.path).to.equal('dir/a.txt')
    expect(b.path).to.equal('dir/b.txt')
  })

  it('files should return child files', async () => {
    await storage.write('test/test.txt', 'test')
    await storage.write('test/hello.txt', 'hello')
    await storage.createDirectory('test/test-dir')
    const files = await directory.files()
    const instanceOf = file => file instanceof File || file instanceof Directory
    expect(files.length).to.equal(3)
    expect(files[0]).satisfy(instanceOf)
    expect(files[1]).satisfy(instanceOf)
    expect(files[2]).satisfy(instanceOf)
  })

  it('moveTo should move file to the directory path', async () => {
    await storage.createDirectory('test-dir/')
    await directory.moveTo('test-dir')
    expect(await storage.has('test')).to.be.false
    expect(directory.path).to.equal('test-dir/test')
  })

  it('moveTo should move file to the directory', async () => {
    await storage.createDirectory('test-dir')
    await directory.moveTo(storage.getDirectory('test-dir'))
    expect(await storage.has('test')).to.be.false
    expect(directory.path).to.equal('test-dir/test')
  })

  it('delete should delete the file', async () => {
    await directory.delete()
    expect(await storage.has('test')).to.be.false
  })
})
