function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About FPGrowth Shop</h3>
                        <p className="text-gray-400">
                            At FPGrowth Shop, we bring high-quality furniture to every corner of your home.
                            From timeless classics to contemporary styles, your perfect fit is just a click away.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">New Arrivals</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">Collections</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">
                            Email: support@fpgrowthshop.com
                        </p>
                        <p className="text-gray-400">
                            Phone: +1 (555) 123-4567
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="hover:text-blue-500">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.349C0 23.407.593 24 1.325 24h11.495v-9.339H9.692v-3.632h3.127V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.464.099 2.797.143v3.24h-1.92c-1.506 0-1.796.716-1.796 1.765v2.314h3.592l-.467 3.632h-3.125V24h6.125C23.406 24 24 23.407 24 22.675V1.326C24 .594 23.407 0 22.675 0z" /></svg>
                            </a>
                            <a href="#" className="hover:text-blue-400">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.56c-.89.39-1.85.65-2.86.77a5.15 5.15 0 002.27-2.85c-.99.59-2.07 1.01-3.23 1.24a5.15 5.15 0 00-8.76 4.69c-4.29-.21-8.1-2.27-10.64-5.4a5.15 5.15 0 001.6 6.89 5.13 5.13 0 01-2.33-.65v.06a5.15 5.15 0 004.12 5.05 5.17 5.17 0 01-2.31.09 5.15 5.15 0 004.82 3.58 10.32 10.32 0 01-6.38 2.2c-.41 0-.81-.02-1.21-.07a14.57 14.57 0 007.88 2.31c9.46 0 14.64-7.83 14.64-14.64 0-.22 0-.43-.01-.64A10.42 10.42 0 0024 4.56z" /></svg>
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c-5.424 0-9.837 4.41-9.837 9.838 0 4.579 3.066 8.449 7.26 9.667.53.097.723-.23.723-.511 0-.252-.008-.923-.013-1.813-2.957.642-3.584-1.428-3.584-1.428-.482-1.222-1.177-1.548-1.177-1.548-.962-.657.073-.644.073-.644 1.062.074 1.621 1.091 1.621 1.091.946 1.62 2.485 1.151 3.09.881.097-.684.371-1.15.676-1.414-2.357-.267-4.833-1.181-4.833-5.255 0-1.161.414-2.109 1.094-2.852-.109-.267-.473-1.344.104-2.803 0 0 .889-.284 2.91 1.084a10.198 10.198 0 012.65-.356c.897.004 1.8.121 2.65.356 2.02-1.368 2.908-1.084 2.908-1.084.577 1.459.214 2.536.105 2.803.68.743 1.092 1.691 1.092 2.852 0 4.084-2.479 4.985-4.843 5.247.383.33.724.981.724 1.981 0 1.431-.013 2.584-.013 2.934 0 .283.193.611.725.51 4.192-1.22 7.257-5.09 7.257-9.667C21.837 6.573 17.424 2.163 12 2.163z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center mt-8 border-t border-gray-600 pt-6">
                    <p className="text-gray-500 text-sm">
                        &copy; 2024 FPGrowth Shop. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
