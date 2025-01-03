const TOMBSTONE = -1

export class SparseSet {
  #sparse: Int32Array
  #dense: Int32Array

  #size: number

  #length: number

  constructor(size: number) {
    this.#sparse = new Int32Array(size)
    this.#sparse.fill(TOMBSTONE)
    this.#size = size

    this.#dense = new Int32Array(size)
    this.#dense.fill(TOMBSTONE)

    this.#length = 0
  }

  add(value: number) {
    if (value >= this.#size) {
      throw new OutOfBoundsError(value)
    }

    if (this.has(value)) {
      return false
    }

    const index = this.#length++
    this.#sparse[value] = index
    this.#dense[index] = value

    return true
  }

  remove(value: number) {
    if (!this.has(value)) {
      return false
    }

    this.#length--
    const index = this.#sparse[value]!
    const last = this.#dense[this.#length]!
    this.#dense[index] = last
    this.#sparse[last] = index

    this.#sparse[value] = TOMBSTONE
    this.#dense[this.#length] = TOMBSTONE

    return true
  }

  has(value: number) {
    const index = this.#sparse[value]
    return index !== TOMBSTONE && index !== undefined
  }

  get length() {
    return this.#length
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.#length; i++) {
      yield this.#dense[i]
    }
  }
}

export class OutOfBoundsError extends Error {
  constructor(value: number) {
    super(`Value ${value} is out of bounds`)
  }
}
