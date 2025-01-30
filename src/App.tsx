import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="pt-16">
        {" "}
        {/* Adjust margin to avoid header overlap */}
        <section
          id="home"
          className="h-screen flex items-center justify-center bg-gray-100"
        >
          <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        </section>
        <section
          id="experience"
          className="h-screen flex items-center justify-center bg-gray-200"
        >
          <h2 className="text-3xl">Experience Section</h2>
        </section>
        <section
          id="education"
          className="h-screen flex items-center justify-center bg-gray-300"
        >
          <h2 className="text-3xl">Education Section</h2>
        </section>
        <section
          id="projects"
          className="h-screen flex items-center justify-center bg-gray-400"
        >
          <h2 className="text-3xl">Projects Section</h2>
        </section>
        <section
          id="contact"
          className="h-screen flex items-center justify-center bg-gray-500"
        >
          <h2 className="text-3xl">Contact Section</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
