/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { numberToRupiah } from "../../utils/number-to-rupiah";

export const FloatingCheckout = ({cart}) => {
    const navigate = useNavigate();
    const totalItem = cart.reduce((total, item) => total + item.count, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.count * item.price), 0);

    return (
      <div className='floating-checkout' onClick={() => navigate('/checkout')}>
        <p className='total-item'>{totalItem} Item</p>
        <p className='total-price'>{numberToRupiah(totalPrice)}</p>
      </div>
    )
}