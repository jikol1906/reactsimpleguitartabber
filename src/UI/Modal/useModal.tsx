import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState<{
    show: boolean;
    header: string;
    content: string;
    handlers: { name: string; handler: () => any }[];
  }>({
    show: false,
    header: '',
    content: '',
    handlers: [],
  });

  const closeModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };

  const openModal = (header:string,content:string,handlers:{name:string,handler:() => any}[]) => {
    setModal({
        show:true,
        header,
        content,
        handlers
    })
  }

  return {modal,closeModal,openModal}
};
