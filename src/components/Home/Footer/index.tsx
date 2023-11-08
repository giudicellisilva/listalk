import style from "./footer.module.scss";

const Footer = () =>{
    return(
        <footer className={style.footer}>
            <div className={style.footer__logo}>
                <img src="/assets/pencil.svg" alt="" />
                <h2>Listalk</h2>
            </div>
            <div className={style.footer__centro}>
                <span>Concept</span>
                <span>Blog</span>
                <span>Contact us</span>
                <a href="/">Privacy Policy</a>
                <a href="/">Terms of Service</a>
                <a href="/">Cookies Settings</a>
            </div>
            <div className={style.footer__redes}>
                <img src="/assets/facebook.svg" alt="facebook" />
                <img src="/assets/instagram.svg" alt="instagram" />
                <img src="/assets/twitter.svg" alt="twitter" />
                <img src="/assets/linkedin.svg" alt="linkedin" />
            </div>

        </footer>
    )
} 

export default Footer;