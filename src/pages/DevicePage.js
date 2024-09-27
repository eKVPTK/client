// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchDeviceById } from '../http/deviceAPI';
// import { addToBasket, checkDeviceInBasket } from '../http/basketAPI';
// import { getUserIdFromToken } from '../utils/auth'; 
// import { addComment, editComment, deleteComment, getCommentsByDeviceId } from '../http/commentAPI'; // Импорт функций для работы с комментариями

// const DevicePage = () => {
//   const { id } = useParams(); // ID устройства из URL
//   const [device, setDevice] = useState(null);
//   const [isInBasket, setIsInBasket] = useState(false);
//   const [comments, setComments] = useState([]); // Состояние для комментариев
//   const [newComment, setNewComment] = useState(''); // Состояние для нового комментария
//   const [editCommentId, setEditCommentId] = useState(null); // ID комментария, который редактируется
//   const [editCommentText, setEditCommentText] = useState(''); // Текст редактируемого комментария

//   useEffect(() => {
//     const loadDevice = async () => {
//       try {
//         const deviceData = await fetchDeviceById(id);
//         setDevice(deviceData);
//       } catch (error) {
//         console.error('Ошибка при загрузке данных устройства:', error);
//       }
//     };

//     loadDevice();
//   }, [id]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const commentsData = await getCommentsByDeviceId(id); // Получение комментариев для устройства
//         setComments(commentsData);
//       } catch (error) {
//         console.error('Ошибка при загрузке комментариев:', error);
//       }
//     };

//     fetchComments();
//   }, [id]);

//   useEffect(() => {
//     const checkIfInBasket = async () => {
//       const userId = getUserIdFromToken();
//       if (userId) {
//         try {
//           const response = await checkDeviceInBasket(userId, id);
//           setIsInBasket(response.exists);
//         } catch (error) {
//           console.error('Ошибка при проверке устройства в корзине:', error);
//         }
//       }
//     };

//     checkIfInBasket();
//   }, [id]);

//   const handleAddToBasket = async () => {
//     const userId = getUserIdFromToken();
//     if (userId) {
//       try {
//         await addToBasket(userId, id);
//         setIsInBasket(true);
//         alert('Товар добавлен в корзину!');
//       } catch (error) {
//         console.error('Ошибка при добавлении в корзину:', error);
//       }
//     }
//   };

//   const handleAddComment = async () => {
//     const userId = getUserIdFromToken();
//     if (userId && newComment.trim()) {
//       try {
//         await addComment(userId, id, newComment); // Добавление комментария
//         setNewComment(''); // Очистка поля
//         const updatedComments = await getCommentsByDeviceId(id); // Обновление комментариев
//         setComments(updatedComments);
//       } catch (error) {
//         console.error('Ошибка при добавлении комментария:', error);
//       }
//     }
//   };

//   const handleEditComment = async () => {
//     if (editCommentId && editCommentText.trim()) {
//       try {
//         await editComment(editCommentId, editCommentText); // Редактирование комментария
//         setEditCommentId(null); // Сброс редактируемого комментария
//         setEditCommentText(''); // Очистка поля
//         const updatedComments = await getCommentsByDeviceId(id); // Обновление комментариев
//         setComments(updatedComments);
//       } catch (error) {
//         console.error('Ошибка при редактировании комментария:', error);
//       }
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(commentId); // Удаление комментария
//       const updatedComments = await getCommentsByDeviceId(id); // Обновление комментариев
//       setComments(updatedComments);
//     } catch (error) {
//       console.error('Ошибка при удалении комментария:', error);
//     }
//   };

//   if (!device) return <p>Загрузка...</p>;

//   return (
//     <div className="device-page">
//       <h1>{device.name}</h1>
//       <img 
//         src={`http://localhost:5000/${device.img}`} 
//         alt={device.name} 
//         style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
//       />
//       <p>{device.description}</p>
//       <p>Цена: ${device.price}</p>
//       {isInBasket ? (
//         <p>Товар уже есть в корзине</p>
//       ) : (
//         <button onClick={handleAddToBasket}>Добавить в корзину</button>
//       )}

//       {/* Отображение комментариев */}
//       <div className="comments-section">
//         <h2>Комментарии</h2>
//         {comments.map((comment) => (
//           <div key={comment.id} className="comment">
//             <p><strong>{comment.user.login}:</strong> {comment.text}</p>
//             {getUserIdFromToken() === comment.userId && ( // Проверяем, что пользователь может редактировать/удалять только свои комментарии
//               <>
//                 <button onClick={() => {
//                   setEditCommentId(comment.id);
//                   setEditCommentText(comment.text);
//                 }}>Редактировать</button>
//                 <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
//               </>
//             )}
//           </div>
//         ))}
//         {editCommentId && ( // Форма для редактирования комментария
//           <div className="edit-comment-section">
//             <textarea 
//               value={editCommentText} 
//               onChange={(e) => setEditCommentText(e.target.value)}
//             />
//             <button onClick={handleEditComment}>Сохранить изменения</button>
//           </div>
//         )}
//       </div>

//       {/* Форма для добавления нового комментария */}
//       <div className="add-comment-section">
//         <textarea 
//           value={newComment} 
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Напишите ваш комментарий..."
//         />
//         <button onClick={handleAddComment}>Добавить комментарий</button>
//       </div>
//     </div>
//   );
// };

// export default DevicePage;

