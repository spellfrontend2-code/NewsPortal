import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  hasShownPopupForPage,
  markPopupShownForPage,
} from "@/lib/popupSession";

export interface UsePagePopupOptions {
  pageKey?: string;
  hasPopup?: boolean;
  delay?: number;
  onShow?: () => void;
  onClose?: () => void;
}

export function usePagePopup({
  pageKey,
  hasPopup = false,
  delay = 1000,
  onShow,
  onClose,
}: UsePagePopupOptions = {}) {
  const location = useLocation();
  const effectiveKey = pageKey || location.pathname;
  const [showPopup, setShowPopupState] = useState(false);
  const onShowRef = useRef(onShow);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onShowRef.current = onShow;
    onCloseRef.current = onClose;
  }, [onShow, onClose]);

  useEffect(() => {
    if (!hasPopup || !effectiveKey) {
      setShowPopupState(false);
      return;
    }

    if (hasShownPopupForPage(effectiveKey)) {
      setShowPopupState(false);
      return;
    }

    markPopupShownForPage(effectiveKey);

    if (delay > 0) {
      const timer = setTimeout(() => {
        setShowPopupState(true);
        onShowRef.current?.();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowPopupState(true);
      onShowRef.current?.();
    }
  }, [effectiveKey, hasPopup, delay]);

  const setShowPopup = useCallback((show: boolean) => {
    setShowPopupState(show);
    if (!show) {
      onCloseRef.current?.();
    }
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, [setShowPopup]);

  return {
    showPopup,
    setShowPopup,
    closePopup,
    hasShown: hasShownPopupForPage(effectiveKey),
    pageKey: effectiveKey,
  };
}

export default usePagePopup;
