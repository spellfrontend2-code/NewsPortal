import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox";
import DataTable from "@/components/Admin/table/Datatable";
import DataTableSkeleton from "@/components/Admin/table/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import CategoryInput from "@/features/categories/components/CategoryInput";
import { useCategoriesHooks } from "@/features/categories/hooks/useCategories";
import { generateColumns } from "@/lib/generateColumns";
import { Plus } from "lucide-react";
import { useState } from "react";

function Categories() {
    const categoriesHook=useCategoriesHooks()
    const {data,isLoading}=categoriesHook.useFetchCategories()
    const categories=data?.data??[]
    const [deleteOpen,setDeleteOpen]=useState(false)
    const [selectedCategory,setSelectedCategory]=useState(null)
    const deleteCategory=categoriesHook.useDeleteCategories()
    const columns=generateColumns(categories,["id","slug","meta_title","meta_description","children","parent","parent_id","position"],(action,row)=>{
        setSelectedCategory(row)
        switch(action){
            case "delete":
                setDeleteOpen(true)
        }
    })
    const [addCategory,setAddCategory]=useState(false)
    return (
        <div className="w-full p-20 flex flex-col gap-5">
            {addCategory?
            <CategoryInput setAddCategory={setAddCategory} categories={categories}/>:
           <><div className="flex justify-between">
            <p className="text-4xl font-bold text-[var(--color-primary)] text-center">
                    Categories
                    </p>
                    <Button variant="submit" className="mt-5" onClick={()=>setAddCategory(true)}><Plus/>Add Category</Button>
                    </div>
                <DeleteDialogBox deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} selectedField={selectedCategory} deleteField={deleteCategory}/>
           {isLoading?<DataTableSkeleton/>:<DataTable data={categories} columns={columns}/>}</>} 
        </div>
    );
}

export default Categories;