import { Card } from "../components/Card";

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-[1320px]">
      <Card className="p-8">
        <p className="text-sm font-semibold text-momo-muted">SpendSnap Student</p>
        <h1 className="mt-2 text-2xl font-extrabold text-momo-text">{title}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-momo-muted">
          Trang này sẽ được bổ sung trong bản demo tiếp theo.
        </p>
      </Card>
    </div>
  );
}
