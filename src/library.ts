import { Book } from "./book";
import { Member } from "./member";
import { Loan } from "./loan";

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function addDays(date: Date, days: number): Date {
  const future = new Date(date);
  future.setDate(future.getDate() + days);
  return future;
}

export class Library {
  private books = new Map<string, Book>();
  private members = new Map<string, Member>();
  private loans = new Map<string, Loan>();
  private readonly loanDays = 14;

  addBook(title: string, author: string, copies: number): Book {
    const book = new Book(generateId("book"), title, author, copies);
    this.books.set(book.id, book);
    return book;
  }

  addMember(name: string, email: string): Member {
    const member = new Member(generateId("member"), name, email);
    this.members.set(member.id, member);
    return member;
  }

  borrowBook(bookId: string, memberId: string): Loan {
    const book = this.books.get(bookId);
    if (!book) {
      throw new Error(`Não encontrei o livro com id ${bookId}.`);
    }

    const member = this.members.get(memberId);
    if (!member) {
      throw new Error(`Não encontrei o membro com id ${memberId}.`);
    }

    book.borrow();
    member.borrowBook(book.id);

    const loan = new Loan(
      generateId("loan"),
      book.id,
      member.id,
      new Date(),
      addDays(new Date(), this.loanDays),
    );

    this.loans.set(loan.id, loan);
    return loan;
  }

  returnBook(loanId: string): Loan {
    const loan = this.loans.get(loanId);
    if (!loan) {
      throw new Error(`Empréstimo ${loanId} não existe.`);
    }
    if (loan.status !== "active") {
      throw new Error(`O empréstimo ${loanId} já foi finalizado.`);
    }

    const book = this.books.get(loan.bookId);
    const member = this.members.get(loan.memberId);
    if (!book || !member) {
      throw new Error("Dados do empréstimo corrompidos.");
    }

    book.returnCopy();
    member.returnBook(book.id);
    loan.close();

    return loan;
  }

  listBooks(): Book[] {
    return Array.from(this.books.values());
  }

  listMembers(): Member[] {
    return Array.from(this.members.values());
  }

  listLoans(referenceDate: Date = new Date()): Loan[] {
    return Array.from(this.loans.values()).map((loan) => {
      const snapshot = new Loan(loan.id, loan.bookId, loan.memberId, loan.loanDate, loan.dueDate);
      snapshot.status = loan.getStatus(referenceDate);
      snapshot.returnDate = loan.returnDate;
      return snapshot;
    });
  }

  describeLibrary(): void {
    console.log("Bem-vindo à biblioteca! Aqui está o estado atual do acervo:");
    this.listBooks().forEach((book) => console.log(`- ${book.summary}`));
    console.log(`Total de livros cadastrados: ${this.books.size}`);
  }

  describeMembers(): void {
    console.log("Membros ativos no sistema:");
    this.listMembers().forEach((member) => console.log(`- ${member.summary}`));
  }

  describeLoans(): void {
    console.log("Empréstimos registrados:");
    this.listLoans().forEach((loan) => console.log(`- ${loan.summary}`));
  }
}
