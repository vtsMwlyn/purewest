import Section from "../components/Section"
import { Link } from "react-router-dom"
import articles from "../data/articles"

function ArticleCard({ article }) {
	return (
		<Link to={`/blog${article.slug}`}>
			<div className="w-full h-full bg-slate-900 p-6 flex flex-col items-stretch gap-2 rounded-xl cursor-pointer transition hover:-translate-y-3">
				<img src={article.image} className="h-[200px] xl:h-[250px] object-cover object-center rounded-xl" alt="Article Image" />
				<div className="w-full flex flex-col gap-2 xl:gap-4">
					<h1 className="font-bold text-lg xl:text-xl mt-4">{article.title}</h1>
					<div className="w-full flex flex-wrap gap-3">
						{article.tags.map((tag, index) => (
							<div key={index} className="py-0.5 px-2 rounded-md bg-yellow-500/50  text-white text-xs xl:text-sm">{tag}</div>
						))}
					</div>
					<p className="text-sm xl:text-base mt-2">{article.duration} mins read</p>
				</div>
			</div>
		</Link>
	)
}

export default function Blog() {
	return (
		<>
			<Section className="py-10 xl:py-20">
				{Object.entries(articles).map(([key, value]) => (
					<div key={key} className="w-full flex flex-col items-start py-4 xl:py-8 gap-6">
						<h1 className="text-xl xl:text-3xl font-bold capitalize">{key}</h1>

						<div className="w-full grid grid-cols-1 xl:grid-cols-4 items-stretch gap-5 xl:gap-10">
							{value.map((a, index) => (
								<ArticleCard key={index} article={a} />
							))}
						</div>
					</div>
				))}
			</Section>
		</>
	)
}