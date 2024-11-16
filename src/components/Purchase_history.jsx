import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [userData, setUserData] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://unversty-2.onrender.com/users');
        const user = response.data.find(v => v._id === "6736489a0ef973f3f1448e86");
        if (user) setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (!userData) return;
      try {
        const response = await axios.get('https://unversty-2.onrender.com/purchases');
        const userPurchases = response.data.filter(purchase => purchase.userId === userData._id);
        setPurchaseHistory(userPurchases);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchPurchaseHistory();
  }, [userData]);

  const openCancelModal = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const closeCancelModal = () => {
    setSelectedPurchase(null);
    setIsModalOpen(false);
  };

  const cancelPurchase = async () => {
    if (!selectedPurchase) return;

    try {
      const productResponse = await axios.get(`https://unversty-2.onrender.com/products/${selectedPurchase.productId}`);
      const product = productResponse.data;

      await axios.put(`https://unversty-2.onrender.com/products/${selectedPurchase.productId}`, {
        quantity: product.quantity + 1
      });

      const updatedUser = await axios.put(`https://unversty-2.onrender.com/users/${userData._id}`, {
        tokens: [{ quantity: userData.tokens[0].quantity + selectedPurchase.cost }]
      });

      await axios.put(`https://unversty-2.onrender.com/purchases/${selectedPurchase._id}`, {
        status: "отменен"
      });

      setPurchaseHistory(prevHistory =>
        prevHistory.map(item =>
          item._id === selectedPurchase._id ? { ...item, status: 'отменен' } : item
        )
      );
      setUserData(updatedUser.data);

      closeCancelModal();
      alert("Покупка отменена.");
    } catch (error) {
      console.error("Error canceling purchase:", error);
      alert("Произошла ошибка при отмене покупки.");
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-6">
      <div className="sticky top-0 bg-white z-10 shadow-md">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <Link to='/shop' className="font-semibold flex text-[#4A66D3]">
              <ArrowLeft className="mr-2" /> Magazinga qaytish
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-4 md:py-6">
        <div className="space-y-4">
          {purchaseHistory.map((purchase) => (
            <div key={purchase._id} className="p-4 border rounded-lg bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{purchase.productName}</h3>
                <span className="text-sm text-gray-600">{purchase.purchaseDate}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm font-bold text-[#1e3a8a]">{purchase.cost} Монет</span>
                <span className={`text-xs ${purchase.status === 'ожидает выдачи' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {purchase.status}
                </span>
              </div>
              {purchase.status === 'ожидает выдачи' && (
                <button
                  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => openCancelModal(purchase)}
                >
                  Отменить покупку
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-[90%]">
            <h2 className="text-xl font-bold mb-4">Подтверждение отмены</h2>
            <p className="mb-4">Вы действительно хотите отменить эту покупку?</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{selectedPurchase.productName}</h3>
              <p className="text-sm text-gray-600">Стоимость: {selectedPurchase.cost} Монет</p>
              <p className="text-sm text-gray-600">Дата покупки: {selectedPurchase.purchaseDate}</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                onClick={closeCancelModal}
              >
                Отмена
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={cancelPurchase}
              >
                Подтвердить отмену
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
