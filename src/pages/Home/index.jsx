import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../utils/const";
import { FloatingCheckout } from "./FloatingCheckout";
import { ItemProduct } from "./ItemProduct";
import { Header } from "./Header";
import './home.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const getCartFromLocalStorage = useCallback(async () => {
      const cart = await JSON.parse(localStorage.getItem('cart')) ?? [];
      setCart(cart);
      return cart;
    }, [])

    const getProducts = useCallback(async () => {
      const {data} = await fetch(`${API_URL}/products`).then((res) => res.json());
      
      const cart = await getCartFromLocalStorage();
      const product = data.map((item) => {
        const productItem = cart.find((product) => product.id === item.id);
        if(productItem) {
          return {
            ...item,
            count: productItem.count
          }
        }
        return item;
      })
      setProducts(product);
  }, [getCartFromLocalStorage])

  const handleProductChange = async (product, value) => {
    let newCart = [...cart];
    if(value === 0) {
      newCart = cart.filter(item => item.id !== product.id);
    } else {
      const productItem = cart.find(item => item.id === product.id);
      const findIndex = cart.findIndex(item => item.id === product.id);
      if(productItem) {
        productItem.count = value;
        newCart[findIndex] = productItem;
      } else if(value > 0) {
        newCart.push({
          ...product,
          count: value
        })
      }
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

    useEffect(() => {
      getProducts();
    }, [getProducts]);

    return (
      <div className='container'>
        <Header />
        <div className='main-content'>
          {products.map((product) => (
            <ItemProduct key={product.id} defaultCount={product.count} name={product.name} price={product.price} image={product.image} onProductChange={(value) => handleProductChange(product, value)} />
          ))}
        </div>
        {cart.length > 0 && (
          <FloatingCheckout cart={cart} />
        )}
      </div>
    );
  }
  
  export default Home;