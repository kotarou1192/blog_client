export type SearchProps = {
  page: number;
  max_contents: number;
  order_type: "new" | "old" | "matched";
};

export type UserProps = {
  name: string;
  explanation?: string;
  icon?: string;
  is_my_page: boolean;
};
