import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, FileText, Twitter, Brain, Search } from 'lucide-react'
import Header from './_components/Header'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-6 animate-in slide-in-from-bottom duration-500">
              Your Second Brain for Content and Ideas
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-in slide-in-from-bottom duration-500 delay-150">
              Organize, query, and learn from your PDFs and tweets in one place
            </p>
            <Link href={"/dashboard"}>
              <Button size="lg" className="animate-in slide-in-from-bottom duration-500 delay-300">
                Get Started <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="PDF Management"
                description="Upload, view, and take notes on PDFs side by side."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="AI-Powered Queries"
                description="Ask questions about your PDF content using advanced AI."
              />
              <FeatureCard
                icon={<Twitter className="h-10 w-10 text-primary" />}
                title="Tweet Integration"
                description="Add and organize tweets in your second brain."
              />
              <FeatureCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="AI Vector Search"
                description="Quickly find relevant tweets using AI-powered search."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Learning?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join SecondBrain today and revolutionize how you manage and interact with your content.
            </p>
            <Button size="lg">
              <Link href={"/dashboard"}>
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2024 SecondBrain. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

