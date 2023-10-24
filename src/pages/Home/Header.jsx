import { useNavigate } from 'react-router-dom';
import historyImage from './ic-order-status.svg';

export const Header = () => {
  const navigate = useNavigate();

    return (
      <div className='header-banner'>
        <p className='logo-title'>Ndoro Store</p>
        <div className='icon-check-order' onClick={() => navigate('/order-status')}>
          <img src={historyImage} alt='order-status' />
        </div>
      </div>
    )
}