// <p>{comment.text}</p>
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeviceById, updateDevice, deleteDevice } from '../http/deviceAPI';
import { addToBasket, checkDeviceInBasket } from '../http/basketAPI';
import { getUserIdFromToken } from '../utils/auth';
import { addComment, editComment, deleteComment, getCommentsByDeviceId } from '../http/commentAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle, faComment } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const DevicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [isInBasket, setIsInBasket] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDevice, setEditedDevice] = useState({});
  const { t } = useTranslation();

  const userId = getUserIdFromToken();

  

  useEffect(() => {
    const loadDevice = async () => {
      try {
        const deviceData = await fetchDeviceById(id);
        setDevice(deviceData);
        setEditedDevice(deviceData);
        if (deviceData && deviceData.userId === userId) {
          setIsSupplier(true);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных устройства:', error);
      }
    };

    loadDevice();
  }, [id, userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByDeviceId(id);
        setComments(commentsData);
      } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const checkIfInBasket = async () => {
      if (userId) {
        try {
          const response = await checkDeviceInBasket(userId, id);
          setIsInBasket(response.exists);
        } catch (error) {
          console.error('Ошибка при проверке устройства в корзине:', error);
        }
      }
    };

    checkIfInBasket();
  }, [id, userId]);

  const handleAddToBasket = async () => {
    if (userId) {
      try {
        await addToBasket(userId, id);
        setIsInBasket(true);
        alert('Товар добавлен в корзину!');
      } catch (error) {
        console.error('Ошибка при добавлении устройства в корзину:', error);
      }
    } else {
      alert('Пожалуйста, войдите в систему для добавления в корзину');
    }
  };

  const handleDeleteDevice = async () => {
    try {
      await deleteDevice(id);
      alert('Устройство удалено успешно!');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении устройства:', error);
    }
  };

  const handleEditDevice = async () => {
    if (isEditing) {
      try {
        await updateDevice(id, editedDevice);
        alert('Устройство обновлено успешно!');
        setDevice(editedDevice);
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка при обновлении устройства:', error);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDevice((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment(userId, id, newComment);
        setNewComment('');
        const updatedComments = await getCommentsByDeviceId(id);
        setComments(updatedComments);
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      }
    }
  };

  const handleEditComment = async (commentId) => {
    if (editCommentText.trim()) {
      try {
        await editComment(commentId, editCommentText);
        setEditCommentId(null);
        setEditCommentText('');
        const updatedComments = await getCommentsByDeviceId(id);
        setComments(updatedComments);
      } catch (error) {
        console.error('Ошибка при редактировании комментария:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      const updatedComments = await getCommentsByDeviceId(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  };

  const styles = {
    image: {
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
    },
  };

  const mediaQuery = window.matchMedia('(min-width: 1024px)');
  
  if (mediaQuery.matches) {
    styles.image.width = '60%'; 
  } else {
    styles.image.width = '100%'; 
  }

  return (
    <div style={{
      padding: '10px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
        width: '100%'
      }}>
        {device ? (
          <>
            <div style={{
              display: 'flex', 
              flexDirection: 'column',
              marginBottom: '20px',
            }}>
              <div style={styles.imageContainer}>
                <img
                  src={'http://localhost:5000/' + device.img}
                  alt={device.name}
                  style={styles.image}
                />
              </div>
              <div style={{
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                marginTop: '15px'
              }}>
                <h1 style={{
                  fontSize: '24px', 
                  color: '#333', 
                  marginBottom: '10px', 
                  fontWeight: 'bold'
                }}>
                  {device.name}
                </h1>
                <p style={{
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  marginBottom: '10px'
                }}>
                  {t('Цена:')} {device.price}₸
                </p>

                <span style={{
                  display: 'block', 
                  fontSize: '16px', 
                  margin: '10px 0', 
                  color: '#555', 
                  fontWeight: 'normal'
                }}>
                  {t('Номер поставщика:')} <br />
                  <span style={{
                    color: '#007bff', 
                    fontWeight: 'bold'
                  }}>
                    {device.phone}
                  </span>
                </span>

                <button
                  onClick={handleAddToBasket}
                  style={{
                    marginTop: '10px',
                    padding: '12px 18px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
                >
                  <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '5px' }} />
                  {t('Добавить в корзину')}
                </button>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h2 style={{
                fontSize: '18px', 
                marginBottom: '10px', 
                color: '#333'
              }}>
                {t('Описание товара')}
              </h2>
              <p style={{
                margin: '10px 0', 
                color: '#666', 
                lineHeight: '1.5'
              }}>
                {device.description}
              </p>
              
              <h4 style={{
                fontSize: '16px', 
                margin: '20px 0 10px', 
                color: '#333'
              }}>
                {t('Характеристики')}
              </h4>
              {device.info.map((info) => (
                <div key={info.id} style={{
                  marginBottom: '10px', 
                  borderBottom: '1px solid #eee', 
                  paddingBottom: '8px'
                }}>
                  <strong style={{
                    fontWeight: 'bold', 
                    color: '#555'
                  }}>
                    {info.title}: 
                  </strong>
                  <span style={{
                    marginLeft: '5px', 
                    color: '#777'
                  }}>
                    {info.description}
                  </span>
                </div>
              ))}
            </div>

            {isSupplier && (
              <>
                <div style={{
                  marginTop: '40px', 
                  display: 'flex', 
                  justifyContent: 'space-between'
                }}>
                  <button
                    onClick={handleEditDevice}
                    style={{
                      backgroundColor: isEditing ? '#ffc107' : '#007bff',
                      color: '#fff',
                      padding: '10px 15px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s',
                      marginRight: '10px'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isEditing ? '#e0a800' : '#0056b3')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isEditing ? '#ffc107' : '#007bff')}
                  >
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                    {isEditing ? t('Сохранить изменения') : t('Редактировать')}
                  </button>
                  <button
                    onClick={handleDeleteDevice}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      padding: '10px 15px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                    {t('Удалить устройство')}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <p>{t('Загрузка...')}</p>
        )}
      </div>
    </div>
  );
};

export default DevicePage;
