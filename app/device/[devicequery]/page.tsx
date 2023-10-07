import React from 'react'

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Device({
  params
}: {
  params: { devicequery: string }
}) {
  const data = await getData()
  const { devicequery } = params
  console.log(data)
  return (
    <>
      <h1>{data.title}</h1>
      <h2>{devicequery}</h2>
    </>
  )
}
