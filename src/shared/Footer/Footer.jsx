import Logo from '../Logo/Logo';

const Footer = () => {
    return (
        <div className="bg-card text-gray-800">
            {/* Bottom Footer */}
            <footer className="footer footer-horizontal footer-center text-base-content p-10">
                <aside className="items-center text-center text-gray-800">
                    <Logo />
                    <p className="font-bold ">
                        TazaBazar 360 Ltd.
                        <br />
                        Empowering local market insights since 2025
                    </p>
                    <p className="text-sm  ">
                        Copyright © {new Date().getFullYear()} - All rights
                        reserved
                    </p>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4 text-black">
                        {/* GitHub */}
                        <a
                            href="https://github.com/Amdad09"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 2.4 3.6 1.7 0-.9.4-1.5.8-1.9-2.5-.3-5.2-1.2-5.2-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1.9-.2 1.9-.4 2.9-.4 1 0 2 .1 2.9.4 2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.8 1.1 2.9 0 4.2-2.7 5.1-5.2 5.4.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com/in/Amdad09"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M20.45 20.45h-3.55v-5.4c0-1.29 0-2.95-1.8-2.95s-2.1 1.4-2.1 2.85v5.5H9.45V9h3.4v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.65 0 4.35 2.4 4.35 5.5v6.25zM5.4 7.4a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.8 13.05H3.6V9h3.6v11.45zM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://facebook.com/Amdad09"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.35v21.3C0 23.4.6 24 1.325 24h11.5v-9.3H9.8v-3.6h3.025V8.4c0-3 1.8-4.65 4.5-4.65 1.3 0 2.65.2 2.65.2v2.925h-1.5c-1.5 0-2 .925-2 1.875v2.225h3.4l-.55 3.6h-2.85V24h5.6c.725 0 1.325-.6 1.325-1.35v-21.3C24 .6 23.4 0 22.675 0z" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
