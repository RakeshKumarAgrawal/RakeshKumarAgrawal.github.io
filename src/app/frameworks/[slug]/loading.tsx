import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoadingSkeleton from "@/components/ui/PageLoadingSkeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <PageLoadingSkeleton title="Loading framework" />
      <Footer />
    </>
  );
}
