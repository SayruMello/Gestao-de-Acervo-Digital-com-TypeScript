export type LoanStatus = "active" | "returned" | "overdue";

export class Loan {
  public status: LoanStatus = "active";
  public returnDate?: Date;

  constructor(
    public readonly id: string,
    public readonly bookId: string,
    public readonly memberId: string,
    public readonly loanDate: Date,
    public readonly dueDate: Date,
  ) {}

  getStatus(referenceDate: Date = new Date()): LoanStatus {
    if (this.status !== "active") {
      return this.status;
    }
    return referenceDate > this.dueDate ? "overdue" : "active";
  }

  close(referenceDate: Date = new Date()): void {
    this.returnDate = referenceDate;
    this.status = referenceDate > this.dueDate ? "overdue" : "returned";
  }

  get summary(): string {
    const statusLabel = this.getStatus();
    return `Empréstimo ${this.id} | Livro: ${this.bookId} | Membro: ${this.memberId} | Status: ${statusLabel} | Devolução até ${this.dueDate.toLocaleDateString()}`;
  }
}
