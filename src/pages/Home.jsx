import React from 'react'
import { Search, User } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="relative">
          <input
            type="text"
            className="w-[200px] bg-violet-100 border border-violet-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Search"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400" size={20} />
        </div>
        <div className="bg-violet-200 rounded-full py-2 px-4 text-violet-700 font-semibold">
          Token
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-violet-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-violet-800 mb-4">Yangiliklar faqat rasm yuklandi</h2>
            <div className="bg-violet-200 h-40 rounded-lg"></div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-violet-800 mb-4">EVENTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Eventda bo'ladigan narsalar:",
                "Yuqorisiga qaysi klub tomonidan chiqarilganini qo'shish kerak",
                "agar umuman tadbir bo'lmasa o'rnida \"Not found\""
              ].map((text, index) => (
                <div key={index} className="bg-violet-100 rounded-lg p-4">
                  <p className="text-violet-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-violet-800 mb-4">Reyting</h3>
          <div className="bg-violet-100 rounded-lg p-4 mb-4 flex items-center">
            <User className="text-violet-400 mr-2" size={24} />
            <span className="text-violet-700 font-semibold">Profil rasm</span>
          </div>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-violet-100 h-8 rounded-lg mb-2"></div>
          ))}
        </div>
      </div>
    </div>
  )
}