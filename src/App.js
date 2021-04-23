function App() {
  const countries = [
    { name: "England" },
    { name: "France" },
    { name: "Spain" },
  ];
  return (
    <div className="text-center">
      <header style={{ border: "1px solid black" }}>
        Header
        <p>Tech test for Victorian Plumbing</p>
      </header>
      <main style={{ border: "1px solid black" }}>
        Body
        {countries.map((c) => (
          <h1>{c.name}</h1>
        ))}
      </main>
      <footer style={{ border: "1px solid black" }}>I'm a footer</footer>
    </div>
  );
}

export default App;
