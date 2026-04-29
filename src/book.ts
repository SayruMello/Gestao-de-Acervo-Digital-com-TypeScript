export class Book {
  private availableCopies: number;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly totalCopies: number,
  ) {
    this.availableCopies = totalCopies;
  }

  borrow(): void {
    if (this.availableCopies <= 0) {
      throw new Error(`Não há cópias disponíveis de "${this.title}" no momento.`);
    }
    this.availableCopies -= 1;
  }

  returnCopy(): void {
    if (this.availableCopies >= this.totalCopies) {
      throw new Error(`Todas as cópias de "${this.title}" já estão na biblioteca.`);
    }
    this.availableCopies += 1;
  }

  get isAvailable(): boolean {
    return this.availableCopies > 0;
  }

  get summary(): string {
    return `${this.title} — ${this.author} | ${this.availableCopies}/${this.totalCopies} disponíveis`;
  }
}
