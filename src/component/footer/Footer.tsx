import s from './Footer.module.css';

const Footer = () => {
    return (
        <footer>
        <div className={s.container}>
            <p className="">
            &copy; {new Date().getFullYear()} Code Flexers. All rights reserved.
            </p>
            <p style={{color:'gray'}}>
                문의사항 : wjdwltjq7289@gmail.com
            </p>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" fillRule="evenodd"><path d="M0 0h48v48H0z"></path><path fill="currentColor" fillRule="nonzero" d="M32.5 12.44h-4.18c-.82 0-2.66.16-2.66 3.34v4.08h6.84l-1.14 6.31h-5.7V42.5H19.2V26.17h-5.7v-6.3h5.7v-5.58s-.22-7.79 7.98-7.79h5.32z"></path></g></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" fillRule="evenodd"><path d="M0 0h48v48H0z"></path><path fill="currentColor" fillRule="nonzero" d="M36.19 40H11.81C9.71 40 8 38.3 8 36.19V11.81C8 9.71 9.7 8 11.81 8h24.38C38.29 8 40 9.7 40 11.81v24.38c0 2.1-1.7 3.81-3.81 3.81M24 17.8a6.2 6.2 0 1 0 0 12.39 6.2 6.2 0 0 0 0-12.4m12.42-4.63c0-.84-.75-1.59-1.59-1.59h-2.99c-.84 0-1.62.75-1.62 1.59v2.99c0 .84.78 1.62 1.62 1.62h3c.83 0 1.58-.78 1.58-1.62zm0 8.55h-2.8a9.9 9.9 0 1 1-19.23 0h-2.81v13.11c0 .84.75 1.59 1.59 1.59h21.66c.84 0 1.59-.75 1.59-1.59z"></path></g></svg>
            </p>
        </div>
        </footer>
    );
    }
export default Footer;