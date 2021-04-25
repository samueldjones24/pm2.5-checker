import { Header } from "./components/Header";
import { Intro } from "./components/Intro";
import { Checker } from "./components/Checker";

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
