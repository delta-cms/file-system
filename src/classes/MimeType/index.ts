import { MimeTypeParserException } from '@/exceptions/MimeTypeParserException'

/**
 * MimeType class.
 */
export class MimeType {
  /**
   * Mime type.
   */
  public readonly type: string

  /**
   * Mime sub type.
   */
  public readonly subType: string

  /**
   * MimeType regular expression.
   */
  public static readonly RegExp = /(.+)\/(.+)/

  /**
   * Create typed MimeType function.
   *
   * @param type
   */
  public static CreateTyped(type: string) {
    return (subType: string) => new MimeType(type, subType)
  }

  /**
   * Parse MimeType string.
   *
   * @param mimeType
   */
  public static Parse(mimeType: string) {
    const result = mimeType.match(this.RegExp)
    if (!result) throw new MimeTypeParserException(mimeType)
    return new MimeType(result[1], result[2])
  }

  /**
   * Create audio type.
   */
  public static readonly CreateAudio = MimeType.CreateTyped('audio')

  /**
   * Create application type.
   */
  public static readonly CreateApplication = MimeType.CreateTyped('application')

  /**
   * Create video type.
   */
  public static readonly CreateVideo = MimeType.CreateTyped('video')

  /**
   * Create image type.
   */
  public static readonly CreateImage = MimeType.CreateTyped('image')

  /**
   * Create text type.
   */

  public static readonly CreateText = MimeType.CreateTyped('text')

  /**
   * Create text type.
   */

  public static readonly CreateFont = MimeType.CreateTyped('font')

  /**
   * MimeType constructor.
   *
   * @param type
   * @param subType
   */
  constructor(type: string, subType: string) {
    this.type = type
    this.subType = subType
  }

  /**
   * MimeType string.
   */
  get string() {
    return this.toString()
  }

  /**
   * MimeType string.
   */
  get mimeType() {
    return this.toString()
  }

  /**
   * Compare with other MimeType.
   *
   * @param mimeType
   */
  is(mimeType: string | MimeType) {
    if (mimeType instanceof MimeType) {
      return this.isType(mimeType.type) && this.isSubType(mimeType.subType)
    }

    if (mimeType === this.string) return true
    const parsed = MimeType.Parse(mimeType)
    if (parsed.subType === '*' && parsed.type === this.type) return true
    return false
  }

  /**
   * Compare only type with other MimeType.
   *
   * @param type
   */
  isType(type: string) {
    return this.type === type
  }

  /**
   * Compare only subType with other MimeType.
   *
   * @param subType
   */
  isSubType(subType: string) {
    return this.subType === subType
  }

  /**
   * Convert to string.
   */
  toString() {
    return `${this.type}/${this.subType}`
  }
}
