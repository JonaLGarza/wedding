import { cn } from '../../lib/utils';
import { Button } from './Button';
import { Card, CardHeader, CardContent } from './Card';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Alert } from './Alert';
import { Badge } from './Badge';
import { SectionHeader } from './SectionHeader';
import { DateDisplay } from './DateDisplay';
import { Quote } from './Quote';
import { HeroImage } from './HeroImage';

export const WeddingShowcase = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-16 py-16", className)}>
      {/* Hero Section */}
      <SectionHeader
        subtitle="Wedding Theme"
        title="Beautiful & Romantic Design"
        description="Experience our elegant wedding theme with soft contrasts and warm elegance. Perfect for creating memorable moments."
      />

      {/* Date Display Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif font-medium text-[var(--foreground)] text-center">Date & Time</h3>
        <DateDisplay date="December 15, 2024" />
      </div>

      {/* Hero Image Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif font-medium text-[var(--foreground)] text-center">Hero Image</h3>
        <HeroImage 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Romantic wedding scene"
        />
        <Quote 
          text="Love is not about finding the perfect person, but about seeing an imperfect person perfectly."
          author="Sam Keen"
        />
      </div>

      {/* Buttons Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-[var(--accent)] text-center">Buttons</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="default" size="sm">Small</Button>
          <Button variant="default" size="default">Default</Button>
          <Button variant="default" size="lg">Large</Button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-[var(--accent)] text-center">Cards</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold text-[var(--foreground)]">Simple Card</h4>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--muted-foreground)]">This is a beautiful card with our wedding theme styling.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold text-[var(--foreground)]">Interactive</h4>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--muted-foreground)] mb-4">Cards have subtle hover effects and shadows.</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Components Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-[var(--accent)] text-center">Form Components</h3>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Name</label>
              <Input placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Email</label>
              <Input placeholder="Enter your email" type="email" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Message</label>
            <Textarea placeholder="Enter your message" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Category</label>
            <Select>
              <option value="">Select a category</option>
              <option value="wedding">Wedding</option>
              <option value="reception">Reception</option>
              <option value="celebration">Celebration</option>
            </Select>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--foreground)]">Form States</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Error Input</label>
                <Input error placeholder="This has an error" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Disabled Input</label>
                <Input disabled placeholder="This is disabled" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-[var(--accent)] text-center">Badges</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="subtle">Subtle</Badge>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-[var(--accent)] text-center">Alerts</h3>
        <div className="max-w-2xl mx-auto space-y-4">
          <Alert variant="info">
            This is an informational alert with our wedding theme styling.
          </Alert>
          <Alert variant="success">
            This is a success alert with our wedding theme styling.
          </Alert>
          <Alert variant="error">
            This is an error alert with our wedding theme styling.
          </Alert>
        </div>
      </div>

      {/* Color Palette Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif text-[var(--accent)] text-center">Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--primary)] mb-2"></div>
            <p className="text-sm text-[var(--foreground)]">Primary</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--secondary)] mb-2"></div>
            <p className="text-sm text-[var(--foreground)]">Secondary</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--accent)] mb-2"></div>
            <p className="text-sm text-[var(--foreground)]">Accent</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--muted)] mb-2 border border-[var(--border)]"></div>
            <p className="text-sm text-[var(--foreground)]">Muted</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-[var(--background)] border border-[var(--border)] mb-2"></div>
            <p className="text-sm text-[var(--foreground)]">Background</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingShowcase;
