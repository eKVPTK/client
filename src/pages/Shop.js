import React, { useEffect, useState } from 'react';
import { fetchDevices, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { FaSearch, FaList, FaTh, FaInfoCircle, FaCaretDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import WarningBeta from '../components/WarningBeta';

const Shop = observer(() => {
  const [devices, setDevices] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const limit = 9;
  const { t } = useTranslation();

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

  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'grid' : 'list');
    };

    handleResize(); // Устанавливаем начальное состояние
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setPage(1);
  };

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setPage(1);
    setIsDropdownOpen(false); 
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) setPage(newPage);
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    const wordLimit = getDescriptionLimit(); // Используем функцию getDescriptionLimit для определения лимита слов
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };
  
  const getDescriptionLimit = () => {
    const isMobile = window.innerWidth < 768; 
    return isMobile ? 20 : 40; 
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop container mx-auto py-8 px-4">
      <header className="flex flex-col md:flex-row mb-6 items-center justify-between">
        <div className="text-4xl font-bold text-blue-600 mr-4 mb-4 md:mb-0">OptiTradeHub</div>
        <div className="flex items-center w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-black rounded-full pl-4 p-4 w-full h-12 shadow focus:outline-none"
            />
          </div>
          <button 
            className="bg-blue-600 text-white rounded-full ml-2 w-12 h-12 flex items-center justify-center hover:bg-blue-700 transition duration-200"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <FaSearch />
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          {selectedBrand
            ? t('allProductsInBrand', { brand: brands.find(brand => brand.id === Number(selectedBrand))?.name })
            : t('allProducts')}
        </h2>

        <div className="flex mt-4 md:mt-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 mr-2 rounded-full border transition-all duration-200
              ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-600 border-gray-300'}`}
          >
            <FaList className="mr-2" /> {t('list')}
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center px-4 py-2 rounded-full border transition-all duration-200
              ${viewMode === 'grid' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-600 border-gray-300'}`}
          >
            <FaTh className="mr-2" /> {t('grid')}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/5 mb-4 md:mr-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">{t('types')}</h3>

          <div className="block md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left bg-gray-200 rounded-lg p-2 flex justify-between items-center hover:bg-gray-300"
            >
              {selectedType ? types.find(type => type.id === selectedType)?.name : t('selectType')} <FaCaretDown />
            </button>
            {isDropdownOpen && (
              <ul className="border rounded-lg p-4 bg-gray-50 shadow-sm mt-2">
                <li className="mb-3">
                  <button
                    onClick={() => handleTypeChange(null)}
                    className={`w-full text-left hover:bg-gray-100 rounded-lg p-2 ${selectedType === null ? 'bg-blue-100 font-bold' : ''}`}
                  >
                    {t('allProducts')}
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
            )}
          </div>

          <div className="hidden md:block">
            <ul className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <li className="mb-3">
                <button
                  onClick={() => handleTypeChange(null)}
                  className={`w-full text-left hover:bg-gray-100 rounded-lg p-2 ${selectedType === null ? 'bg-blue-100 font-bold' : ''}`}
                >
                  {t('allProducts')}
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
          </div>
        </aside>

        <main className="md:w-4/5">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">{t('brands')}</h3>
          <div className="flex flex-wrap mb-6">
            <button
              onClick={() => handleBrandChange(null)}
              className={`border border-gray-300 px-4 py-2 mb-2 ${selectedBrand === null ? 'font-bold' : ''} hover:underline`}
            >
              {t('allBrands')}
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

          <div>
            <WarningBeta />
          </div>
          <div className={`device-list ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : ''}`}>
            {filteredDevices.length === 0 ? (
              <p className="text-center text-gray-500">{t('noProducts')}</p>
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
                      {truncateDescription(device.description)}
                    </p>
                    <p className="text-xl font-bold text-green-600">{device.price} ₸</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaInfoCircle className="mr-1" />
                      {t('testProduct')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="border border-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {t('back')}
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={filteredDevices.length < limit}
              className="border border-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {t('forward')}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
});

export default Shop;
