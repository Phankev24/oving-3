import React, { useEffect, useRef } from "react";

export function Dialog({ isDialogOpen, setIsDialogOpen, children }) {
  const dialogRef = useRef(null);

  function handleClickBackdrop(e) {
    if (e.target === e.currentTarget) setClosed();
  }

  function setClosed() {
    setIsDialogOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("close", setClosed);
    }
    return () => {
      if (dialog) {
        dialog.removeEventListener("close", setClosed);
      }
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDialogOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isDialogOpen]);

  return (
    <dialog ref={dialogRef} onClick={handleClickBackdrop}>
      {children}
    </dialog>
  );
}
