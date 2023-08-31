import { useState } from "react";

export const Text = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reloadFetch, setReloadFetch] = useState(false);

  const [modalAddStudent, setModalStudentAdd] = useState(false);
  const modalStudents = () => {
    setModalStudentAdd(!modalAddStudent);
  };

  return (
    <>
      {/* {modalAddStudent && <ModalAddStudents modalStudents={isOpen} cerrarModal={modalStudents} reloadFetchState={setReloadFetch} />}
      <button onClick={modalStudents}>agregar</button> */}
    </>
  );
};
