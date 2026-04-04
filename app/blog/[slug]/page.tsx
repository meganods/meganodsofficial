"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, ThumbsUp, MessageCircle, Twitter, Linkedin, Facebook, Copy } from "lucide-react"
import { use } from "react"

const blogPosts = {
  "future-of-ai-in-enterprise": {
    title: "The Future of AI in Enterprise Solutions",
    excerpt: "Discover how artificial intelligence is reshaping the enterprise landscape and driving digital transformation across industries.",
    category: "Artificial Intelligence",
    author: {
      name: "John Mitchell",
      role: "AI Research Lead",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    content: `
      <p class="lead">Artificial Intelligence is no longer a futuristic concept—it's here, and it's transforming how enterprises operate, compete, and deliver value to their customers.</p>

      <h2>The Current State of Enterprise AI</h2>
      <p>As we move into 2024, the adoption of AI in enterprise settings has reached unprecedented levels. Organizations across industries are leveraging AI-powered solutions to streamline operations, enhance customer experiences, and drive innovation.</p>

      <p>According to recent studies, over 75% of enterprises have either implemented or are planning to implement AI solutions within the next year. This rapid adoption is driven by the tangible benefits AI delivers:</p>

      <ul>
        <li><strong>Operational Efficiency:</strong> AI automates repetitive tasks, freeing up human resources for more strategic work</li>
        <li><strong>Data-Driven Insights:</strong> Advanced analytics powered by AI help organizations make better decisions</li>
        <li><strong>Customer Experience:</strong> AI-powered chatbots and personalization engines enhance customer interactions</li>
        <li><strong>Risk Management:</strong> Predictive models help identify and mitigate potential risks before they materialize</li>
      </ul>

      <h2>Key Trends Shaping Enterprise AI</h2>
      <p>Several key trends are emerging that will define the future of AI in enterprise settings:</p>

      <h3>1. Generative AI Integration</h3>
      <p>Following the breakthrough of large language models, enterprises are finding innovative ways to integrate generative AI into their workflows. From content creation to code generation, these tools are becoming indispensable for knowledge workers.</p>

      <h3>2. AI-Powered Automation</h3>
      <p>Intelligent Process Automation (IPA) combines AI with robotic process automation to handle complex, judgment-based tasks that previously required human intervention.</p>

      <h3>3. Edge AI</h3>
      <p>Processing AI at the edge—closer to where data is generated—reduces latency and bandwidth requirements while enabling real-time decision making in IoT and industrial applications.</p>

      <h2>Implementing AI Successfully</h2>
      <p>While the potential of AI is enormous, successful implementation requires careful planning and execution. Here are key considerations for enterprises embarking on their AI journey:</p>

      <blockquote>
        "The key to successful AI implementation isn't just about the technology—it's about aligning AI initiatives with business objectives and ensuring your organization has the right talent and culture to support it."
      </blockquote>

      <h3>Building the Right Foundation</h3>
      <p>Before diving into AI implementation, organizations need to ensure they have:</p>

      <ol>
        <li>Clean, organized data infrastructure</li>
        <li>Clear business objectives for AI initiatives</li>
        <li>Executive sponsorship and organizational buy-in</li>
        <li>Skilled talent or partnerships to execute</li>
        <li>Ethical guidelines and governance frameworks</li>
      </ol>

      <h2>Looking Ahead</h2>
      <p>The future of AI in enterprise is bright, but it will require organizations to be adaptive and forward-thinking. Those who successfully harness AI's potential will gain significant competitive advantages, while those who hesitate may find themselves struggling to catch up.</p>

      <p>At NexusTech, we're committed to helping enterprises navigate this transformative journey. Our team of AI experts works closely with organizations to develop and implement AI strategies that deliver measurable business value.</p>

      <p class="conclusion">Ready to explore how AI can transform your enterprise? <a href="/contact">Contact us</a> to schedule a consultation with our AI specialists.</p>
    `,
    tags: ["Artificial Intelligence", "Enterprise", "Digital Transformation", "Machine Learning"],
    relatedPosts: ["cloud-migration-strategies", "machine-learning-automation"]
  },
  "cloud-migration-strategies": {
    title: "Cloud Migration Strategies for 2024",
    excerpt: "Learn the best practices and strategies for seamless cloud migration that ensures security, scalability, and cost efficiency.",
    category: "Cloud Computing",
    author: {
      name: "Sarah Chen",
      role: "Cloud Solutions Architect",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
    },
    date: "March 12, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    content: `
      <p class="lead">Cloud migration remains one of the most significant IT initiatives for organizations worldwide. Here's your comprehensive guide to successful cloud migration in 2024.</p>

      <h2>Understanding Cloud Migration</h2>
      <p>Cloud migration is the process of moving digital assets—data, applications, and IT resources—from on-premises infrastructure to cloud environments. While the concept seems straightforward, the execution requires careful planning and expertise.</p>

      <h2>The 6 R's of Cloud Migration</h2>
      <p>When planning your migration strategy, consider these six approaches:</p>

      <ul>
        <li><strong>Rehost (Lift and Shift):</strong> Move applications as-is to the cloud</li>
        <li><strong>Replatform:</strong> Make minor optimizations during migration</li>
        <li><strong>Repurchase:</strong> Move to a different product, often SaaS</li>
        <li><strong>Refactor:</strong> Re-architect applications for cloud-native capabilities</li>
        <li><strong>Retire:</strong> Decommission applications no longer needed</li>
        <li><strong>Retain:</strong> Keep certain applications on-premises</li>
      </ul>

      <h2>Best Practices for Success</h2>
      <p>Follow these best practices to ensure a smooth migration:</p>

      <h3>1. Comprehensive Assessment</h3>
      <p>Begin with a thorough assessment of your current infrastructure, applications, and dependencies.</p>

      <h3>2. Security First</h3>
      <p>Implement security measures from the start, not as an afterthought. This includes identity management, encryption, and compliance requirements.</p>

      <h3>3. Cost Optimization</h3>
      <p>Use cloud cost management tools and implement governance policies to prevent cost overruns.</p>

      <blockquote>
        "A well-planned migration can reduce infrastructure costs by 30-50% while improving scalability and reliability."
      </blockquote>

      <h2>Common Pitfalls to Avoid</h2>
      <ol>
        <li>Underestimating complexity and timelines</li>
        <li>Neglecting data governance and compliance</li>
        <li>Insufficient training for IT teams</li>
        <li>Lack of proper testing before cutover</li>
      </ol>

      <p class="conclusion">Ready to start your cloud journey? <a href="/contact">Contact our cloud experts</a> for a free consultation.</p>
    `,
    tags: ["Cloud Computing", "Migration", "AWS", "Azure", "Infrastructure"],
    relatedPosts: ["future-of-ai-in-enterprise", "cybersecurity-best-practices"]
  }
}

const relatedArticles = [
  {
    slug: "machine-learning-automation",
    title: "Machine Learning in Business Process Automation",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    date: "March 8, 2024"
  },
  {
    slug: "cybersecurity-best-practices",
    title: "Cybersecurity Best Practices for Modern Businesses",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    date: "March 10, 2024"
  },
  {
    slug: "iot-smart-solutions",
    title: "IoT Solutions Transforming Smart Cities",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
    date: "March 5, 2024"
  }
]

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts] || blogPosts["future-of-ai-in-enterprise"]

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 h-[60vh]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-6 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar - Share & Actions */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1 order-2 lg:order-1"
            >
              <div className="sticky top-32 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Share Article</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: Twitter, label: "Twitter" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Facebook, label: "Facebook" },
                      { icon: Copy, label: "Copy Link" }
                    ].map((item, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                        title={item.label}
                      >
                        <item.icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-primary transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span className="text-sm">Save for Later</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-primary transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Like Article</span>
                    </button>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-background border border-border rounded-full text-xs text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:space-y-2 prose-ol:space-y-2
                  prose-li:text-muted-foreground
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-card prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-foreground
                  [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:mb-8
                  [&_.conclusion]:bg-card [&_.conclusion]:border [&_.conclusion]:border-border [&_.conclusion]:rounded-xl [&_.conclusion]:p-6 [&_.conclusion]:mt-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author Bio */}
              <div className="mt-16 p-8 bg-card border border-border rounded-2xl">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{post.author.name}</h3>
                    <p className="text-primary text-sm mb-3">{post.author.role}</p>
                    <p className="text-muted-foreground text-sm">
                      An experienced technology leader with over 15 years of expertise in AI and enterprise solutions. 
                      Passionate about helping organizations leverage cutting-edge technology to drive business value.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Comments
                </h2>
                <div className="bg-card border border-border rounded-2xl p-8">
                  <textarea
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none mb-4"
                  />
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity">
                    Post Comment
                  </button>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{article.date}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
