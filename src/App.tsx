import './styles.scss'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Drawer } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import Item from './Item/Item'
import Button from '@material-ui/core/Button'
import Cart from './Cart/Cart'

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  quantity: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acumulator: number, item) => acumulator + item.quantity, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((previous) => {
      const isItemInCart = previous.find((item) => item.id === clickedItem.id)
      if (isItemInCart) {
        return previous.map((item) =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...previous, { ...clickedItem, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems((previous) =>
      previous.reduce((acumulator, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return acumulator
          return [...acumulator, { ...item, quantity: item.quantity - 1 }]
        } else {
          return [...acumulator, item]
        }
      }, [] as CartItemType[])
    )
  }

  if (isLoading) return <LinearProgress />
  if (error) return <h1>Something went wrong</h1>

  return (
    <main>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        className="drawer"
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Button onClick={() => setCartOpen(true)} className="cart-btn">
        <Badge
          badgeContent={getTotalItems(cartItems)}
          color="error"
          overlap="circular"
        >
          <AddShoppingCartIcon />
        </Badge>
      </Button>
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
