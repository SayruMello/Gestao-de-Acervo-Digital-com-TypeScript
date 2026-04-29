export interface Livro {
  id: number | string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  disponivel: boolean;
  tags: string[];
}

export const acervo: Livro[] = [
  {
    id: 1,
    titulo: "TypeScript na Prática",
    autor: "Ana Costa",
    anoPublicacao: 2023,
    disponivel: true,
    tags: ["Programação", "TypeScript"],
  },
  {
    id: "B2",
    titulo: "Design de Interfaces Inteligentes",
    autor: "Rafael Souza",
    anoPublicacao: 2021,
    disponivel: false,
    tags: ["Design", "Ficção"],
  },
];

export function buscarPorId(id: number | string): Livro | undefined {
  for (let livro of acervo) {
    if (livro.id === id) {
      return livro;
    }
  }
  return undefined;
}

export function atualizarLivro(id: number | string, alteracoes: Partial<Livro>): Livro | undefined {
  const livro = buscarPorId(id);
  if (!livro) {
    return undefined;
  }

  if (alteracoes.titulo !== undefined) {
    livro.titulo = alteracoes.titulo;
  }
  if (alteracoes.autor !== undefined) {
    livro.autor = alteracoes.autor;
  }
  if (alteracoes.anoPublicacao !== undefined) {
    livro.anoPublicacao = alteracoes.anoPublicacao;
  }
  if (alteracoes.disponivel !== undefined) {
    livro.disponivel = alteracoes.disponivel;
  }
  if (alteracoes.tags !== undefined) {
    livro.tags = alteracoes.tags;
  }

  return livro;
}

export type LivroResumo = Omit<Livro, "id" | "disponivel">;

export function mapearPorCategorias(): Record<string, LivroResumo[]> {
  const categorias: Record<string, LivroResumo[]> = {};

  for (let livro of acervo) {
    const resumo: LivroResumo = {
      titulo: livro.titulo,
      autor: livro.autor,
      anoPublicacao: livro.anoPublicacao,
      tags: livro.tags,
    };

    for (let tag of livro.tags) {
      if (!categorias[tag]) {
        categorias[tag] = [];
      }
      categorias[tag].push(resumo);
    }
  }

  return categorias;
}

export const livrosPorCategoria = mapearPorCategorias();
