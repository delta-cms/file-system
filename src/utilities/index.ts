/**
 * Join paths
 *
 * @param paths
 */
export const JoinPath = (...paths: string[]) => {
  const split = paths.reduce((value, path) => {
    return [...value, ...path.split('/').filter(s => !!s)]
  }, [])
  return split.join('/')
}
