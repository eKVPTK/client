import React, { useEffect, useState } from 'react';
import { fetchDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const Shop = observer(() => {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

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

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop container mx-auto py-8">
      <div className="flex mb-4 items-center justify-between">
        <div className="text-2xl font-bold mr-4">Logo</div>
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-black rounded-lg p-2 w-full h-10 shadow-sm mr-2 focus:outline-none focus:border-black"
          />
          <button className="bg-orange-500 text-white rounded-lg px-6 h-10 hover:bg-orange-600 transition duration-200">
            Искать
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {selectedBrand 
          ? `Все товары ${brands.find(brand => brand.id === Number(selectedBrand))?.name}` 
          : 'Все товары'}
      </h2>

      <div className="flex">
        <div className="w-1/6 mr-4">
          <h3 className="text-lg font-semibold mb-2">Типы</h3>
          <ul className="border rounded-lg p-2">
            <li className="mb-2">
              <button 
                onClick={() => handleTypeChange(null)} 
                className={`w-full text-left hover:bg-gray-200 rounded p-1 ${selectedType === null ? 'bg-gray-300 font-bold' : ''}`}
              >
                Все типы
              </button>
            </li>
            {types.map(type => (
              <li key={type.id} className="mb-2">
                <button 
                  onClick={() => handleTypeChange(type.id)} 
                  className={`w-full text-left hover:bg-gray-200 rounded p-1 ${selectedType === type.id ? 'bg-gray-300 font-bold' : ''}`}
                >
                  {type.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-5/6">
          <h3 className="text-lg font-semibold mb-2">Бренды</h3>
          <div className="flex space-x-2 mb-4">
            <button 
              onClick={() => handleBrandChange(null)} 
              className={`border border-gray-300 px-6 py-3 ${selectedBrand === null ? 'font-bold' : ''} hover:underline`}
            >
              Все бренды
            </button>
            {brands.map(brand => (
              <button 
                key={brand.id} 
                onClick={() => handleBrandChange(brand.id)} 
                className={`border border-gray-300 px-6 py-3 ${selectedBrand === brand.id ? 'font-bold' : ''} hover:underline`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div className="device-list grid grid-cols-3 gap-4">
            {filteredDevices.length === 0 ? (
              <p>Товаров пока нет!</p>
            ) : (
              filteredDevices.map(device => (
                <div key={device.id} className="device-item border p-4 rounded-lg shadow-md">
                  <Link to={`/device/${device.id}`}>
                    <img
                      src={`http://localhost:5000/${device.img}`}
                      alt={device.name}
                      className="w-full h-40 object-cover mb-2 rounded-lg"
                    />
                    <h2 className="text-lg font-semibold">{device.name}</h2>
                  </Link>
                  <p style={{color: 'red'}}>Товар тестовый!</p>
                  <p>{device.description}</p>
                  <p className="font-bold">{device.price} руб.</p>
                </div>
              ))
            )}
          </div>

          {filteredDevices.length > 0 && (
            <div className="pagination mt-4 flex justify-between">
              <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="bg-gray-300 rounded-lg px-4 py-2">
                Previous
              </button>
              <button onClick={() => handlePageChange(page + 1)} className="bg-gray-300 rounded-lg px-4 py-2">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Shop;
