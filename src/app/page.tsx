import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-4">
        <Button variant="outline">Calendar Area Button</Button>
      </section>
    </main>
  );
}
