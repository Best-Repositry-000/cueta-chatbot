
export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversations/getall`,
    {
      cache: "no-store",
    }
  );

  const conversations = await response.json();

  return (
    <main>
      <h1>Conversations</h1>
      <pre>{JSON.stringify(conversations, null, 2)}</pre>
    </main>
  );
}