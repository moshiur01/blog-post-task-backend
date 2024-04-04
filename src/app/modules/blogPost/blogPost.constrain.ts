export const blogPostSearchableFields: string[] = ['title'];

export const blogPostFilterableFields: string[] = [
  'searchTerm',
  'userId',
  'categoryId',
];

//for relational fields
export const blogPostRelationalFields: string[] = ['userId', 'categoryId'];

export const blogPostRelationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
  categoryId: 'category',
};
