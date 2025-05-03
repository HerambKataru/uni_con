import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Shield, Upload, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-dark text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
            alt="University Campus" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">University Leadership Directory</h2>
            <p className="text-lg mb-6">
              Access contact information for deans, directors, and administrators across campus.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                asChild
                className="bg-secondary hover:bg-secondary-light text-white"
                size="lg"
              >
                <Link href="/directory">
                  <Search className="mr-2 h-4 w-4" /> 
                  Browse Directory
                </Link>
              </Button>
              <Button
                asChild
                className="bg-accent hover:bg-accent-light text-primary"
                size="lg"
              >
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" /> 
                  Admin Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="font-bold text-2xl mb-10 text-center">Directory Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="feature-icon">
                <Search className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Quick Search</h4>
              <p className="text-gray-600">
                Find administrators by name, department, or position with our powerful search tools.
              </p>
            </div>
            <div className="text-center">
              <div className="feature-icon">
                <Upload className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Bulk Updates</h4>
              <p className="text-gray-600">
                Easily update administrator information by uploading Excel files with our intuitive system.
              </p>
            </div>
            <div className="text-center">
              <div className="feature-icon">
                <Smartphone className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Mobile Friendly</h4>
              <p className="text-gray-600">
                Access the directory on any device with our responsive design that works on desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Images Section */}
      <section className="py-12 bg-neutral-dark text-white">
        <div className="container mx-auto px-4">
          <h3 className="font-bold text-2xl mb-8 text-center">Our Campus</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg h-48">
              <img 
                src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                alt="University Campus" 
              />
            </div>
            <div className="overflow-hidden rounded-lg h-48">
              <img 
                src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                alt="University Campus" 
              />
            </div>
            <div className="overflow-hidden rounded-lg h-48">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                alt="University Campus" 
              />
            </div>
            <div className="overflow-hidden rounded-lg h-48">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                alt="University Campus" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
