"use client";
import ContactForm from "@/components/contact/ContactForm";

const GetInTouch = ({ setPopup }) => {
  return (
    <div id="overlay">
      <div id="modal">
        <ContactForm
          isAddStyle={true}
          showCloseButton={true}
          setPopup={setPopup}
        />
      </div>
    </div>
  );
};

export default GetInTouch;
