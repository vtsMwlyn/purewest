import { useParams } from "react-router-dom"
import Section from "../components/Section"
import articles from "../data/articles" // adjust path if needed

export default function ArticleContent() {
  const { slug } = useParams()

  // Combine research + articles into one array
  const allArticles = [
    ...articles.research,
    ...articles.articles,
  ]

  // Find matching article by slug
  const article = allArticles.find(a => a.slug === `/${slug}`)

  // Fallback if not found
  if (!article) {
    return (
      <Section className="py-20 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
      </Section>
    )
  }

  return (
    <Section className="py-10 xl:py-20 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl xl:text-5xl font-bold mb-6 mt-10 text-start self-start">
        {article.title}
      </h1>

      {/* Tags */}
      <div className="flex self-start gap-3 mb-8">
        {article.tags.map(tag => (
          <span
            key={tag}
            className="text-sm px-3 py-1 rounded-full bg-yellow-500/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Image */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full rounded-3xl mb-10"
      />

      {/* Content */}
      <div className="space-y-6 leading-relaxed">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
