import DeleteDialogBox from "@/components/Admin/dialogbox/DeleteDialogBox"
import DataTable from "@/components/Admin/table/DataTable"
import DataTableSkeleton from "@/components/Admin/table/DataTableSkeleton"
import { Button } from "@/components/ui/button"
import AddTag from "@/features/tags/components/AddTag"
import { useTagsHooks } from "@/features/tags/hooks/useTags"
import { generateColumns } from "@/lib/generateColumns"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

function Tags(){
    const tagsHook=useTagsHooks()
        const [search,setSearch]=useState("")
    const {data,isLoading,error}=tagsHook.useFetchTags({page:1,per_page:10,search})
    const tagsData=data?.data??[]
    const [selectedTag,setSelectedTag]=useState(null)
    const [deleteOpen,setDeleteOpen]=useState(false)
    const [addTag,setAddTag]=useState(false)
    const deleteTag=tagsHook.useDeleteTag()
    const [sorting,setSorting]=useState([])
    const [pagination,setPagination]=useState({
        pageIndex:0,
        pageSize:10
    })
    const columns=generateColumns(
        tagsData,
        [],(action,row)=>{
            setSelectedTag(row)
            switch(action){
                case "delete":
                    setDeleteOpen(true)
                    break;
                case "edit":
                    break;
            }
        })
        if(error){
          toast.error(error?.message)
        }
      return (
    <div className="w-full h-full p-20 flex flex-col gap-5">
       <div className="flex justify-between items-end rounded-xl ">
        <div className="flex flex-col  text-gray-800 ">
          <p className="text-3xl font-bold ">
          Tags
        </p>
        <p className="text-gray-500">Manage your tags</p>
        </div>
        <Button
          variant="submit"
          className="h-10 flex items-center gap-2"
          onClick={() => setAddTag(true)}
        >
          <Plus />
          Add Tag
        </Button>
      </div>
      <DeleteDialogBox
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedField={selectedTag}
        deleteField={deleteTag}
      />
    {addTag && <AddTag open={addTag} setOpen={setAddTag} />}
      {error?<p>No tags found.</p>:(
        <DataTable
          data={tagsData}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={data?.pagination?.last_page}
          sorting={sorting}
          setSorting={setSorting}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          placeholder="Tags"
        />
      )}</div>)
}

export default Tags