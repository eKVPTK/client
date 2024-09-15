import React, { useState } from 'react';
import { createType, createBrand, deleteDeviceByAdmin, deleteBrand, deleteType } from '../http/deviceAPI'; 

const Admin = () => {
  const [typeName, setTypeName] = useState(''); 
  const [brandName, setBrandName] = useState(''); 
  const [deviceId, setDeviceId] = useState(''); 
  const [brandId, setBrandId] = useState('');
  const [typeId, setTypeId] = useState('');

  const handleAddType = async () => {
    if (!typeName.trim()) {
      alert("Введите название типа");
      return;
    }

    try {
      await createType({ name: typeName });
      alert("Тип успешно добавлен!");
      setTypeName('');
    } catch (error) {
      console.error('Ошибка при добавлении типа:', error);
      alert("Ошибка при добавлении типа");
    }
  };

  const handleAddBrand = async () => {
    if (!brandName.trim()) {
      alert("Введите название бренда");
      return;
    }

    try {
      await createBrand({ name: brandName });
      alert("Бренд успешно добавлен!");
      setBrandName(''); 
    } catch (error) {
      console.error('Ошибка при добавлении бренда:', error);
      alert("Ошибка при добавлении бренда");
    }
  };

  const handleDeleteDevice = async () => {
    if (!deviceId.trim()) {
      alert("Введите ID устройства");
      return;
    }

    try {
      await deleteDeviceByAdmin(deviceId);
      alert("Устройство успешно удалено!");
      setDeviceId('');
    } catch (error) {
      console.error('Ошибка при удалении устройства администратором:', error);
      alert("Ошибка при удалении устройства администратором");
    }
  };

  const handleDeleteBrand = async () => {
    if (!brandId.trim()) {
      alert("Введите ID бренда");
      return;
    }

    try {
      await deleteBrand(brandId);
      alert("Бренд успешно удален!");
      setBrandId('');
    } catch (error) {
      console.error('Ошибка при удалении бренда:', error);
      alert("Ошибка при удалении бренда");
    }
  };

  const handleDeleteType = async () => {
    if (!typeId.trim()) {
      alert("Введите ID типа");
      return;
    }

    try {
      await deleteType(typeId);
      alert("Тип успешно удален!");
      setTypeId('');
    } catch (error) {
      console.error('Ошибка при удалении типа:', error);
      alert("Ошибка при удалении типа");
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      
      <div>
        <h2>Добавить новый тип устройства</h2>
        <input
          type="text"
          placeholder="Введите название типа"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
        <button onClick={handleAddType}>Добавить тип</button>
      </div>
      
      <div>
        <h2>Добавить новый бренд</h2>
        <input
          type="text"
          placeholder="Введите название бренда"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <button onClick={handleAddBrand}>Добавить бренд</button>
      </div>

      <div>
        <h2>Удалить устройство</h2>
        <input
          type="text"
          placeholder="Введите ID устройства"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        />
        <button onClick={handleDeleteDevice}>Удалить устройство</button>
      </div>
      <div>
        <h2>Удалить бренд</h2>
        <input
          type="text"
          placeholder="Введите ID бренда"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        />
        <button onClick={handleDeleteBrand}>Удалить бренд</button>
      </div>

      <div>
        <h2>Удалить тип</h2>
        <input
          type="text"
          placeholder="Введите ID типа"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        />
        <button onClick={handleDeleteType}>Удалить тип</button>
      </div>
    </div>
  );
};

export default Admin;
