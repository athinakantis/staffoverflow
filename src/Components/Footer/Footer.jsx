import './Footer.css';

function Footer() {
    const thisYear = new Date().getFullYear();
    return (
        <footer>
            <div>
                <p>Copyright &copy; {thisYear} Athina Kantis</p>

                <img
                    src='/copyright.png'
                    alt='Copyright'
                />
            </div>
        </footer>
    );
}

export default Footer;
