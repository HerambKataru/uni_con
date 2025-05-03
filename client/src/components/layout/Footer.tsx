import { Mail, Phone, Facebook, Twitter, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold mb-4">University Administration</h5>
            <p className="text-gray-300 text-sm">
              123 University Avenue<br />
              City, State 12345<br />
              United States
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Quick Links</h5>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">University Homepage</a></li>
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">Campus Map</a></li>
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Resources</h5>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">IT Help Desk</a></li>
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">Accessibility</a></li>
              <li><a href="#" className="hover:text-accent-light transition-colors duration-200">Emergency Information</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Connect</h5>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white hover:text-accent-light transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition-colors duration-200">
                <Phone className="h-5 w-5" />
              </a>
            </div>
            
            <p className="text-gray-300 text-sm">Sign up for updates:</p>
            <div className="mt-2 flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="text-sm rounded-l-md text-gray-900 focus:outline-none rounded-r-none" 
              />
              <Button className="bg-secondary hover:bg-secondary-light text-white rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} University Administration. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
