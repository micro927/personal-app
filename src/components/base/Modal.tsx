import type { ReactNode, RefObject } from 'react';

function Modal({
  modalId,
  modalRef,
  closeModal,
  children,
}: {
  modalId: string;
  modalRef: RefObject<HTMLDialogElement>;
  closeModal: () => void;
  children: ReactNode;
}) {
  return (
    <dialog id={modalId} ref={modalRef} className="modal">
      <div className="modal-box bg-base-200 text-base-content">
        <div>{children}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
