<br />
<h1 align="center">SparseSet</h3>
<br />

A sparse set implementation in TypeScript. Sparse set has a fixed size that needs to be provided in the constructor. Order of the values is not guaranteed!

## Installation

```bash
npm install @astrocreep/sparse-set
```

## Usage

```ts
import { SparseSet } from '@astrocreep/sparse-set'

const set = new SparseSet(10)
set.add(1)
set.add(2)
set.add(3)

set.remove(2)

set.has(1) // true
set.has(2) // false

// iterate over all values
for (const value of set) {
  console.log(value)