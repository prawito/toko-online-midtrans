import { numberToRupiah } from "../../utils/number-to-rupiah";

/* eslint-disable react/prop-types */
export const ProductItem = ({ name, price, totalItem }) => {
    return (
        <div className="item-product-status">
            <div className="item-content">
                {totalItem && <p className="item">{totalItem}x</p>}
                <p className="name">{name}</p>
            </div>
            <p className="price">{numberToRupiah(price)}</p>
        </div>
    );
}