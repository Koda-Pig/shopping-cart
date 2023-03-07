import Button from '@material-ui/core/Button'
import { CartItemType } from '../App'

type Props = {
  item: CartItemType
  handleAddToCart: (clickedItem: CartItemType) => void
}

// React.FC = React Functional Component
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <>
    <img src={item.image} alt={item.title} />
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <h3>R{item.price}</h3>
    </div>
    <Button className="cartBtn" onClick={() => handleAddToCart(item)}>
      Add to cart
    </Button>
  </>
)

export default Item
