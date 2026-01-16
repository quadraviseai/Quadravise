import { useState } from "react";
import CookiePreferencesModal from "../common/CookiePreferencesModal";

export default function CookiePreferencesLink() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CookiePreferencesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <button
        onClick={() => setShowModal(true)}
        className="text-sm text-trust-600 hover:text-brand-primary transition-colors underline"
      >
        Cookie Preferences
      </button>
    </>
  );
}
