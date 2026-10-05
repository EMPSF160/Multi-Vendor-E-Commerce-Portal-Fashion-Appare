import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Ruler, Check } from 'lucide-react';

export const SizeGuideModal = () => {
  const { sizeGuideModal, setSizeGuideModal } = useApp();
  const [unit, setUnit] = useState('cm'); // 'cm' | 'inches'

  if (!sizeGuideModal) return null;

  const womenSizeChart = [
    { fr: '34', it: '38', uk: '6', us: '2', jp: '5', bustCm: '80-84', bustIn: '31.5-33', waistCm: '60-64', waistIn: '23.5-25', hipCm: '86-90', hipIn: '34-35.5' },
    { fr: '36', it: '40', uk: '8', us: '4', jp: '7', bustCm: '84-88', bustIn: '33-34.5', waistCm: '64-68', waistIn: '25-27', hipCm: '90-94', hipIn: '35.5-37' },
    { fr: '38', it: '42', uk: '10', us: '6', jp: '9', bustCm: '88-92', bustIn: '34.5-36', waistCm: '68-72', waistIn: '27-28.5', hipCm: '94-98', hipIn: '37-38.5' },
    { fr: '40', it: '44', uk: '12', us: '8', jp: '11', bustCm: '92-96', bustIn: '36-38', waistCm: '72-76', waistIn: '28.5-30', hipCm: '98-102', hipIn: '38.5-40' },
    { fr: '42', it: '46', uk: '14', us: '10', jp: '13', bustCm: '96-100', bustIn: '38-39.5', waistCm: '76-80', waistIn: '30-31.5', hipCm: '102-106', hipIn: '40-42' },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-content !max-w-3xl p-6 relative">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <Ruler size={18} className="text-[#c5a059]" />
            <h3 className="font-serif text-lg font-bold text-gray-900">
              International Luxury Sizing Chart
            </h3>
          </div>
          <button
            onClick={() => setSizeGuideModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* Unit toggle */}
        <div className="flex items-center justify-between my-4">
          <p className="text-xs text-gray-500">
            Compare French, Italian, British, American, and Japanese runway sizing standards.
          </p>
          <div className="flex items-center border border-gray-300 rounded-xs p-0.5 text-xs">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-xs font-semibold ${
                unit === 'cm' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-xs font-semibold ${
                unit === 'inches' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#faf8f4] border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">FR / EU</th>
                <th className="py-3 px-3">IT</th>
                <th className="py-3 px-3">UK</th>
                <th className="py-3 px-3">US</th>
                <th className="py-3 px-3">JP</th>
                <th className="py-3 px-3">Bust ({unit})</th>
                <th className="py-3 px-3">Waist ({unit})</th>
                <th className="py-3 px-3">Hips ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {womenSizeChart.map((row) => (
                <tr key={row.fr} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-bold bg-[#fcfbfa]">{row.fr}</td>
                  <td className="py-2.5 px-3">{row.it}</td>
                  <td className="py-2.5 px-3">{row.uk}</td>
                  <td className="py-2.5 px-3">{row.us}</td>
                  <td className="py-2.5 px-3">{row.jp}</td>
                  <td className="py-2.5 px-3 font-mono">{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                  <td className="py-2.5 px-3 font-mono">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                  <td className="py-2.5 px-3 font-mono">{unit === 'cm' ? row.hipCm : row.hipIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Luxury Fit Advice */}
        <div className="mt-5 p-4 bg-[#f8f7f4] border border-[#ece8e0] rounded-xs text-xs text-gray-700">
          <div className="font-bold uppercase tracking-wider text-black mb-1 flex items-center gap-1.5">
            <Check size={14} className="text-[#c5a059]" />
            <span>Editorial Fit Advice</span>
          </div>
          <p className="leading-relaxed">
            Our luxury partner boutiques adhere to exact European couture sizing. If you are in between sizes or prefer an effortless oversized silhouette, we recommend choosing one size up. Contact our dedicated Private Client concierge for bespoke measurements.
          </p>
        </div>
      </div>
    </div>
  );
};
