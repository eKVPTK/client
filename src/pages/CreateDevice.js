import React, { useEffect, useState } from 'react';
import { createDevice, fetchBrands, fetchTypes } from '../http/deviceAPI';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/auth'; 
import { FaPlus, FaTrash } from 'react-icons/fa';

const CreateDevicePage = () => {
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const userId = getUserIdFromToken();
  const phonePattern = /^((\+7)|8)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTypes().then(data => setTypes(data));
    fetchBrands().then(data => setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    if (name.length <= 4) {
      setError('Название устройства/услуги не должно быть меньше 4 символов');
      return;
    } else if (price > 1_000_000_000) {
      setError('Некорректное значение стоимости');
      return;
    } else if (!description) {
      setError('Описание не должно быть пустым');
      return;
    } else if (!phonePattern.test(phone)) {
      setError('Некорректный телефон');
      return;
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', `${price}`);
      formData.append('description', description);
      formData.append('img', file);
      formData.append('brandId', selectedBrand);
      formData.append('typeId', selectedType);
      formData.append('info', JSON.stringify(info));
      formData.append('phone', phone);
      formData.append('userId', userId);

      createDevice(formData).then(data => navigate('/devices'));
    }
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '40px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem' }}>Добавить товар/услугу</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Тип:</label>
          <select onChange={e => setSelectedType(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px' }}>
            <option value="">Выберите тип</option>
            {types.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Бренд:</label>
          <select onChange={e => setSelectedBrand(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px' }}>
            <option value="">Выберите бренд</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>

        {error && <span style={{ color: 'red', marginBottom: '20px', display: 'block' }}>{error}</span>}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Название устройства/услуги:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Введите название устройства/услуги"
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Стоимость:</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            placeholder="Введите стоимость устройства/услуги"
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Описание:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Введите описание устройства/услуги"
            style={{ width: '100%', padding: '10px', marginTop: '5px', minHeight: '100px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Телефон для связи:</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Введите телефон для связи с поставщиком"
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Изображение:</label>
          <input
            type="file"
            onChange={selectFile}
            style={{ padding: '10px', marginTop: '5px' }}
          />
        </div>

        <hr style={{ margin: '20px 0' }} />

        <button
          onClick={addInfo}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 15px',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
          onFocus={e => (e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)')}
          onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
        >
          <FaPlus style={{ marginRight: '5px' }} /> Добавить новое свойство
        </button>

        {info.map(i =>
          <div key={i.number} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <input
              value={i.title}
              onChange={(e) => changeInfo('title', e.target.value, i.number)}
              placeholder="Введите название свойства"
              style={{ width: 'calc(50% - 10px)', padding: '10px', marginRight: '10px' }}
            />
            <input
              value={i.description}
              onChange={(e) => changeInfo('description', e.target.value, i.number)}
              placeholder="Введите описание свойства"
              style={{ width: 'calc(50% - 10px)', padding: '10px', marginRight: '10px' }}
            />
            <button onClick={() => removeInfo(i.number)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}>
              <FaTrash />
            </button>
          </div>
        )}

        <button onClick={addDevice} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default CreateDevicePage;
