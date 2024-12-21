import React from "react";

const About = () => {
    return (
        <div className="p-6 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-6 text-center">
                Yangi Oʻzbekiston Universiteti
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                <span className="font-semibold">Yangi Oʻzbekiston Universiteti</span> —
                Toshkent shahrida joylashgan zamonaviy oliy taʼlim muassasasi. Ushbu
                universitet Oʻzbekiston Respublikasi Prezidenti{" "}
                <span className="text-indigo-700">Shavkat Mirziyoyev</span>ning
                tashabbusi bilan 2021-yil 23-iyunda tashkil etilgan. Maqsad — yangi
                avlod yetakchilarini tayyorlash va yoshlar uchun global taʼlim
                imkoniyatlarini taʼminlashdir.
            </p>

            <h2 className="text-3xl font-bold text-indigo-700 mt-8 mb-4">
                Birinchi Imtihon
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Universitetga kirish uchun birinchi imtihon{" "}
                <span className="font-semibold text-indigo-700">2021-yilning 6-sentabr</span>{" "}
                kuni Toshkentda oʻtkazildi. Imtihonda{" "}
                <span className="font-semibold text-indigo-700">6000+</span> talabgor
                ishtirok etdi va ulardan faqat{" "}
                <span className="font-semibold text-indigo-700">1213</span> nafari
                muvaffaqqiyatli oʻtib, test jarayonlarida qatnashish imkoniyatini
                qoʻlga kiritdi. Test sinovlari uch soat davom etdi va barcha savollar{" "}
                <span className="font-semibold">ingliz tilida</span> boʻldi.
            </p>

            <h2 className="text-3xl font-bold text-indigo-700 mt-8 mb-4">
                Akademik Dasturlar
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Yangi Oʻzbekiston Universiteti{" "}
                <span className="font-semibold">Myunxen Texnika Universiteti</span>{" "}
                bilan hamkorlikda yuqori sifatli ingliz tilidagi taʼlimni taklif etadi.
                Talabalar zamonaviy fanlar boʻyicha bilim olishlari uchun{" "}
                <span className="text-indigo-700 font-semibold">4 ta akademik maktab</span> tashkil etilgan:
            </p>
            <ul className="list-disc ml-8 mb-6 text-gray-800">
                <li className="mb-2 text-lg">
                    <span className="font-semibold text-indigo-700">Raqamli texnologiyalar maktabi:</span>{" "}
                    Sun'iy intellekt, kiberxavfsizlik va dasturiy ta'minot muhandisligi yoʻnalishlari.
                </li>
                <li className="mb-2 text-lg">
                    <span className="font-semibold text-indigo-700">Muhandislik maktabi:</span>{" "}
                    Mexanika muhandisligi va kimyo muhandisligi yoʻnalishlari.
                </li>
                <li className="mb-2 text-lg">
                    <span className="font-semibold text-indigo-700">
                        Gumanitar, tabiiy va ijtimoiy fanlar maktabi:
                    </span>{" "}
                    Amaliy matematika va iqtisodiyot yoʻnalishlari.
                </li>
                <li className="mb-2 text-lg">
                    <span className="font-semibold text-indigo-700">Boshqaruv maktabi:</span>{" "}
                    Sanoat boshqaruvi va innovatsiyalar.
                </li>
            </ul>



            <h2 className="text-3xl font-bold text-indigo-700 mt-8 mb-4">
                Universitetning Missiyasi
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Universitet o‘z oldiga zamonaviy bilimlar va ko‘nikmalar bilan qurollangan, global
                fikrlash qobiliyatiga ega mutaxassislarni tayyorlashni maqsad qilgan.
                Yangi Oʻzbekiston Universiteti yoshlarning intilishlarini qoʻllab-quvvatlab,
                ularga yorqin kelajak sari yoʻl ochmoqda.
            </p>

            <blockquote className="italic text-indigo-700 font-semibold text-center bg-indigo-100 p-4 rounded-lg shadow-md">
                “Yangi avlod yetakchilari — bizning kelajagimizning kaliti.”
            </blockquote>
        </div>
    );
};

export default About;