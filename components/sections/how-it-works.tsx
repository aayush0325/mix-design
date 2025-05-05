export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 bg-white dark:bg-gray-900 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our calculator follows standard engineering protocols for concrete mix design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Define Requirements</h3>
            <p className="text-gray-600 dark:text-gray-400">Enter concrete grade, exposure conditions, and workability requirements</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Specify Materials</h3>
            <p className="text-gray-600 dark:text-gray-400">Enter details about cement, fine and coarse aggregates</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Calculate Mix Design</h3>
            <p className="text-gray-600 dark:text-gray-400">Our algorithm calculates optimal proportions following standard methods</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">4</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Get Your Design</h3>
            <p className="text-gray-600 dark:text-gray-400">Receive detailed mix proportions and comprehensive design report</p>
          </div>
        </div>
      </div>
    </section>
  );
}
