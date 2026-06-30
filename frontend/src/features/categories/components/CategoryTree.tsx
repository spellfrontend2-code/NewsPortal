// import { SelectItem } from "@/components/ui/select";
// import React from "react";

// const CategoryTree = ({
//   categories,
//   parentId = null,
//   level = 0,
// }) => {
//   const items = categories.filter(c => c.parent_id === parentId);

//   return (
//     <>
//       {items.map(category => (
//         <React.Fragment key={category.id}>
//           <SelectItem value={String(category.id)} className={`${level===0?"bg-gray-800":"bg-gray-100"}`}>
//             {"— ".repeat(level)}
//             {category.name}
//           </SelectItem>

//           <CategoryTree
//             categories={categories}
//             parentId={category.id}
//             level={level + 1}
//           />
//         </React.Fragment>
//       ))}
//     </>
//   );
// };
import React from "react";
import { SelectItem } from "@/components/ui/select";
import { CornerDownRight } from "lucide-react";

const CategoryTree = ({ categories, parentId = null, level = 0 }) => {
  const items = categories.filter(
    (category) => category.parent_id === parentId,
  );

  return items.map((category) => (
    <React.Fragment key={category.id}>
   <SelectItem
  value={String(category.id)}
  className="rounded-none w-full cursor-pointer hover:bg-[var(--color-secondary)] text-sm  border-b border-[var(--color-secondary)]"
  style={{
    paddingLeft: `${level * 20}px`,
  }}
>
 {level > 0 && <CornerDownRight size={14} />}
    {category.name}
      </SelectItem>

      <CategoryTree
        categories={categories}
        parentId={category.id}
        level={level + 1}
      />
    </React.Fragment>
  ));
};

export default CategoryTree;
