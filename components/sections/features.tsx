import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our concrete mix design calculator provides everything engineers and builders need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Multiple Design Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Support for IS 10262 international concrete mix design standards.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precise Mix Proportions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Calculate accurate cement, water, and aggregate proportions based on your exact project specifications.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customizable Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Adjust water-cement ratio, slump, exposure conditions, and other parameters to meet specific requirements.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Generate comprehensive mix design reports with all calculations showing the step-by-step process.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Material Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get cost-effective mix designs that optimize material usage while maintaining strength requirements.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Batch Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Automatically calculate material quantities for specific batch volumes or construction areas.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
