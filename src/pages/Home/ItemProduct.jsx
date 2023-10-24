import { useState } from "react"
import { Button } from "../../components/Button"
import { Counter } from "../../components/Counter"
import { numberToRupiah } from "../../utils/number-to-rupiah"

/* eslint-disable react/prop-types */
export const ItemProduct = ({ name, price, image, onProductChange, defaultCount }) => {
    const [count, setCount] = useState(defaultCount)

    const handleCountChange = (value) => {
      setCount(value)
      if(onProductChange) onProductChange(value)
    }

    return (
      <div className='item-product'>
        <div>
          <img className='image-product' src={image} alt={name} />
          <div className='info-product'>
            <p className='name-product'>{name}</p>
            <p className='price-product'>{numberToRupiah(price)}</p>
          </div>
        </div>
        <div>
          {count > 0 ? <Counter defaultValue={count} onValueChange={handleCountChange} /> : <Button onClick={() => handleCountChange(1)}>Beli</Button>}
        </div>
      </div>
    )
}