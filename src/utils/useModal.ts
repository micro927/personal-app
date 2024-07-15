import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useModal = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    modalRef.current?.close();
    navigate('', {
      state: {
        modal: undefined,
      },
    });
  };

  const openModal = () => {
    modalRef.current?.showModal();
    navigate('', {
      state: undefined,
    });
  };

  const handlePopState = (event: PopStateEvent) => {
    event.preventDefault();
    closeModal();
  };

  const handleClickEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) modalRef.current.addEventListener('keydown', handleClickEscape);
    return () => {
      modal?.removeEventListener('keydown', handleClickEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOpenModal = modalRef.current?.open ?? false;

  return {
    modalRef,
    openModal,
    closeModal,
    isOpenModal,
  };
};
