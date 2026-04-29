import { Library } from "./library";

const library = new Library();

const book1 = library.addBook("Dom Casmurro", "Machado de Assis", 3);
const book2 = library.addBook("O Cortiço", "Aluísio Azevedo", 2);
const member1 = library.addMember("Ana Silva", "ana.silva@example.com");
const member2 = library.addMember("Carlos Souza", "carlos.souza@example.com");

library.describeLibrary();
console.log("");
library.describeMembers();
console.log("");

const loan1 = library.borrowBook(book1.id, member1.id);
console.log(`O livro "${book1.title}" foi emprestado para ${member1.name} até ${loan1.dueDate.toLocaleDateString()}.`);

const loan2 = library.borrowBook(book2.id, member2.id);
console.log(`O livro "${book2.title}" foi emprestado para ${member2.name} até ${loan2.dueDate.toLocaleDateString()}.`);

console.log("");
library.describeLoans();
console.log("\n--- Devolução ---");
const returnedLoan = library.returnBook(loan1.id);
console.log(`O livro "${book1.title}" foi devolvido por ${member1.name} em ${returnedLoan.returnDate?.toLocaleDateString()}.`);
console.log("");
library.describeLibrary();
