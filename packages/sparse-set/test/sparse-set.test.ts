import { expect, it } from 'vitest'
import { OutOfBoundsError, SparseSet } from '../src/sparse-set'

it('should not exists if not added', () => {
  const set = new SparseSet(10)

  expect(set.has(1)).toBe(false)
})

it('should be possible to add values', () => {
  const set = new SparseSet(10)

  expect(set.add(1)).toBe(true)
})

it('should exist after adding', () => {
  const set = new SparseSet(10)
  set.add(1)

  expect(set.has(1)).toBe(true)
})

it('should throw an out of bounds error if value is too large', () => {
  const set = new SparseSet(10)

  expect(() => set.add(1000)).toThrowError(OutOfBoundsError)
})

it('should not exist after removing', () => {
  const set = new SparseSet(10)
  set.add(1)
  expect(set.has(1)).toBe(true)
  set.remove(1)
  expect(set.has(1)).toBe(false)
})

it('should return false if the value is added twice', () => {
  const set = new SparseSet(10)
  set.add(1)
  expect(set.add(1)).toBe(false)
})

it('should not change length if value is added twice', () => {
  const set = new SparseSet(10)
  set.add(1)
  set.add(1)
  expect(set.length).toBe(1)
})

it('should return false if the removing an unset value', () => {
  const set = new SparseSet(10)
  expect(set.remove(1)).toBe(false)
})

it('should not change length if value is removed twice', () => {
  const set = new SparseSet(10)
  set.add(1)
  set.add(2)
  set.remove(1)
  set.remove(1)
  expect(set.length).toBe(1)
})

it('should iterate over all values', () => {
  const set = new SparseSet(10)
  set.add(1)
  set.add(2)
  set.add(3)
  set.add(5)

  set.remove(2)

  const values: number[] = []
  for (const value of set) {
    values.push(value)
  }
  // sort to make sure the order is deterministic
  values.sort()
  expect(values).toEqual([1, 3, 5])
})
