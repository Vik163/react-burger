import { useEffect } from 'react';

import './modal-overlay.css';

function ModalOverlay(props) {
  const { isModalOpen, closeModal } = props;
  useEffect(() => {
    if (!isModalOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isModalOpen, closeModal]);

  const closeOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    isModalOpen && (
      <div className='overlay' id='overlay' onClick={closeOverlay} />
    )
  );
}

export default ModalOverlay;
