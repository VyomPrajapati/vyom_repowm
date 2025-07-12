import { db } from "@/database/firebase";
import { doc, getDoc } from "firebase/firestore";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UserHomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const userRef = doc(db, "users", resolvedParams.slug);
  const userSnap = await getDoc(userRef);

  const username = userSnap.exists() ? userSnap.data().username : "User";

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1>
    </div>
  );
}
