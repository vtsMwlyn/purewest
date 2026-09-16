import Hero from "./Hero";
import About from "./About";
import Shipping from "./Shipping";
import Why from "./Why";
import RangePhoto from "./RangePhoto";
import Quote from "./Quote";
import Testimonials from "./Testimonials";

export default function Index() {
  return (
    <div className="font-baskerville bg-dark text-text">
      <Hero />
      <About />
      <Shipping />
      <Why />
      <RangePhoto />
      <Quote />
      <Testimonials />
    </div>
  );
}
