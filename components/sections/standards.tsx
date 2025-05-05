import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StandardsSection() {
  return (
    <section id="standards" className="py-16 bg-gray-50 dark:bg-gray-800 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Supported Design Standards</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our calculator complies with major international concrete design standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>IS 10262</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Indian Standard method for concrete mix design using Indian materials and conditions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ACI 211</CardTitle>
            </CardHeader>
            <CardContent>
              <p>American Concrete Institute method for proportioning normal, heavyweight, and mass concrete.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>BS 8500</CardTitle>
            </CardHeader>
            <CardContent>
              <p>British Standard for concrete mix design methodology for various exposure classes.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
