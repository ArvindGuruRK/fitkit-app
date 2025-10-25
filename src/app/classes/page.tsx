
import { ClassesList } from "@/components/classes-list";

export default function ClassesPage() {
  return (
    <div className="bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline text-accent-foreground">Explore Our Classes</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find the perfect class to fit your goals and schedule.
          </p>
        </div>
        <ClassesList />
      </div>
    </div>
  );
}
