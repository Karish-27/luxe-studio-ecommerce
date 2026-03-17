import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS': {
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
                trackingEvents: [
                  ...order.trackingEvents,
                  { timestamp: new Date().toISOString(), description: action.payload.description },
                ],
              }
            : order
        ),
      };
    }
    default:
      return state;
  }
};

const loadState = () => {
  try {
    const saved = localStorage.getItem('noir_orders');
    return saved ? { orders: JSON.parse(saved) } : { orders: [] };
  } catch {
    return { orders: [] };
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem('noir_orders', JSON.stringify(state.orders));
    } catch {}
  }, [state.orders]);
  const timersRef = useRef([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const addOrder = useCallback((orderData) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const order = {
      orderId,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ' + (orderData.cardLast4 || '4242'),
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping: orderData.shipping,
      total: orderData.total,
      status: 'Confirmed',
      orderDate: new Date().toISOString(),
      trackingEvents: [
        { timestamp: new Date().toISOString(), description: 'Order confirmed and payment processed' },
      ],
    };

    dispatch({ type: 'ADD_ORDER', payload: order });

    // Simulate status progression
    const t1 = setTimeout(() => {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId, status: 'Processing', description: 'Order is being prepared for shipment' },
      });
    }, 30000);

    const t2 = setTimeout(() => {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId, status: 'Shipped', description: 'Package has been shipped via express carrier' },
      });
    }, 60000);

    const t3 = setTimeout(() => {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId, status: 'Delivered', description: 'Package has been delivered successfully' },
      });
    }, 120000);

    timersRef.current.push(t1, t2, t3);

    return orderId;
  }, []);

  return (
    <OrderContext.Provider value={{ orders: state.orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};

export default OrderContext;
