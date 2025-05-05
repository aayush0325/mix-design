import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-blue-600 dark:bg-blue-800 px-4 text-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Design Your Perfect Concrete Mix?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Join thousands of engineers and construction professionals who save time with our calculator.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
