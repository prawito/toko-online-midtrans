import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { numberToRupiah } from "../../utils/number-to-rupiah";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { API_URL } from "../../utils/const";
import { Product } from "./Product";
import './checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState({
        name: '',
        email: ''
    });
    
    const getCart = useCallback(async () => {
        const cart = await localStorage.getItem('cart')
        if(cart) {
            setCart(JSON.parse(cart))
        } else {
            setCart([])
        }
    }, []);

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
    }

    const pay = async () => {
        if(!customer.name || !customer.email) {
            alert(`${!customer.name ? 'Nama' : 'Email'} harus diisi`)
            return
        }

        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_name: customer.name,
                customer_email: customer.email,
                products: cart.map((item) => ({
                    id: item.id,
                    quantity: item.count
                }))
            })
        }).then((res) => res.json())
        
        if(response && response.status === 'success') {
            await localStorage.removeItem('cart')
            navigate(`/order-status?transaction_id=${response.data.id}`)
        } else if(response && response.status === 'error') {
            alert(response.errors.map((msg) => msg.msg).join(', '))
        }
    }

    useEffect(() => {
        getCart()
    }, [getCart])

    const totalOrder = cart.reduce((total, item) => total + (item.count * item.price), 0);

    return (
        <Layout title="Checkout" onBack={() => navigate('/')}>
            <p className="section-title">Detail Produk</p>
            <div className="summary">
                {cart.map((item) => (
                    <Product key={item.id} item={item} />
                ))}
                <div className="item">
                    <p>Total Order</p>
                    <p>{numberToRupiah(totalOrder)}</p>
                </div>
            </div>
            <p className="section-title">Detail Pelanggan</p>
            <Input label="Nama Lengkap" value={customer.name} onChange={handleChange} name="name" />
            <Input label="Email" value={customer.email} onChange={handleChange} name="email" />
            <div className="action-pay">
                <Button onClick={pay}>Bayar Sekarang</Button>
            </div>
        </Layout>
    );
}

export default Checkout;
