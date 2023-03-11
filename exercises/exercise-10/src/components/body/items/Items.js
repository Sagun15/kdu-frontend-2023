import Item from './item/Item'
import "./Items.scss";

function Items({itemsList}) {
    const keyGenerator = (item, index) => {
        return `${index}_${item.itemName}`;
    }
  return (
    <div className='items'>
        {itemsList.map((item,index) => <Item key={keyGenerator(item, index)} item={item} />)}
    </div>
  )
}

export default Items