interface Livro {
  id: number | string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  disponivel: boolean;
  tags: string[];
}

type LivroResumo = Omit<Livro, "id" | "disponivel">;

type Categoria = "Programação" | "Ficção" | "Design";

const acervo: Livro[] = [
  {
    id: 1,
    titulo: "Introdução ao TypeScript",
    autor: "Marcos Silva",
    anoPublicacao: 2023,
    disponivel: true,
    tags: ["Programação", "Design"],
  },
  {
    id: "A-100",
    titulo: "O Mundo Perdido",
    autor: "Arthur Conan Doyle",
    anoPublicacao: 1912,
    disponivel: false,
    tags: ["Ficção"],
  },
];

function buscarPorId(id: number | string): Livro | undefined {
  return acervo.find((livro) => livro.id === id);
}

function atualizarLivro(id: number | string, atualizacoes: Partial<Livro>): Livro | undefined {
  const livro = buscarPorId(id);
  if (!livro) {
    return undefined;
  }

  Object.assign(livro, atualizacoes);
  return livro;
}

const catalogoPorCategoria: Record<Categoria, LivroResumo[]> = {
  Programação: [],
  Ficção: [],
  Design: [],
};

for (const livro of acervo) {
  const resumo: LivroResumo = {
    titulo: livro.titulo,
    autor: livro.autor,
    anoPublicacao: livro.anoPublicacao,
    tags: livro.tags,
  };

  for (const categoria of livro.tags) {
    if (categoria in catalogoPorCategoria) {
      catalogoPorCategoria[categoria as Categoria].push(resumo);
    }
  }
}

console.log("Acervo inicial:", acervo);
console.log("Buscar livro por id 1:", buscarPorId(1));

const livroAtualizado = atualizarLivro("A-100", { disponivel: true, autor: "A. Conan Doyle" });
console.log("Livro atualizado:", livroAtualizado);
console.log("Resumo por categoria:", catalogoPorCategoria);
