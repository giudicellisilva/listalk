import Footer from "./Footer";
import Header from "./Header";
import style from "./home.module.scss";

const Home = () =>{
    return(
        <div className={style.home}>
            <Header/>
            <div className={style.home__content}>
                <div className={style.home__content__div}>
                    <h1 className={style.home__content__title} >LIST<span>ALK</span></h1>
                    <h2 className={style.home__content__subtitle}>Your Ultimate Destination for  cataloging life's favorites</h2>
                </div>
                <img className={style.home__content__img} src="/assets/image_home.png" alt="" />
            </div>
            <Footer />
        </div>
    )
}

export default Home;