import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <aside className="w-80 border-r border-border p-4">
        <Button variant="outline">Sidebar Button</Button>
      </aside>
      <section className="flex-1 p-4">
        <Button variant="outline">Calendar Area Button</Button>
      </section>
    </main>
  );
}
