import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";

const PolicyFooter = () => {
  return (
    <footer className="bg-white text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 fade-item">

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 fade-text">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="fade-text"><a href="/privacy-policy" className="hover:text-primary">Privacy</a></li>
              <li className="fade-text"><a href="/terms" className="hover:text-primary">Terms</a></li>
              <li className="fade-text"><a href="/cookie-policy" className="hover:text-primary">Cookie Policy</a></li>
              <li className="fade-text"><a href="/accessibility" className="hover:text-primary">Accessibility</a></li>
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h3 className="font-semibold mb-4 fade-text">Careers</h3>
            <ul className="space-y-2 text-sm">
              <li className="fade-text"><a href="/careers" className="hover:text-primary">Careers Portal</a></li>
              <li className="fade-text"><a href="/tech-blog" className="hover:text-primary">Tech Blog</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 fade-text">Social</h3>
            <div className="flex space-x-4 fade-item">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-primary" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-primary" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-primary" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-primary" />
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-semibold mb-4 fade-text">FAQ</h3>
            <ul className="space-y-2 text-sm">
              <li className="fade-text"><a href="/faq" className="hover:text-primary">FAQ</a></li>
              <li className="fade-text"><a href="/contact" className="hover:text-primary">Contact</a></li>
              <li className="fade-text"><a href="/promo-code" className="hover:text-primary">Promo Code</a></li>
            </ul>
          </div>
        </div>


        {/* Description */}
        <div className="text-sm text-gray-500 leading-7 mt-8 fade-text">
          <hr className="my-8 border-gray-300" />
          <p>
           Single people, listen up: If you’re looking for love, want to start dating, or just keep it casual, you need to be on Tinder. With over 55 billion matches made, it’s the place to be to meet your next best match. Let’s be real, the dating landscape looks very different today, as most people are meeting online. With Tinder, the world’s most popular free dating app, you have millions of other single people at your fingertips and they’re all ready to meet someone like you. Whether you’re straight or in the LGBTQIA community, Tinder’s here to bring you all the sparks.

There really is something for everyone on Tinder. Want to get into a relationship? You got it. Trying to find some new friends? Say no more. New kid on campus and looking to make the most of your college experience? Tinder U’s got you covered. Tinder isn’t your average dating site — it’s the most diverse dating app, where adults of all backgrounds and experiences are invited to make connections, memories, and everything in between...
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-xs text-gray-500 border-t pt-4 flex flex-col md:flex-row justify-between gap-2 fade-item">
          <p className="fade-text">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="/privacy" className="fade-text hover:text-primary">Privacy</a>
            <a href="/terms" className="fade-text hover:text-primary">Terms</a>
            <a href="/settings" className="fade-text hover:text-primary">Privacy Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default PolicyFooter;
