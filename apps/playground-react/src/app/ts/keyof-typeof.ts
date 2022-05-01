const book = {
  title: 'Hello, World',
  pages: 140,
  paperback: true,
};

// typeof keyword returns the shape of an input object
type Book = typeof book;

// keyof returns a new type that is a union of keys inside the given type
type BookProps = keyof typeof book;
