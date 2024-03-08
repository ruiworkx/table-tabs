import { Category, SubCategory } from "./category.model";

export interface TodoItemRaw {
  id: string;
  title: string;
  categoryId: string;
  subCategoriesIds: string[];
  status?: boolean;
}

export interface TodoItem {
  id: string;
  title: string;
  category: Category;
  subCategories: SubCategory[];
  status?: boolean;
}