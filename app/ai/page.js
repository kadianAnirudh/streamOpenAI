import Hero from "../components/Hero";
import Demo from "../components/Demo";

const page = () => {
  return (
    <main>
      <div className="h-screen text-black main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default page;
