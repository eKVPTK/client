import React, { useEffect, useState } from 'react';
import { fetchDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { FaSearch, FaList, FaTh, FaInfoCircle } from 'react-icons/fa';

const Shop = observer(() => {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const limit = 9;
  const descriptionWordLimit = 40;

  const loadData = async () => {
    try {
      const brandsData = await fetchBrands();
      setBrands(brandsData);
      const typesData = await fetchTypes();
      setTypes(typesData);
      const devicesData = await fetchDevices(selectedType, selectedBrand, page, limit);
      setDevices(devicesData.rows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedBrand, selectedType, page]);

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setPage(1);
  };

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) setPage(newPage);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop container mx-auto py-8 px-4">
     <header className="flex flex-col md:flex-row mb-6 items-center justify-between">
        <div className="text-4xl font-bold text-blue-600 mr-4">Логотип</div>
        <div className="flex items-center w-full">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-black rounded-full pl-10 p-4 w-full h-12 shadow focus:outline-none"
            />
          </div>
          <button className="bg-blue-600 text-white rounded-full ml-2 px-6 h-12 hover:bg-blue-700 transition duration-200">
            Искать
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {selectedBrand
            ? `Все товары ${brands.find(brand => brand.id === Number(selectedBrand))?.name}`
            : 'Все товары'}
        </h2>

        <div className="flex mt-4 md:mt-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 mr-2 rounded-full border transition-all duration-200
              ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-600 border-gray-300'}`}
          >
            <FaList className="mr-2" /> Вид списка
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center px-4 py-2 rounded-full border transition-all duration-200
              ${viewMode === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-600 border-gray-300'}`}
          >
            <FaTh className="mr-2" /> Вид сетки
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/5 mb-4 md:mr-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Типы</h3>
          <ul className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <li className="mb-3">
              <button
                onClick={() => handleTypeChange(null)}
                className={`w-full text-left hover:bg-gray-100 rounded-lg p-2 ${selectedType === null ? 'bg-blue-100 font-bold' : ''}`}
              >
                Все типы
              </button>
            </li>
            {types.map(type => (
              <li key={type.id} className="mb-3">
                <button
                  onClick={() => handleTypeChange(type.id)}
                  className={`w-full text-left hover:bg-gray-100 rounded-lg p-2 ${selectedType === type.id ? 'bg-blue-100 font-bold' : ''}`}
                >
                  {type.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="md:w-4/5">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Бренды</h3>
          <div className="flex flex-wrap mb-6">
            <button
              onClick={() => handleBrandChange(null)}
              className={`border border-gray-300 px-4 py-2 mb-2 ${selectedBrand === null ? 'font-bold' : ''} hover:underline`}
            >
              Все бренды
            </button>
            {brands.map(brand => (
              <button
                key={brand.id}
                onClick={() => handleBrandChange(brand.id)}
                className={`border border-gray-300 px-6 py-4 mb-2 ml-2 ${selectedBrand === brand.id ? 'font-bold' : ''} hover:underline`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div className={`device-list ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : ''}`}>
            {filteredDevices.length === 0 ? (
              <p className="text-center text-gray-500">Товаров пока нет!</p>
            ) : (
              filteredDevices.map(device => (
                <div
                  key={device.id}
                  className={`device-item border rounded-lg shadow-lg hover:shadow-xl transition duration-200 mb-6 bg-white p-4 ${viewMode === 'grid' ? '' : 'flex items-center'}`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:5000/${device.img}`}
                      alt={device.name}
                      className={`object-contain rounded-lg ${viewMode === 'grid' ? 'w-full h-48' : 'w-32 h-32 md:w-48 md:h-48 mr-6'}`}
                    />
                  </div>
                  <div className={`device-info flex flex-col justify-center ${viewMode === 'grid' ? 'text-center' : ''}`}>
                    <Link to={`/device/${device.id}`}>
                      <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition duration-200 mb-2">{device.name}</h2>
                    </Link>
                    <p className="text-gray-600 mb-2">
                      {truncateDescription(device.description, descriptionWordLimit)}
                    </p>
                    <p className="text-xl font-bold text-green-600">{device.price} ₸</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaInfoCircle className="mr-1" />
                      Товар является тестовым
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredDevices.length > 0 && (
            <div className="pagination mt-6 flex justify-between">
              <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="bg-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-400 transition duration-200">
                Предыдущая
              </button>
              <button onClick={() => handlePageChange(page + 1)} className="bg-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-400 transition duration-200">
                Следующая
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
});

export default Shop;

