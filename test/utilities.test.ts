import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as Utilities from '../src/utilities'

describe('Utilities test', () => {
  it('JoinPath should return joined path string', () => {
    const { JoinPath } = Utilities
    expect(JoinPath('dir', 'file.txt')).to.equal('dir/file.txt')
    expect(JoinPath('/dir/', 'file.txt')).to.equal('dir/file.txt')
    expect(JoinPath('/dir/', '/file.txt')).to.equal('dir/file.txt')
  })
})
