import Button from '@material-ui/core/Button'
import { CartItemType } from '../App'

type Props = {
  item: CartItemType
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <div className="cart-item">
    <div className="details">
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: R{item.price}</p>
        <p>Total: R{(item.quantity * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.quantity}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </div>
)

export default CartItem
