import Header from "./_components/Header"

export default function Home() {

  return (
    <>
      <Header />
      <h1>Hello</h1>
      <div className="flex justify-center">
        <h1 className="flex justify-center w-[70%] bg-blue-50 border border-blue-300 text-blue-800 text-sm rounded-lg p-4">
          <strong className="font-semibold">Note:  </strong> Landing page and some functionality is under development, but for now you can store tweets and query/search for them using AI/LLMs.
        </h1>
      </div>

    </>
  );
}
