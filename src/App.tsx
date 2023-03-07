import './styles.scss'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons'
import Badge from '@material-ui/core/Badge'
import Item from './Item/Item'

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )
  console.log(data)

  const getTotalItems = () => null

  const handleAddToCart = (clickedItem: CartItemType) => null

  const handleRemoveFromCart = () => null

  if (isLoading) return <LinearProgress />
  if (error) return <h1>Something went wrong</h1>

  return (
    <main>
      <div className="grid">
        {data?.map((item) => (
          <article key={item.id}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </article>
        ))}
      </div>
    </main>
  )
}

export default App
