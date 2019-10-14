import * as path from 'path'

/**
 * HasBasePath abstract class
 */
export abstract class HasBasePath {
  /**
   * Base path
   */
  protected readonly basePath: string

  /**
   * Base path
   * @param basePath
   */
  constructor(basePath: string) {
    this.basePath = basePath
  }

  /**
   * Resolve path
   * @param pathSegments
   */
  public resolvePath(...pathSegments: string[]) {
    return path.resolve(this.basePath, ...pathSegments)
  }
}
