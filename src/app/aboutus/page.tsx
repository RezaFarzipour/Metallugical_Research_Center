import AboutusPage from "@/components/template/AboutusPage";

export const metadata = {
  //   title: "About",
  title: {
    absolute: "About", // ignore %s in parent layout.
  },
};

function AboutPage() {
  return <AboutusPage />;
}
export default AboutPage;
