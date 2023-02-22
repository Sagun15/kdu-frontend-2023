import "./Item.scss";

function Item({item}) {
  return (
    <div className='item'>
        <img className='item__img' src={item.url} alt={`${item.itemName}-img`} />
        <p className='item__name item__feature'>{item.itemName}</p>
        <p className='item__price item__feature'>${item.price}</p>
    </div>
  )
}

export default Item