import ContactusPage from "@/components/template/contactusPage";

export const metadata = {
  //   title: "Contact",
  title: {
    absolute: "Contact", // ignore %s in parent layout.
  },
};

function ContactPage() {
  return <ContactusPage />;
}
export default ContactPage;
