// Remove unused imports
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  Input,
  Textarea,
  Select,
  Badge,
  Alert,
  SectionHeader
} from '../components/ui';

const ThemeShowcase = () => {
  return (
    <div className="min-h-screen bg-[var(--brand-ivory)]">
      {/* Header Section */}
      <SectionHeader
        subtitle="Autumn Wedding Theme"
        title="Component Showcase"
        description="Explore our beautiful autumn wedding theme components with warm, elegant colors and thoughtful design."
      />

      <div className="container-constrained space-y-16">
        {/* Buttons Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-serif text-[var(--brand-olive)]">Buttons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-serif text-[var(--brand-olive)]">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <h4 className="text-lg font-semibold text-[var(--brand-olive)]">Simple Card</h4>
              </CardHeader>
              <CardContent>
                <p>This is a basic card with content.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h4 className="text-lg font-semibold text-[var(--brand-olive)] mb-2">Event Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>October 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span>Saltillo, Coah.</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" className="w-full">RSVP</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardContent>
                <h4 className="text-lg font-semibold text-[var(--brand-olive)] mb-2">Interactive</h4>
                <p className="text-sm text-[var(--muted-fg)]">Hover over this card to see the subtle animation.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Components Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-serif text-[var(--brand-olive)]">Form Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--brand-olive)] mb-2">Name</label>
                <Input placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--brand-olive)] mb-2">Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--brand-olive)] mb-2">Message</label>
                <Textarea placeholder="Enter your message" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--brand-olive)] mb-2">Category</label>
                <Select>
                  <option value="">Select a category</option>
                  <option value="rsvp">RSVP</option>
                  <option value="gift">Gift</option>
                  <option value="question">Question</option>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[var(--brand-olive)]">Form States</h4>
              <div>
                <label className="block text-sm font-medium text-[var(--brand-olive)] mb-2">Error Input</label>
                <Input placeholder="This input has an error" error />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--brand-olive)] mb-2">Disabled Input</label>
                <Input placeholder="This input is disabled" disabled />
              </div>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-serif text-[var(--brand-olive)]">Badges</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="olive">Olive</Badge>
            <Badge variant="terracotta">Terracotta</Badge>
            <Badge variant="gold">Gold</Badge>
            <Badge variant="subtle">Subtle</Badge>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-serif text-[var(--brand-olive)]">Alerts</h3>
          <div className="space-y-4">
            <Alert variant="info">
              This is an informational alert with important details about the wedding.
            </Alert>
            <Alert variant="success">
              Your RSVP has been successfully submitted! We look forward to seeing you.
            </Alert>
            <Alert variant="error">
              There was an error processing your request. Please try again.
            </Alert>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-serif text-[var(--brand-olive)]">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--brand-olive)] mb-2"></div>
              <p className="text-sm font-medium">Olive</p>
              <p className="text-xs text-[var(--muted-fg)]">#6B705C</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--brand-beige)] mb-2"></div>
              <p className="text-sm font-medium">Beige</p>
              <p className="text-xs text-[var(--muted-fg)]">#D8C3A5</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--brand-terracotta)] mb-2"></div>
              <p className="text-sm font-medium">Terracotta</p>
              <p className="text-xs text-[var(--muted-fg)]">#B5651D</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--brand-brown)] mb-2"></div>
              <p className="text-sm font-medium">Brown</p>
              <p className="text-xs text-[var(--muted-fg)]">#8D6E63</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--brand-ivory)] mb-2 border border-[var(--brand-beige)]"></div>
              <p className="text-sm font-medium">Ivory</p>
              <p className="text-xs text-[var(--muted-fg)]">#F5F5DC</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--brand-gold)] mb-2"></div>
              <p className="text-sm font-medium">Gold</p>
              <p className="text-xs text-[var(--muted-fg)]">#C9A66B</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemeShowcase;
