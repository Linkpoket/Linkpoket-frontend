import { useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T> | React.RefObject<T>[],
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const refs = Array.isArray(ref) ? ref : [ref];

      const validRefs = refs.filter((r) => r.current !== null);
      if (validRefs.length === 0) return;

      let matchFound = false;
      validRefs.forEach((r) => {
        if (r.current && r.current.contains(target)) {
          matchFound = true;
        }
      });

      if (!matchFound) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setIsOpen, enabled]);
}

/* 
외부에선 ref값과 해당 컴포넌트의 마운트를 결정하는 set함수를 매개변수로 넣어 사용합니다 
useClickOutside(ref,setIsOpen) 이렇게 사용하시고, ref값을 가장 부모 요소에게 전달해주시면 됩니다. 참고 컴포넌트: dropdownInline.tsx 혹은 ModalNotification.tsx   
*/
