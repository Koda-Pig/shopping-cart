import CartItem from '../CartItem/CartItem'
import { CartItemType } from '../App'

type Props = {
  cartItems: CartItemType[]
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
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
    </div>
  )
}

export default Cart
