export const metadata = {
  title: "Auth",
  description: "Auth",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="p-2 w-full max-w-md">{children}</div>
    </div>
  );
}
