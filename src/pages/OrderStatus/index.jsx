/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { statusMapping } from "../../utils/status-mapping";
import { API_URL } from "../../utils/const";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Layout } from "../../components/Layout";
import { ProductItem } from "./ProductItem";
import { Item } from "./Item";
import './order-status.css'

const OrderStatus = () => {
    const [transaction, setTransaction] = useState(null);
    const [searchTransactionId, setSearchTransactionId] = useState('');
    const [emptyMessage, setEmptyMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const getTransactionDetail = useCallback(async (transactionId) => {
        if(!transactionId) return alert('Transaction ID harus diisi');
        const response = await fetch(`${API_URL}/transactions/${transactionId}`);
        const res = await response.json();
        if(res.data) {
            setTransaction(res.data);
            setSearchParams({transaction_id: transactionId}, {replace: true});
            setEmptyMessage('');
        } else {
            setEmptyMessage('Transaksi tidak ditemukan');
            setTransaction(null);
            setSearchParams({}, {replace: true});
        }
    }, [setSearchParams])
    
    useEffect(() => {
        const transactionId = searchParams.get('transaction_id');
        if(transactionId) {
            getTransactionDetail(transactionId);
        } else {
            setEmptyMessage('Belum ada transaksi yang dicari, silahkan masukkan ID Transaksi');
        }
    }, [getTransactionDetail, searchParams]);

    return (
        <Layout title="Status Pesanan" onBack={() => navigate('/', {replace: true})}>
            <Input label="Kode Pesanan" value={searchTransactionId} onChange={(e) => setSearchTransactionId(e.target.value)} />
            <Button onClick={() => getTransactionDetail(searchTransactionId)}>Cek Status Pesanan</Button>
            <hr/>
            {emptyMessage && <p className="empty-message">{emptyMessage}</p>}
            {transaction && (
                <>
                    <div className="transaction-status">
                        <Item label="Transaction ID" value={transaction.id} />
                        <Item label="Customer Name" value={transaction.customer_name} />
                        <Item label="Customer Email" value={transaction.customer_email} />
                        <Item label="Status" value={statusMapping(transaction.status)} />
                        {transaction.payment_method && (
                            <Item label="Payment Method" value={transaction.payment_method} />
                        )}
                    </div>
                    <div className="transaction-status">
                        {transaction.products.map((product) => (
                            <ProductItem key={product.id} name={product.name} price={product.price} totalItem={product.quantity} />
                        ))}
                        <ProductItem name="Total" price={transaction.total} />
                    </div>
                </>
            )}
        </Layout>
    );
};

export default OrderStatus;
