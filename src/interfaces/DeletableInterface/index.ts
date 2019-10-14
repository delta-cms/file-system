import { PromiseOrType } from '@/types/PromiseOrType'

/**
 * Deletable interface.
 */
export interface DeletableInterface {
  /**
   * Delete. If delete successfully return true.
   */
  delete(): PromiseOrType<void>
}
