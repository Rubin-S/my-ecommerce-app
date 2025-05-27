// components/layout/Footer.tsx
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-600 py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Karooz</h3>
            <p className="text-sm">
              Your community-driven B2C dropshipping marketplace.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-purple-600">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-purple-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-purple-600">
                  Return & Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {currentYear} Karooz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
