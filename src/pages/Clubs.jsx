import React, { useEffect, useState } from "react";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://unversty-2.onrender.com/clubAccounts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        return response.json();
      })
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative">
      {/* Индикатор загрузки */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Основной контент */}
      <div className={`container mx-auto px-4 py-8 ${loading ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {!loading && (
          <>
            <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">
              Список клубов
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.length > 0 ? (
                clubs.map((club) => (
                  <div
                    key={club.club_id}
                    className="bg-blue-700 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
                  >
                    <h2 className="text-2xl font-semibold mb-2 text-white">
                      {club.name || "Без названия"}
                    </h2>
                    <p className="text-white mb-4">
                      <span className="font-bold">Лидер:</span> {club.leader || "Не указан"}
                    </p>
                    <p className="text-white mb-4">
                      <span className="font-bold">ID клуба:</span> {club.club_id}
                    </p>
                    <p className="text-white mb-4">
                      <span className="font-bold">Время активности:</span> {club.time || "Не указано"} часов
                    </p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                      Подробнее
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500">
                  Нет данных о клубах
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Clubs;
