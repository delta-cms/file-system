import { describe, it } from 'mocha'
import { MimeType } from '../src/classes/MimeType'
import { expect } from 'chai'
import { MimeTypeParserException } from '../src/exceptions/MimeTypeParserException'

describe('MimeType test', () => {
  it('MimeType instantiate', () => {
    const mime = new MimeType('image', 'png')
    expect(mime.type).to.equal('image')
    expect(mime.subType).to.equal('png')
  })

  it('isType should return acceptable result', () => {
    const imagePng = new MimeType('image', 'png')
    expect(imagePng.isType('image')).to.be.true
    expect(imagePng.isType('audio')).to.be.false
  })

  it('isSubType should return acceptable result', () => {
    const imagePng = new MimeType('image', 'png')
    expect(imagePng.isSubType('png')).to.be.true
    expect(imagePng.isSubType('jpg')).to.be.false
  })

  it('string and mimeType and toString should return same value and acceptable value', () => {
    const imagePng = new MimeType('image', 'png')
    const imageJpg = new MimeType('image', 'jpg')
    const applicationPdf = new MimeType('application', 'pdf')

    expect(
      imagePng.toString() === imagePng.string &&
        imagePng.toString() === imagePng.mimeType
    ).to.be.true
    expect(imageJpg.string).to.equal('image/jpg')
    expect(applicationPdf.string).to.equal('application/pdf')
  })

  it('is should compare other mime type', () => {
    const imagePng = new MimeType('image', 'png')
    const imagePng2 = new MimeType('image', 'png')
    const imageJpg = new MimeType('image', 'jpg')

    expect(imagePng.is(imagePng))
    expect(imagePng.is(imagePng2)).to.be.true
    expect(imagePng.is(imageJpg)).to.be.false

    expect(imagePng.is('image/png')).to.be.true
    expect(imagePng.is('image/jpg')).to.be.false
    expect(imagePng.is('image/*')).to.be.true
    expect(imagePng.is('audio/*')).to.be.false
  })

  it('CreateTyped should return create type helper function', () => {
    const ImageType = MimeType.CreateTyped('image')
    expect(ImageType('png').isType('image')).to.be.true
    expect(ImageType('png').isSubType('png')).to.be.true
  })

  it('Parse should return MimeTypeParserException', () => {
    let catched
    try {
      MimeType.Parse('hello')
    } catch (error) {
      catched = error
    }
    expect(catched).to.be.an.instanceOf(MimeTypeParserException)
  })

  it('MimeTypeParserException.toString() should return message', () => {
    const error = new MimeTypeParserException('image/png')
    expect(error.toString()).to.equal(
      '[MimeTypeParserException] Parse failed(passed = image/png).'
    )
  })
})
