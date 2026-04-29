import Sidebar from "@/components/Sidebar";
import CalendarView from "@/components/CalendarView";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-4 h-screen">
        <CalendarView />
      </section>
    </main>
  );
}
