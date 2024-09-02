
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { transactionId, amount, bookingId } = location.state || {};
  console.log();

  return (
    <div className="container">
      <div className="success-message">
        <h1>Payment Successful!</h1>
        <p>Your payment has been processed successfully. Thank you for your purchase.</p>
        <div className="details">
          <h2>Order Details</h2>
          <p><strong>Transaction ID:</strong> <span>{transactionId || 'N/A'}</span></p>
          <p><strong>Amount:</strong> BDT <span>{amount || 'N/A'}</span></p>
          <p><strong>Booking ID:</strong> <span>{bookingId || 'N/A'}</span></p>
        </div>
        <a href="/" className="btn">Return to Home</a>
      </div>
    </div>
  );
};

export default Success;