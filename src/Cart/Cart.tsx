import CartItem from '../CartItem/CartItem'
import { CartItemType } from '../App'

type Props = {
  cartItems: CartItemType[]
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce(
      (accumulator: number, item) => accumulator + item.quantity * item.price,
      0
    )

  return (
    <div className="cart">
      <h2>Your shopping cart</h2>
      {cartItems.length === 0 ? <p>cart is empty</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: R{calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  )
}

export default Cart
