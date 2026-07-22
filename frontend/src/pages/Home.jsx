import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Occasions from '../components/home/Occasions';
import Gallery from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home = () => (
  <>
    <Hero />
    <div id="after-hero">
      <Categories />
      <FeaturedProducts />
      <Occasions />
      <Gallery />
      <Testimonials />
      <Newsletter />
    </div>
  </>
);

export default Home;
