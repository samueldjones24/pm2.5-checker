import { Header } from "./Header";
import { Intro } from "./Intro";
import { Checker } from "./Checker";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Intro />
        <Checker />
      </main>
    </div>
  );
}

export default App;
