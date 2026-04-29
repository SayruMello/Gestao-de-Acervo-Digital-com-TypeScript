export class Member {
  private borrowedBookIds: string[] = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {}

  borrowBook(bookId: string): void {
    this.borrowedBookIds.push(bookId);
  }

  returnBook(bookId: string): void {
    this.borrowedBookIds = this.borrowedBookIds.filter((borrowedId) => borrowedId !== bookId);
  }

  get borrowedCount(): number {
    return this.borrowedBookIds.length;
  }

  get summary(): string {
    return `${this.name} (${this.email}) — ${this.borrowedCount} livro(s) emprestado(s)`;
  }
}
