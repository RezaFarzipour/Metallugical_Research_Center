import Services from "@/components/template/servicesPage";

export const metadata = {
  //   title: "Contact",
  title: {
    absolute: "Services", // ignore %s in parent layout.
  },
};

function ServicesPage() {
  return <Services />;
}
export default ServicesPage;
