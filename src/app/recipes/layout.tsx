import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 p-4 sm:p-10 sm:pt-4">{props.children}</div>
      <Footer />
    </div>
  );
}
